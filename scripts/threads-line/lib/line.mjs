const PUSH_ENDPOINT = 'https://api.line.me/v2/bot/message/push';

/** LINE のテキストメッセージ1通あたりの上限。 */
export const TEXT_LIMIT = 5000;

/**
 * LINE Messaging API で push メッセージを送る。
 * @param {{accessToken: string, to: string, texts: string[]}} options
 */
export async function pushTextMessages({ accessToken, to, texts }) {
  // 1リクエストにつきメッセージオブジェクトは5件まで。
  for (let i = 0; i < texts.length; i += 5) {
    const chunk = texts.slice(i, i + 5);
    const response = await fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        to,
        messages: chunk.map((text) => ({ type: 'text', text: text.slice(0, TEXT_LIMIT) })),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`LINE push failed (${response.status}): ${detail}`);
    }
  }
}
