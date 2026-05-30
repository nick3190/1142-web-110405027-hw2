"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { results, type ResultId } from "@/data/quiz";
import { useQuizStore } from "@/store/quiz-store";
import {
  playCountDown,
  playCrash,
  playFatalError,
  playRadioGlitch,
} from "@/lib/audio";
import { GlitchButton } from "@/components/GlitchButton";
import { CountdownRedFlash } from "@/components/CountdownRedFlash";
import { QuizImageFrame } from "@/components/QuizImageFrame";
import { SystemFailureOverlay } from "@/components/SystemFailureOverlay";

const RESULT_ASPECT: Record<ResultId, "wide" | "wide-alt"> = {
  replacement: "wide",
  observer: "wide",
  lost: "wide",
  mimic: "wide-alt",
  anomaly: "wide",
};

export function ResultScreen() {
  const resultId = useQuizStore((state) => state.resultId);
  const resetQuiz = useQuizStore((state) => state.resetQuiz);
  const cardRef = useRef<HTMLElement>(null);

  const [countdown, setCountdown] = useState(10);
  const [downloaded, setDownloaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [systemFailed, setSystemFailed] = useState(false);
  const [redFlash, setRedFlash] = useState(false);
  const countDownPlayedRef = useRef(false);

  useEffect(() => {
    if (downloaded) return;

    const timer = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setSystemFailed(true);
          return 0;
        }

        setRedFlash(true);
        window.setTimeout(() => setRedFlash(false), 220);
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [downloaded]);

  useEffect(() => {
    if (countdown !== 7 || countDownPlayedRef.current || downloaded) return;
    countDownPlayedRef.current = true;
    playCountDown();
  }, [countdown, downloaded]);

  useEffect(() => {
    if (!systemFailed) return;

    playFatalError();
    playCrash();

    const subtitleTimer = window.setTimeout(() => {
      playRadioGlitch();
    }, 1200);

    return () => window.clearTimeout(subtitleTimer);
  }, [systemFailed]);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current || isDownloading || systemFailed) return;

    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#d4d0c8",
      });

      const link = document.createElement("a");
      link.download = `entity-recognition-${resultId ?? "result"}.png`;
      link.href = dataUrl;
      link.click();
      setDownloaded(true);
      setCountdown(0);
    } catch {
      window.alert("下載失敗，請再試一次。");
    } finally {
      setIsDownloading(false);
    }
  }, [isDownloading, resultId, systemFailed]);

  if (!resultId) return null;

  const result = results[resultId];
  const countdownActive = !downloaded && !systemFailed && countdown > 0;

  return (
    <>
      <CountdownRedFlash
        active={countdownActive}
        flash={redFlash}
        urgent={countdown <= 3}
      />

      <section className="quiz-layout-shell grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-1 overflow-hidden sm:gap-1.5">
        <div className="shrink-0 text-center text-[11px] tracking-[0.25em] text-foreground/50 uppercase sm:text-xs">
          辨識結果
        </div>

        <article
          ref={cardRef}
          className="flex min-h-0 min-w-0 flex-col gap-1 overflow-hidden sm:gap-1.5"
        >
          <QuizImageFrame
            src={result.image}
            aspect={RESULT_ASPECT[resultId]}
            layout="result"
          />

          <div className="quiz-scroll-panel dither-bg pixel-border min-h-0 flex-1 space-y-1 p-2 text-ink sm:space-y-1.5 sm:p-2.5">
            <div>
              <h2 className="text-base tracking-wide sm:text-lg">
                {result.title}
              </h2>
              <p className="text-xs tracking-widest text-ink/60 uppercase sm:text-sm">
                {result.titleEn}
              </p>
            </div>

            <div className="h-px w-full bg-ink/30" />

            <div className="space-y-0.5 break-words text-[11px] leading-snug sm:text-xs">
              {result.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div className="h-px w-full bg-ink/30" />

            <div>
              <p className="mb-1 text-[11px] tracking-wider uppercase sm:text-xs">
                特徵
              </p>
              <ul className="space-y-0.5 text-xs sm:text-sm">
                {result.traits.map((trait) => (
                  <li key={trait} className="flex gap-1.5">
                    <span className="text-accent-red">*</span>
                    <span>{trait}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        <div className="flex shrink-0 gap-1 sm:gap-1.5">
          <GlitchButton
            onClick={handleDownload}
            disabled={isDownloading || downloaded || systemFailed}
            className="flex-1 px-2.5 py-2 text-xs tracking-wider text-ink hover:bg-paper/80 sm:py-2.5 sm:text-sm"
          >
            {downloaded
              ? "✓ 已下載"
              : isDownloading
                ? "下載中…"
                : `↓ 下載 PNG (${countdown}s)`}
          </GlitchButton>
          <GlitchButton
            onClick={resetQuiz}
            disabled={systemFailed}
            className="px-2.5 py-2 text-xs tracking-wider text-ink hover:bg-paper/80 disabled:opacity-40 sm:py-2.5 sm:text-sm"
          >
            ↺ 重測
          </GlitchButton>
        </div>
      </section>

      <SystemFailureOverlay active={systemFailed} />
    </>
  );
}
