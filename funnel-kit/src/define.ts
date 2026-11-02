import type { BrandConfig } from './types';

/** brands/<id>/config.ts の書き出し用（型チェックだけを行う恒等関数） */
export const defineBrand = (c: BrandConfig) => c;
