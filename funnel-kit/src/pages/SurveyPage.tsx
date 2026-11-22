import { useEffect, useMemo, useRef, useState } from "react";
import { brand } from "../brand";
import { rt } from "../lib/rt";
import { navigate } from "../lib/router";
import { save } from "../lib/store";
import { track } from "../lib/track";
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  Pause,
  Play,
  SpeakerHigh,
  SpeakerSlash,
} from "@phosphor-icons/react";
import { Char, Img } from "../components/ui";
import { Icon } from "../components/Icon";
import type { SurveyQuestion } from "../types";

type Step = { kind: "q"; q: SurveyQuestion; n: number } | { kind: "video" };

export function SurveyPage() {
  const sv = brand.survey;
  const steps = useMemo<Step[]>(() => {
    const out: Step[] = [];
    sv.questions.forEach((q, i) => {
      out.push({ kind: "q", q, n: i + 1 });
      if (
        sv.video &&
        sv.video.afterQuestion === i + 1 &&
        i < sv.questions.length - 1
      )
        out.push({ kind: "video" });
    });
    return out;
  }, [sv]);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [wipe, setWipe] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    track("survey_view");
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
    save("survey", final);
    track("survey_complete", { answers: final });
    navigate("/lp", { from: "survey" });
  };

  const step = steps[idx];
  const currentQ =
    step.kind === "q"
      ? step.n
      : (steps[idx - 1] as Extract<Step, { kind: "q" }>).n;

  return (
    <div className="min-h-dvh bg-survey" ref={topRef}>
      {wipe && <div className="wipe" aria-hidden />}
      {idx === 0 && <SurveyHero />}
      <div className="px-5 pb-16 pt-8">
        <Stepper total={sv.questions.length} current={currentQ} />
        {step.kind === "video" ? (
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
              track("survey_answer", { q: step.q.id, value: v.join(" / ") });
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
    <header className="px-5 pt-5">
      <div className="relative overflow-hidden rounded-2xl">
        <Img img={hero.image} ratio="4/3" eager />
        {hero.imageNote && (
          <span className="absolute bottom-2 right-3 text-[10px] text-white [text-shadow:0_0_4px_rgba(0,0,0,0.55)]">
            {hero.imageNote}
          </span>
        )}
      </div>
      {hero.tags && (
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {hero.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-primary/30 px-3 py-0.5 text-[12px] font-bold text-primary"
            >
              {t}
            </li>
          ))}
        </ul>
      )}
      <h1 className="mt-3 font-head text-[30px] font-bold leading-[1.45] tracking-[0.02em] text-ink">
        {hero.lines.map((l, i) => (
          <span
            key={i}
            className={`block ${l.style === "boxAccent" ? "text-primary" : ""}`}
          >
            {l.text}
          </span>
        ))}
      </h1>
      {teaser && (
        <div className="mt-7 rounded-2xl border border-line bg-surface p-5">
          <p className="text-[13px] font-bold text-muted">{teaser.label}</p>
          <p className="mt-1 font-head text-[19px] font-bold leading-[1.5]">
            {teaser.lines.join("")}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {teaser.items.map((it) => (
              <figure key={it.label}>
                <div className="overflow-hidden rounded-xl">
                  <Img img={it.image} ratio="1" />
                </div>
                <figcaption className="mt-1.5 text-center text-[12px] font-bold leading-snug">
                  {it.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/** 進み具合：「質問 1 / 3」と、3つに区切ったバー */
function Stepper({ total, current }: { total: number; current: number }) {
  return (
    <div aria-label={`質問 ${current} / ${total}`}>
      <p className="text-[13px] font-bold text-primary">
        質問 <span className="font-num text-[16px]">{current}</span>
        <span className="text-muted"> / {total}</span>
      </p>
      <div
        className="mt-2 grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }}
      >
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-colors duration-500 ${i < current ? "bg-primary" : "bg-line"}`}
          />
        ))}
      </div>
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
      onChange(
        value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt],
      );
      return;
    }
    onChange([opt]);
    setLocked(true);
    window.setTimeout(() => onNext([opt]), 350);
  };
  return (
    <div className="fade-up">
      <div className="mt-6 flex items-start gap-4">
        <h2 className="flex-1 whitespace-pre-line font-head text-[20px] font-bold leading-[1.6] text-ink">
          {q.text}
        </h2>
        <Char c={q.character} size={52} />
      </div>
      {q.multiple && (
        <p className="mt-1 text-[12px] text-muted">
          あてはまるものをすべて選んでください
        </p>
      )}
      <div
        className="mt-5 space-y-2.5"
        role={q.multiple ? "group" : "radiogroup"}
        aria-label={q.text}
      >
        {q.options.map((opt) => {
          const on = value.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              role={q.multiple ? "checkbox" : "radio"}
              aria-checked={on}
              onClick={() => pick(opt)}
              className={`flex min-h-[60px] w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-[15px] font-bold leading-snug transition-colors duration-200 active:scale-[0.99] ${
                on
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-line bg-surface text-ink"
              }`}
            >
              <span
                aria-hidden
                className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center border-[1.5px] transition-colors ${q.multiple ? "rounded-md" : "rounded-full"} ${
                  on
                    ? "border-primary bg-primary text-white"
                    : "border-ink/25 bg-surface"
                }`}
              >
                {on && <Icon name="check" size={13} weight="bold" />}
              </span>
              <span className="flex-1">{opt}</span>
            </button>
          );
        })}
      </div>
      {q.multiple && (
        <button
          type="button"
          disabled={value.length === 0}
          onClick={() => onNext(value)}
          className="cta-pill mt-8 disabled:opacity-40"
        >
          <span>{last ? brand.survey.submitLabel : "次へ"}</span>
          <span aria-hidden className="text-[18px] leading-none">
            →
          </span>
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
    track("video_start");
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
      if (el.currentTime > maxSeen.current + 1)
        el.currentTime = maxSeen.current;
    };
    const onEnded = () => {
      track("video_complete");
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
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("seeking", onSeeking);
    el.addEventListener("ended", onEnded);
    el.addEventListener("error", onError);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.play().catch(() => setPlaying(false));
    return () => {
      window.clearTimeout(t);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("seeking", onSeeking);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("error", onError);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, [v.fallbackSeconds]);

  const el = () => ref.current!;
  const skip = (sec: number) => {
    const t = Math.max(0, Math.min(maxSeen.current, el().currentTime + sec));
    el().currentTime = t;
  };
  const ctl =
    "flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white";

  return (
    <div className="fade-up">
      <p className="mt-6 font-head text-[17px] font-bold leading-[1.6]">
        {rt(v.note)}
      </p>
      <div className="relative mt-5 overflow-hidden rounded-2xl bg-navy">
        <video
          ref={ref}
          src={v.src}
          poster={v.poster}
          muted={muted}
          playsInline
          preload="auto"
          className="block aspect-video w-full"
        />
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-black/30">
          <div
            className="h-full bg-white"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div
          className={`absolute inset-0 flex items-center justify-center gap-6 transition-opacity duration-300 ${ctlVisible ? "opacity-100" : "opacity-0"}`}
          onClick={(e) => {
            if (e.target !== e.currentTarget) return;
            setCtlVisible(true);
            window.clearTimeout(hideTimer.current);
            if (playing)
              hideTimer.current = window.setTimeout(
                () => setCtlVisible(false),
                1800,
              );
          }}
        >
          <button
            type="button"
            className={ctl}
            aria-label="10秒戻る"
            onClick={() => skip(-10)}
          >
            <ArrowCounterClockwise size={20} />
          </button>
          <button
            type="button"
            className={`${ctl} h-14 w-14 text-[22px]`}
            aria-label={playing ? "一時停止" : "再生"}
            onClick={() => (playing ? el().pause() : el().play())}
          >
            {playing ? (
              <Pause size={24} weight="fill" />
            ) : (
              <Play size={24} weight="fill" />
            )}
          </button>
          <button
            type="button"
            className={ctl}
            aria-label="10秒進む"
            onClick={() => skip(10)}
          >
            <ArrowClockwise size={20} />
          </button>
        </div>
        <button
          type="button"
          className="absolute right-2 top-3 flex items-center gap-1 rounded-full bg-black/45 px-3 py-1 text-[12px] text-white"
          onClick={() => setMuted((m) => !m)}
        >
          {muted ? <SpeakerSlash size={14} /> : <SpeakerHigh size={14} />}
          {muted ? "音声ON" : "音声OFF"}
        </button>
      </div>
      {escape && (
        <button
          type="button"
          onClick={onDone}
          className="mx-auto mt-6 block text-[13px] text-muted underline"
        >
          動画が再生できない方はこちらから次へ進む
        </button>
      )}
    </div>
  );
}
