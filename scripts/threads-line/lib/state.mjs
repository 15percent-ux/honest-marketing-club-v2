import { readFile, writeFile } from 'node:fs/promises';

/**
 * 通知済み投稿の ID を保持する。GitHub Actions からリポジトリに書き戻すことで、
 * 実行が重なっても同じ投稿を二重配信しないようにする。
 */
export async function loadState(path) {
  try {
    const parsed = JSON.parse(await readFile(path, 'utf8'));
    return {
      seen: Array.isArray(parsed.seen) ? parsed.seen : [],
      lastNotifiedAt: parsed.lastNotifiedAt ?? null,
    };
  } catch (error) {
    if (error.code === 'ENOENT') return { seen: [], lastNotifiedAt: null };
    throw error;
  }
}

export async function saveState(path, state, { stateSize }) {
  const payload = {
    seen: state.seen.slice(-stateSize),
    lastNotifiedAt: state.lastNotifiedAt,
  };
  await writeFile(path, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
}
