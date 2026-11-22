/**
 * オミ塾 公式LINEボットの設定。設問・診断結果（受講前チェック）・FAQは LP の設定（config.ts）をそのまま使う。
 * リッチメニューの「稼ぎ方を見る」では、下の STYLES（稼ぎ方の一例）を並べる。
 */
import config, { AI_LEVEL } from './config';
import { defineLineBot } from '../../src/line-bot/define';

const result = config.lp.sections.find((s) => s.type === 'surveyResult');
const faq = config.lp.sections.find((s) => s.type === 'faq');
if (!result || result.type !== 'surveyResult' || !faq || faq.type !== 'faq') throw new Error('config.ts に surveyResult と faq が必要です');

// 診断結果（AIの経験ごと）のカード画像
const IMAGES: Record<string, { key: string; image: string }> = {
  [AI_LEVEL.zero]: { key: 'zero', image: '/line/level-zero.jpg' },
  [AI_LEVEL.tried]: { key: 'tried', image: '/line/level-tried.jpg' },
  [AI_LEVEL.sometimes]: { key: 'sometimes', image: '/line/level-sometimes.jpg' },
  [AI_LEVEL.daily]: { key: 'daily', image: '/line/level-daily.jpg' },
};

// 稼ぎ方の一例（リッチメニュー「稼ぎ方を見る」）
const STYLES = [
  {
    key: 'experience',
    name: '経験を商品にする',
    image: '/line/type-experience.jpg',
    desc: ['これまでの経験や知識を、相談・講座の形にして届ける稼ぎ方です。', '伝わる言葉づくり、資料やページづくりはAIと一緒に進めます。'],
    step: 'あなたの経験を棚卸しして、最初の商品の形を一緒に考えます。',
  },
  {
    key: 'production',
    name: 'AIで制作をサポートする',
    image: '/line/type-production.jpg',
    desc: ['文章・画像・資料づくりなど、AIを道具にした制作のお手伝いで稼ぐ方法です。', '人と長い時間話し続けなくても進めやすい働き方です。'],
    step: '得意なことと、AIに任せられる作業を一緒に洗い出します。',
  },
  {
    key: 'marketing',
    name: '集客を仕組みにする',
    image: '/line/type-marketing.jpg',
    desc: ['いまのお店やサービスに、ページと公式LINEの導線をつくる方法です。', '投稿や案内文づくりもAIに手伝ってもらえるので、毎日の負担を減らせます。'],
    step: 'いまの集客の流れを一緒に見て、どこから整えるかを決めます。',
  },
  {
    key: 'unknown',
    name: 'まずは棚卸しから',
    image: '/line/type-unknown.jpg',
    desc: ['経験・好きなこと・苦手なことを整理するところから始めましょう。', '合う稼ぎ方は、整理したあとに見えてきます。'],
    step: '45分で、あなたに合いそうな稼ぎ方の候補を一緒に出します。',
  },
];

export default defineLineBot({
  siteUrl: 'https://omijuku-funnel-test.vercel.app',
  colors: { accent: '#2E5E4E', sage: '#5E6A63', ink: '#1F2A24', bg: '#F4F5F1', sub: '#5E6A63', soft: '#E5EEE9', line: '#E1E5DF' },
  greeting: {
    text: '友だち追加ありがとうございます。\nオミ塾は、AIを道具にして自分らしく稼ぐ力をつける講座です。\n\nAIを使ったことがなくても大丈夫。まずは3つの質問で、あなたが安心して始められるかを確かめてみませんか？',
    card: { image: '/line/diag.jpg', title: '3つの質問で、オミ塾を安心して始められるか分かる', sub: '所要30秒・タップだけで完了', button: '無料診断をはじめる' },
  },
  diagnosis: {
    questions: config.survey.questions.map((q) => ({ id: q.id, text: q.text, options: q.options })),
    resultQuestionId: result.questionId,
    results: Object.fromEntries(Object.entries(result.results).map(([option, r]) => [option, { ...r, ...IMAGES[option] }])),
    kicker: result.kicker,
    verdict: result.verdict,
    extras: result.extras,
    stepLabel: result.stepLabel,
    note: result.note || '※ 回答から表示しています。収入や成果を保証するものではありません。',
    styles: { title: '稼ぎ方の一例', kicker: '稼ぎ方の一例', button: '稼ぎ方の一例を見る', items: STYLES },
  },
  booking: {
    offerName: config.offer.name,
    duration: config.offer.duration,
    format: config.offer.format,
    schedule: config.form.schedule,
    afterNote: ['前日にこのトークでリマインドをお送りします', '当日の参加URLは前日までにこちらでご案内します', '日時の変更はこのトークでお気軽にどうぞ'],
  },
  faq: faq.items,
  about: {
    title: 'オミ塾について',
    lines: ['繊細さんが、AIを道具にして自分らしく稼ぐための個別相談・伴走をしています。', '押し売りはしません。まずは話してみるところからどうぞ。'],
    lpLabel: 'オミ塾について',
  },
  linkPrefix: '相談予約:',
  richMenu: {
    image: '/line/richmenu.jpg',
    size: { width: 2500, height: 1686 },
    chatBarText: 'メニュー',
    areas: [
      { bounds: { x: 0, y: 0, width: 2500, height: 843 }, data: 'a=diag', displayText: '無料診断をはじめる' },
      { bounds: { x: 0, y: 843, width: 833, height: 843 }, data: 'a=styles', displayText: '稼ぎ方を見たい' },
      { bounds: { x: 833, y: 843, width: 834, height: 843 }, data: 'a=book', displayText: '個別相談を予約したい' },
      { bounds: { x: 1667, y: 843, width: 833, height: 843 }, data: 'a=faq', displayText: 'よくある質問を見たい' },
    ],
  },
});
