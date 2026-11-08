/**
 * オミ塾 公式LINEボットの設定。設問・診断結果・FAQは LP の設定（config.ts）をそのまま使う。
 */
import config from './config';
import { defineLineBot } from '../../src/line-bot/define';

const result = config.lp.sections.find((s) => s.type === 'surveyResult');
const faq = config.lp.sections.find((s) => s.type === 'faq');
if (!result || result.type !== 'surveyResult' || !faq || faq.type !== 'faq') throw new Error('config.ts に surveyResult と faq が必要です');

const IMAGES: Record<string, { key: string; image: string }> = {
  経験を商品にする: { key: 'experience', image: '/line/type-experience.jpg' },
  AIで制作をサポートする: { key: 'production', image: '/line/type-production.jpg' },
  集客を仕組みにする: { key: 'marketing', image: '/line/type-marketing.jpg' },
  まずは棚卸しから: { key: 'unknown', image: '/line/type-unknown.jpg' },
};

export default defineLineBot({
  siteUrl: 'https://omijuku-funnel-test.vercel.app',
  colors: { accent: '#A85E55', sage: '#5C7A6B', ink: '#34424F', bg: '#FBF8F4', sub: '#8A857C', soft: '#E3EFEC' },
  greeting: {
    text: '友だち追加ありがとうございます🍵\nオミ塾では、AIで自分らしく稼ぐ力をつける無料個別相談を行っています。\n\nまずは下の診断で、あなたに合う稼ぎ方を見てみませんか？',
    card: { image: '/line/diag.jpg', title: '3つの質問で、あなたに合う稼ぎ方が分かる', sub: '所要30秒・タップだけで完了', button: '無料診断をはじめる' },
  },
  diagnosis: {
    // トークでは3問とも「1つ選ぶ」形にする
    questions: config.survey.questions.map((q) => ({
      id: q.id,
      text: q.id === 'q3' ? 'オミ塾でいちばん気になるところは？' : q.text,
      options: q.options,
    })),
    resultQuestionId: result.questionId,
    results: Object.fromEntries(
      Object.entries(result.results).map(([option, r]) => [option, { ...r, ...IMAGES[r.name] }]),
    ),
    note: '※ 回答から表示しています。収入や成果を保証するものではありません。',
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
