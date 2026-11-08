import { useEffect, useMemo, useRef, useState } from 'react';
import { brand } from '../brand';
import { rt } from '../lib/rt';
import { navigate } from '../lib/router';
import { save } from '../lib/store';
import { track } from '../lib/track';
import { BubbleLabel, Char, Img } from '../components/ui';
import type { SurveyQuestion } from '../types';

type Step = { kind: 'q'; q: SurveyQuestion; n: number } | { kind: 'video' };

export function SurveyPage() {
  const sv = brand.survey;
  const steps = useMemo<Step[]>(() => {
    const out: Step[] = [];
    sv.questions.forEach((q, i) => {
      out.push({ kind: 'q', q, n: i + 1 });
      if (sv.video && sv.video.afterQuestion === i + 1 && i < sv.questions.length - 1) out.push({ kind: 'video' });
    });
    return out;
  }, [sv]);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [wipe, setWipe] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    track('survey_view');
  }, []);

  const advance = () => {
    setWipe(true);
    window.setTimeout(() => {
      setIdx((i) => i + 1);
      window.scrollTo(0, 0);
    }, 300);
    window.setTimeout(() => setWipe(false), 620);
  };

  const finish = (final: Record<string, string[]>) => {
    save('survey', final);
    track('survey_complete', { answers: final });
    navigate('/lp', { from: 'survey' });
  };

  const step = steps[idx];
  const currentQ = step.kind === 'q' ? step.n : (steps[idx - 1] as Extract<Step, { kind: 'q' }>).n;

  return (
    <div className="min-h-dvh bg-survey" ref={topRef}>
      {wipe && <div className="wipe" aria-hidden />}
      {idx === 0 && <SurveyHero />}
      <div className="px-4 pb-16 pt-6">
        <Stepper total={sv.questions.length} current={currentQ} showBig={step.kind === 'q'} />
        {step.kind === 'video' ? (
          <VideoGate onDone={advance} />
        ) : (
          <Question
            key={step.q.id}
            q={step.q}
            last={idx === steps.length - 1}
            value={answers[step.q.id] || []}
            onChange={(v) => setAnswers((a) => ({ ...a, [step.q.id]: v }))}
            onNext={(v) => {
              const next = { ...answers, [step.q.id]: v };
              setAnswers(next);
              track('survey_answer', { q: step.q.id, value: v.join(' / ') });
              if (idx === steps.length - 1) finish(next);
              else advance();
            }}
          />
        )}
      </div>
    </div>
  );
}

function SurveyHero() {
  const { hero, teaser } = brand.survey;
  return (
    <>
      <div className="relative overflow-hidden bg-white">
        <div className="relative w-[62%]">
          <Img img={hero.image} ratio="4/5" />
          {hero.imageNote && (
            <span className="absolute left-1.5 top-1 text-[9px] text-white [text-shadow:0_0_3px_rgba(0,0,0,0.6)]">{hero.imageNote}</span>
          )}
        </div>
        <div className="absolute right-3 top-6 flex w-[58%] flex-col items-end gap-2">
          {hero.lines.map((l, i) =>
            l.style === 'inverse' ? (
              <span key={i} className="bg-navy px-2 py-1 font-head text-[19px] font-black tracking-wider text-white shadow">
                {l.text}
              </span>
            ) : (
              <span
                key={i}
                className={`border-2 border-primary-soft bg-white px-3 py-1 font-head font-black tracking-wider shadow ${l.style === 'boxAccent' ? 'text-[26px] text-accent' : 'text-[20px] text-navy'}`}
              >
                {l.text}
              </span>
            ),
          )}
        </div>
        {hero.tags && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {hero.tags.map((t) => (
              <span key={t} className="rounded border border-navy bg-hl px-2 text-[11px] font-bold text-navy">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      {teaser && (
        <div className="relative bg-white px-4 pb-6 pt-8">
          <div className="absolute left-1/2 top-2 -translate-x-1/2">
            <BubbleLabel tone="navy">{teaser.label}</BubbleLabel>
          </div>
          <div className="rounded-2xl border-2 border-accent bg-white px-3 pb-4 pt-6 shadow-[inset_0_0_0_4px_var(--c-primary-soft)]">
            {teaser.lines.map((l) => (
              <p key={l} className="mx-auto mb-2 w-fit bg-accent px-4 py-1 font-head text-[18px] font-black text-white wide">
                {l}
              </p>
            ))}
            <div className="mt-3 grid grid-cols-3 gap-2">
              {teaser.items.map((it) => (
                <figure key={it.label} className="text-center">
                  <div className="scallop bg-[linear-gradient(135deg,var(--c-step),var(--c-primary))] p-2">
                    <Img img={it.image} ratio="1" className="rounded-md" />
                  </div>
                  <figcaption className="mt-1 rounded-full border border-navy/30 px-1 text-[11px] font-bold text-navy">{it.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Stepper({ total, current, showBig }: { total: number; current: number; showBig: boolean }) {
  return (
    <div className="flex items-center gap-4" aria-label={`質問 ${current} / ${total}`}>
      <div className="flex items-center">
        {Array.from({ length: total }, (_, i) => (
          <div key={i} className="flex items-center">
            {i > 0 && <span className="h-[2px] w-3 bg-step" />}
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold ${
                i + 1 === current ? 'bg-step text-white' : 'bg-white text-step'
              }`}
            >
              Q{i + 1}
            </span>
          </div>
        ))}
      </div>
      {showBig && (
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-step font-num text-[20px] font-bold text-white">Q{current}</span>
      )}
    </div>
  );
}

function Question({
  q,
  last,
  value,
  onChange,
  onNext,
}: {
  q: SurveyQuestion;
  last: boolean;
  value: string[];
  onChange: (v: string[]) => void;
  onNext: (v: string[]) => void;
}) {
  const [locked, setLocked] = useState(false);
  const pick = (opt: string) => {
    if (locked) return;
    if (q.multiple) {
      onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
      return;
    }
    onChange([opt]);
    setLocked(true);
    window.setTimeout(() => onNext([opt]), 350);
  };
  return (
    <div className="fade-up">
      <h2 className="mt-5 whitespace-pre-line text-center font-head text-[18px] font-bold leading-relaxed text-ink">{q.text}</h2>
      <div className="my-5 flex justify-center">
        <Char c={q.character} size={110} />
      </div>
      <div className="space-y-3" role={q.multiple ? 'group' : 'radiogroup'} aria-label={q.text}>
        {q.options.map((opt) => {
          const on = value.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              role={q.multiple ? 'checkbox' : 'radio'}
              aria-checked={on}
              onClick={() => pick(opt)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-4 text-left text-[15px] font-bold shadow-[0_4px_0_var(--c-primary)] transition ${
                on ? 'bg-primary text-white' : 'bg-white text-ink'
              }`}
            >
              <span
                aria-hidden
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border-2 ${on ? 'border-white bg-white text-step' : 'border-muted/50'}`}
              >
                {on && '✓'}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {q.multiple && (
        <button
          type="button"
          disabled={value.length === 0}
          onClick={() => onNext(value)}
          className="mx-auto mt-8 block w-[70%] rounded-full bg-answer py-4 font-head text-[17px] font-black text-white shadow-[0_4px_0_rgba(0,0,0,0.15)] disabled:opacity-40"
        >
          {last ? brand.survey.submitLabel : '次へ'}
        </button>
      )}
    </div>
  );
}

/** 動画を最後まで見たら次の設問へ。シークで飛ばしても終わらない。読み込めなければ一定時間後に先へ進める */
function VideoGate({ onDone }: { onDone: () => void }) {
  const v = brand.survey.video!;
  const ref = useRef<HTMLVideoElement>(null);
  const maxSeen = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [escape, setEscape] = useState(false);
  const [ctlVisible, setCtlVisible] = useState(true);
  const hideTimer = useRef<number | undefined>(undefined);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    track('video_start');
    const el = ref.current;
    if (!el) return;
    const wait = (v.fallbackSeconds ?? 15) * 1000;
    // 再生が始まらない（読み込み失敗・自動再生ブロック）まま一定時間たったら、先へ進む導線を出す
    const t = window.setTimeout(() => {
      if (el.currentTime === 0 || el.error) setEscape(true);
    }, wait);
    const onTime = () => {
      if (el.currentTime > maxSeen.current) maxSeen.current = el.currentTime;
      setProgress(el.duration ? el.currentTime / el.duration : 0);
    };
    const onSeeking = () => {
      if (el.currentTime > maxSeen.current + 1) el.currentTime = maxSeen.current;
    };
    const onEnded = () => {
      track('video_complete');
      doneRef.current();
    };
    const onError = () => setEscape(true);
    const onPlay = () => {
      setPlaying(true);
      window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setCtlVisible(false), 1800);
    };
    const onPause = () => {
      setPlaying(false);
      setCtlVisible(true);
    };
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('seeking', onSeeking);
    el.addEventListener('ended', onEnded);
    el.addEventListener('error', onError);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.play().catch(() => setPlaying(false));
    return () => {
      window.clearTimeout(t);
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('seeking', onSeeking);
      el.removeEventListener('ended', onEnded);
      el.removeEventListener('error', onError);
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
    };
  }, [v.fallbackSeconds]);

  const el = () => ref.current!;
  const skip = (sec: number) => {
    const t = Math.max(0, Math.min(maxSeen.current, el().currentTime + sec));
    el().currentTime = t;
  };
  const ctl = 'flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white';

  return (
    <div className="fade-up">
      <p className="mt-6 text-center font-head text-[16px] font-bold">{rt(v.note)}</p>
      <div className="relative mt-5 overflow-hidden rounded-lg bg-navy shadow-lg">
        <video ref={ref} src={v.src} poster={v.poster} muted={muted} playsInline preload="auto" className="block aspect-video w-full" />
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-black/30">
          <div className="h-full bg-hl" style={{ width: `${progress * 100}%` }} />
        </div>
        <div
          className={`absolute inset-0 flex items-center justify-center gap-6 transition-opacity duration-300 ${ctlVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={(e) => {
            if (e.target !== e.currentTarget) return;
            setCtlVisible(true);
            window.clearTimeout(hideTimer.current);
            if (playing) hideTimer.current = window.setTimeout(() => setCtlVisible(false), 1800);
          }}
        >
          <button type="button" className={ctl} aria-label="10秒戻る" onClick={() => skip(-10)}>
            ↺
          </button>
          <button type="button" className={`${ctl} h-14 w-14 text-[22px]`} aria-label={playing ? '一時停止' : '再生'} onClick={() => (playing ? el().pause() : el().play())}>
            {playing ? '❚❚' : '▶'}
          </button>
          <button type="button" className={ctl} aria-label="10秒進む" onClick={() => skip(10)}>
            ↻
          </button>
        </div>
        <button type="button" className="absolute right-2 top-3 rounded bg-black/40 px-2 text-[12px] text-white" onClick={() => setMuted((m) => !m)}>
          {muted ? '🔇 音声ON' : '🔊 音声OFF'}
        </button>
      </div>
      {escape && (
        <button type="button" onClick={onDone} className="mx-auto mt-6 block text-[13px] text-muted underline">
          動画が再生できない方はこちらから次へ進む
        </button>
      )}
    </div>
  );
}
