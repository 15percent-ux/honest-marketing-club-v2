import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { brand } from './brand';
import { applyTheme } from './theme';
import { captureUtm, save } from './lib/store';
import { initTracking } from './lib/track';
import { initLiff } from './lib/line';
import { App } from './App';

applyTheme(brand.theme);
captureUtm();
initTracking();
// mode=C：LIFFで開かれていればLINEのIDを先に取得しておく（フォーム送信時に一緒に送る）
initLiff().then((p) => p && save('liff', p));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
