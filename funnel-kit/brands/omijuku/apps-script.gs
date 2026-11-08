// 自動生成ファイル：python3 scripts/build-gas.py omijuku（元は backend/gas/Code.gs と brands/omijuku/gas.json）
/**
 * funnel-kit 予約バックエンド（Google Apps Script）
 * クライアントごとにこのスクリプトを1つ複製し、CONFIG を書き換えてウェブアプリとしてデプロイする。
 *
 *   GET  ?action=slots&from=YYYY-MM-DD&to=YYYY-MM-DD   … 予約枠の残数
 *   POST {action:'reserve', brand, reservation}          … 予約の登録＋確認メール
 *   GET  ?action=line_callback&code=..&state=..          … LINEログイン（mode A）のコールバック
 *   sendReminders()                                      … 1時間ごとのトリガーで前日・1時間前のリマインド
 *
 * 初回だけ setup() を実行すると、シートとトリガーが作られる。
 */

// ==== CONFIG START ====（brands/omijuku/gas.json から生成。直接書き換えてもよい）
const CONFIG = {
  "BRAND_NAME": "オミ塾",
  "OFFER_NAME": "無料個別相談",
  "OPERATOR": "株式会社麹王子",
  "SHEET_ID": "1CVo2kl02jo-kfI0WwOHcgeVVWQWa17VCxx6dEiCXvnE",
  "CAPACITY_PER_SLOT": 1,
  "FROM_NAME": "オミ塾",
  "REPLY_TO": "",
  "MEETING_URL": "",
  "MEETING_ID": "",
  "MEETING_PASSCODE": "",
  "THANKS_URL": "https://omijuku-funnel-test.vercel.app/thanks",
  "NOTIFY_TO": "me",
  "LINE": {
    "MODE": "B",
    "OA_ID": "@203nrsnd",
    "ADD_FRIEND_URL": "https://lin.ee/o0UYNIM",
    "MESSAGE_TEMPLATE": "相談予約:{rid}",
    "LOGIN_CHANNEL_ID": "",
    "LOGIN_CHANNEL_SECRET_PROP": "LINE_LOGIN_SECRET",
    "MESSAGING_TOKEN_PROP": "LINE_MESSAGING_TOKEN"
  },
  "COLORS": {
    "primary": "#C47F75",
    "cta": "#5C7A6B",
    "line": "#06C755",
    "ink": "#3B3A36",
    "soft": "#F7F2EC"
  },
  "EMAIL_POINTS": [
    "Zoomで開催（顔出しなしOK）",
    "押し売りはしません",
    "相談は無料です"
  ]
};
// ==== CONFIG END ====

const HEADERS = [
  'rid', 'created_at', 'status', 'date', 'time', 'last_name', 'first_name', 'email', 'tel',
  'intent', 'region', 'birthdate', 'message', 'survey', 'utm', 'line_user_id',
  'reminded_day_before', 'reminded_1h',
];

// ───────────────────────── エントリポイント ─────────────────────────

function doGet(e) {
  const p = e.parameter || {};
  if (p.action === 'slots') return json_({ ok: true, slots: slots_(p.from, p.to) });
  if (p.action === 'line_callback') return lineCallback_(p);
  return json_({ ok: false, error: 'invalid' });
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'invalid', message: '送信内容を読み取れませんでした。' });
  }
  if (body.action === 'reserve') return json_(reserve_(body.reservation || {}));
  return json_({ ok: false, error: 'invalid' });
}

// ───────────────────────── 予約 ─────────────────────────

function reserve_(r) {
  const err = validate_(r);
  if (err) return { ok: false, error: 'invalid', message: err };

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = sheet_();
    const rows = activeRows_(sh);
    const email = String(r.email).trim().toLowerCase();
    if (rows.some((x) => x.email === email && x.date === r.date && x.time === r.time)) {
      return { ok: false, error: 'duplicate', message: 'この日時はすでにご予約済みです。確認メールをご覧ください。' };
    }
    const taken = rows.filter((x) => x.date === r.date && x.time === r.time).length;
    if (taken >= CONFIG.CAPACITY_PER_SLOT) {
      return { ok: false, error: 'slot_full', message: '申し訳ありません。その枠はちょうど満席になりました。別の日時をお選びください。' };
    }
    const rid = makeRid_(r.date);
    // パスワードは保存しない（会員システムと連携する場合は、その仕組み側で扱う）
    sh.appendRow([
      rid, new Date(), 'active', r.date, r.time, r.lastName, r.firstName, email, normalizeTel_(r.tel),
      r.intent || '', r.region || '', r.birthdate || '', r.message || '',
      JSON.stringify(r.survey || {}), JSON.stringify(r.utm || {}), r.lineUserId || '', '', '',
    ]);
    const rec = Object.assign({}, r, { rid: rid, email: email });
    sendConfirm_(rec);
    const notifyTo = CONFIG.NOTIFY_TO === 'me' ? Session.getEffectiveUser().getEmail() : CONFIG.NOTIFY_TO;
    if (notifyTo) {
      const { password: _p, ...shown } = rec;
      MailApp.sendEmail(notifyTo, `【新規予約】${r.lastName} ${r.firstName} 様 ${fmtDate_(r.date)} ${r.time}`, JSON.stringify(shown, null, 2));
    }
    return { ok: true, rid: rid };
  } finally {
    lock.releaseLock();
  }
}

function validate_(r) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.date || '') || !/^\d{2}:\d{2}-\d{2}:\d{2}$/.test(r.time || '')) return '日時を選び直してください。';
  if (!r.lastName || !r.firstName) return 'お名前を入力してください。';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(r.email || '').trim())) return 'メールアドレスを確認してください。';
  if (!/^0\d{9,10}$/.test(String(r.tel || '').replace(/\D/g, ''))) return '電話番号を確認してください。';
  if (slotStart_(r.date, r.time).getTime() < Date.now()) return 'すでに過ぎた日時です。選び直してください。';
  return '';
}

function slots_(from, to) {
  const rows = activeRows_(sheet_());
  const count = {};
  rows.forEach((x) => {
    if ((!from || x.date >= from) && (!to || x.date <= to)) {
      const k = x.date + ' ' + x.time;
      count[k] = (count[k] || 0) + 1;
    }
  });
  return Object.keys(count).map((k) => {
    const [date, time] = k.split(' ');
    return { date: date, time: time, remaining: Math.max(0, CONFIG.CAPACITY_PER_SLOT - count[k]) };
  });
}

// ───────────────────────── メール ─────────────────────────

function sendConfirm_(r) {
  const subject = `【必読】${CONFIG.OFFER_NAME}のご予約を承りました✅ 当日の準備のご案内`;
  MailApp.sendEmail({
    to: r.email,
    subject: subject,
    htmlBody: emailHtml_(r, 'confirm'),
    body: emailText_(r),
    name: CONFIG.FROM_NAME,
    replyTo: CONFIG.REPLY_TO || undefined,
  });
}

function sendReminders() {
  const sh = sheet_();
  const values = sh.getDataRange().getValues();
  const idx = indexOf_(values[0]);
  const now = Date.now();
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (row[idx.status] !== 'active') continue;
    const r = rowToObj_(row, idx);
    const start = slotStart_(r.date, r.time).getTime();
    if (now >= start) continue;
    const dayBefore = new Date(start);
    dayBefore.setDate(dayBefore.getDate() - 1);
    dayBefore.setHours(20, 0, 0, 0);
    if (!row[idx.reminded_day_before] && now >= dayBefore.getTime() && start - now > 3 * 3600 * 1000) {
      MailApp.sendEmail({ to: r.email, subject: `【明日】${CONFIG.OFFER_NAME}のご案内（${fmtDate_(r.date)} ${r.time.split('-')[0]}〜）`, htmlBody: emailHtml_(r, 'day_before'), name: CONFIG.FROM_NAME });
      sh.getRange(i + 1, idx.reminded_day_before + 1).setValue(new Date());
    }
    if (!row[idx.reminded_1h] && start - now <= 3600 * 1000) {
      MailApp.sendEmail({ to: r.email, subject: `【まもなく開始】${CONFIG.OFFER_NAME}は${r.time.split('-')[0]}からです`, htmlBody: emailHtml_(r, 'hour_before'), name: CONFIG.FROM_NAME });
      sh.getRange(i + 1, idx.reminded_1h + 1).setValue(new Date());
    }
  }
}

function lineUrl_(rid) {
  const L = CONFIG.LINE;
  if (L.MODE === 'B' && L.OA_ID) {
    return 'https://line.me/R/oaMessage/' + encodeURIComponent(L.OA_ID) + '/?' + encodeURIComponent(L.MESSAGE_TEMPLATE.replace('{rid}', rid));
  }
  if (L.MODE === 'A') return CONFIG.THANKS_URL + '?rid=' + encodeURIComponent(rid);
  return L.ADD_FRIEND_URL || '';
}

function emailHtml_(r, kind) {
  const c = CONFIG.COLORS;
  const name = esc_(r.lastName + ' ' + r.firstName);
  const when = esc_(fmtDate_(r.date) + ' ' + r.time.replace('-', '〜'));
  const btn = (href, label, bg) =>
    `<table role="presentation" width="100%"><tr><td align="center" style="padding:8px 0"><a href="${href}" style="display:inline-block;background:${bg};color:#fff;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:999px;font-size:16px">${label}</a></td></tr></table>`;
  const line = CONFIG.LINE.MODE !== 'none' && !r.lineUserId && lineUrl_(r.rid)
    ? `<tr><td style="padding:16px;background:#EAF9F0;border-radius:12px">
         <p style="margin:0;font-weight:bold;color:${c.line}">LINE連携がお済みでない方へ</p>
         <p style="margin:8px 0;font-size:15px;font-weight:bold">参加URLとリマインドは<br>公式LINEでもお届けします</p>
         ${btn(lineUrl_(r.rid), 'LINE連携して参加準備を完了する', c.line)}
       </td></tr><tr><td style="height:16px"></td></tr>`
    : '';
  const lead = {
    confirm: `${name} 様、ご予約ありがとうございます！`,
    day_before: `${name} 様、いよいよ明日です。`,
    hour_before: `${name} 様、まもなく開始です。`,
  }[kind];
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="color-scheme" content="light dark"></head>
<body style="margin:0;background:${c.soft};font-family:'Hiragino Sans','Noto Sans JP',sans-serif;color:${c.ink}">
<table role="presentation" width="100%" style="background:${c.soft}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" style="max-width:600px;width:100%;background:#fff;border-radius:16px;padding:24px">
<tr><td style="font-size:16px;font-weight:bold;text-align:center;padding-bottom:16px">${lead}</td></tr>
${line}
<tr><td style="padding:16px;border:1px solid #eee;border-radius:12px">
  <p style="margin:0 0 8px;font-weight:bold">ご予約内容</p>
  <table role="presentation" width="100%" style="font-size:14px">
    <tr><td style="color:#888;width:96px">内容</td><td>${esc_(CONFIG.OFFER_NAME)}</td></tr>
    <tr><td style="color:#888">日時</td><td><b>${when}</b></td></tr>
    <tr><td style="color:#888">予約番号</td><td>${esc_(r.rid)}</td></tr>
  </table>
</td></tr>
<tr><td style="height:16px"></td></tr>
<tr><td style="padding:16px;background:${c.soft};border-radius:12px;font-size:14px">
  <p style="margin:0 0 8px;font-weight:bold">（3分で完了）Zoomのご準備</p>
  <p style="margin:0">① Zoomアプリをダウンロード<br>② アプリを開いて、サインインまで済ませておく</p>
</td></tr>
${CONFIG.MEETING_URL
  ? `<tr><td style="padding-top:16px">${btn(CONFIG.MEETING_URL, '当日はこちらから参加する（Zoom）', c.cta)}</td></tr>
<tr><td style="font-size:13px;color:#666">${CONFIG.MEETING_ID ? 'ミーティングID：<span style="background:#FFF04A">' + esc_(CONFIG.MEETING_ID) + '</span>' : ''}${CONFIG.MEETING_PASSCODE ? '　パスコード：' + esc_(CONFIG.MEETING_PASSCODE) : ''}</td></tr>`
  : `<tr><td style="padding-top:16px;font-size:14px">当日の参加URLは、前日までにこのメールアドレス${CONFIG.LINE.MODE !== 'none' ? 'と公式LINE' : ''}にお送りします。</td></tr>`}
<tr><td style="padding:20px 0 0;font-size:14px">当日お会いできるのを楽しみにしています。<br>${CONFIG.EMAIL_POINTS.map((x) => '✓ ' + esc_(x)).join('<br>')}</td></tr>
<tr><td style="padding-top:24px;font-size:11px;color:#999;border-top:1px solid #eee">このメールは送信専用です。ご予約の変更・キャンセルは公式LINEまたはお問い合わせ窓口からご連絡ください。<br>${esc_(CONFIG.OPERATOR)}｜${esc_(CONFIG.BRAND_NAME)}</td></tr>
</table></td></tr></table></body></html>`;
}

function emailText_(r) {
  return [
    `${r.lastName} ${r.firstName} 様`,
    `${CONFIG.OFFER_NAME}のご予約ありがとうございます。`,
    `日時：${fmtDate_(r.date)} ${r.time.replace('-', '〜')}`,
    `予約番号：${r.rid}`,
    CONFIG.MEETING_URL ? `参加URL：${CONFIG.MEETING_URL}` : '参加URLは前日までにお送りします。',
    lineUrl_(r.rid) ? `LINE連携：${lineUrl_(r.rid)}` : '',
  ].filter(Boolean).join('\n');
}

// ───────────────────────── LINEログイン（mode A） ─────────────────────────

function lineCallback_(p) {
  const props = PropertiesService.getScriptProperties();
  const secret = props.getProperty(CONFIG.LINE.LOGIN_CHANNEL_SECRET_PROP);
  const rid = String(p.state || '').split('.')[0];
  const redirectUri = ScriptApp.getService().getUrl() + '?action=line_callback';
  let linked = false;
  try {
    const tok = JSON.parse(UrlFetchApp.fetch('https://api.line.me/oauth2/v2.1/token', {
      method: 'post',
      payload: { grant_type: 'authorization_code', code: p.code, redirect_uri: redirectUri, client_id: CONFIG.LINE.LOGIN_CHANNEL_ID, client_secret: secret },
    }).getContentText());
    const verified = JSON.parse(UrlFetchApp.fetch('https://api.line.me/oauth2/v2.1/verify', {
      method: 'post',
      payload: { id_token: tok.id_token, client_id: CONFIG.LINE.LOGIN_CHANNEL_ID },
    }).getContentText());
    const userId = verified.sub;
    const sh = sheet_();
    const values = sh.getDataRange().getValues();
    const idx = indexOf_(values[0]);
    for (let i = 1; i < values.length; i++) {
      if (values[i][idx.rid] === rid) {
        sh.getRange(i + 1, idx.line_user_id + 1).setValue(userId);
        const r = rowToObj_(values[i], idx);
        pushLine_(userId, `${r.lastName} 様\nLINE連携が完了しました。\n\n${CONFIG.OFFER_NAME}\n${fmtDate_(r.date)} ${r.time.replace('-', '〜')}\n予約番号：${rid}\n\n前日にリマインドをお送りします。`);
        linked = true;
        break;
      }
    }
  } catch (err) {
    console.error(err);
  }
  const url = CONFIG.THANKS_URL + '?rid=' + encodeURIComponent(rid) + (linked ? '&linked=1' : '');
  return HtmlService.createHtmlOutput(`<script>window.top.location.href=${JSON.stringify(url)};</script><a href="${url}">完了ページへ戻る</a>`);
}

function pushLine_(to, text) {
  const token = PropertiesService.getScriptProperties().getProperty(CONFIG.LINE.MESSAGING_TOKEN_PROP);
  if (!token) return;
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + token },
    payload: JSON.stringify({ to: to, messages: [{ type: 'text', text: text }] }),
  });
}

// ───────────────────────── セットアップ・ユーティリティ ─────────────────────────

function setup() {
  // ウェブアプリから呼ばれたときにも同じシートを使えるよう、IDを保存しておく
  const ss = CONFIG.SHEET_ID ? SpreadsheetApp.openById(CONFIG.SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  PropertiesService.getScriptProperties().setProperty('SHEET_ID', ss.getId());
  const sh = sheet_();
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  sh.setFrozenRows(1);
  // 日付・時間・電話番号が自動で別の形式に変換されないよう、文字列として扱う
  const idx = indexOf_(HEADERS);
  ['date', 'time', 'tel', 'rid'].forEach((k) => sh.getRange(1, idx[k] + 1, sh.getMaxRows(), 1).setNumberFormat('@'));
  ScriptApp.getProjectTriggers().forEach((t) => {
    if (t.getHandlerFunction() === 'sendReminders') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('sendReminders').timeBased().everyHours(1).create();
}

function sheet_() {
  const id = CONFIG.SHEET_ID || PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  const ss = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName('reservations') || ss.insertSheet('reservations');
}

function indexOf_(header) {
  const idx = {};
  header.forEach((h, i) => (idx[h] = i));
  return idx;
}

function rowToObj_(row, idx) {
  return {
    rid: row[idx.rid], date: fmtCell_(row[idx.date]), time: String(row[idx.time]), lastName: row[idx.last_name],
    firstName: row[idx.first_name], email: row[idx.email], lineUserId: row[idx.line_user_id],
  };
}

function activeRows_(sh) {
  const values = sh.getDataRange().getValues();
  if (values.length < 2) return [];
  const idx = indexOf_(values[0]);
  return values.slice(1).filter((r) => r[idx.status] === 'active').map((r) => ({
    date: fmtCell_(r[idx.date]), time: String(r[idx.time]), email: String(r[idx.email]).toLowerCase(),
  }));
}

// シートが日付を Date 型に変換してしまう場合に備える
function fmtCell_(v) {
  return v instanceof Date ? Utilities.formatDate(v, 'Asia/Tokyo', 'yyyy-MM-dd') : String(v);
}

function slotStart_(date, time) {
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = time.split('-')[0].split(':').map(Number);
  return new Date(y, m - 1, d, hh, mm);
}

function fmtDate_(date) {
  const [y, m, d] = date.split('-').map(Number);
  const wd = ['日', '月', '火', '水', '木', '金', '土'][new Date(y, m - 1, d).getDay()];
  return `${m}月${d}日（${wd}）`;
}

function makeRid_(date) {
  return 'R' + date.replace(/-/g, '').slice(2) + Utilities.getUuid().slice(0, 4).toUpperCase();
}

function normalizeTel_(tel) {
  const d = String(tel || '').replace(/\D/g, '');
  return d.length === 11 ? `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}` : d;
}

function esc_(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
