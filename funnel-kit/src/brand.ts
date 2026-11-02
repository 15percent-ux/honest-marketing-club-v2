// ビルド時に vite.config.ts の alias で brands/<BRAND>/config.ts に差し替わる
import config from '@brand';
import type { BrandConfig } from './types';

export const brand: BrandConfig = config;
