import { brand } from '../brand';

/** 完了画面の「LINE連携」ボタンのリンク先 */
export function lineLinkUrl(rid: string): string | null {
  const l = brand.line;
  switch (l.mode) {
    case 'A': {
      if (!l.loginChannelId || !l.loginCallback) return null;
      const p = new URLSearchParams({
        response_type: 'code',
        client_id: l.loginChannelId,
        redirect_uri: l.loginCallback,
        state: `${rid}.${Math.random().toString(36).slice(2, 10)}`,
        scope: 'profile openid',
        bot_prompt: 'aggressive', // 連携と同時に公式アカウントの友だち追加を促す
        nonce: Math.random().toString(36).slice(2),
      });
      return `https://access.line.me/oauth2/v2.1/authorize?${p}`;
    }
    case 'B': {
      if (!l.oaId) return l.addFriendUrl || null;
      const text = (l.messageTemplate || '予約番号:{rid}').replace('{rid}', rid);
      return `https://line.me/R/oaMessage/${encodeURIComponent(l.oaId)}/?${encodeURIComponent(text)}`;
    }
    case 'C':
      return l.oaId ? `https://line.me/R/ti/p/${encodeURIComponent(l.oaId)}` : l.addFriendUrl || null;
    default:
      return null;
  }
}

interface LiffProfile {
  userId: string;
  displayName: string;
}
interface Liff {
  init(o: { liffId: string }): Promise<void>;
  isInClient(): boolean;
  isLoggedIn(): boolean;
  getProfile(): Promise<LiffProfile>;
}

/** mode=C：LIFFとして開かれていればプロフィールを返す。LINE外で開いた場合は null */
export async function initLiff(): Promise<LiffProfile | null> {
  const l = brand.line;
  if (l.mode !== 'C' || !l.liffId || !/Line\//i.test(navigator.userAgent)) return null;
  try {
    await new Promise<void>((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://static.line-scdn.net/liff/edge/2/sdk.js';
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('liff sdk'));
      document.head.appendChild(s);
    });
    const liff = (window as unknown as { liff: Liff }).liff;
    await liff.init({ liffId: l.liffId });
    if (!liff.isLoggedIn()) return null;
    return await liff.getProfile();
  } catch {
    return null;
  }
}
