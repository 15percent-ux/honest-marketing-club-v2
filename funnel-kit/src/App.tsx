import { brand } from './brand';
import { useRoute } from './lib/router';
import { SurveyPage } from './pages/SurveyPage';
import { LpPage } from './pages/LpPage';
import { ThanksPage } from './pages/ThanksPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  const route = useRoute();
  if (route === '/admin') return <AdminPage />;
  let page;
  if (route === '/thanks') page = <ThanksPage />;
  else if (route === '/lp' || !brand.survey.enabled) page = <LpPage />;
  else page = <SurveyPage />;
  return (
    <div className="page-shell">
      <div className="page-col">{page}</div>
    </div>
  );
}
