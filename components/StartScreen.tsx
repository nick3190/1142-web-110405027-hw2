"use client";

import { useCallback, useState } from "react";
import { useQuizStore } from "@/store/quiz-store";
import { QUIZ_SUBTITLE, QUIZ_TITLE } from "@/data/quiz";
import { playError } from "@/lib/audio";
import { GlitchButton } from "@/components/GlitchButton";
import { QuizImageFrame } from "@/components/QuizImageFrame";

export function StartScreen() {
  const startQuiz = useQuizStore((state) => state.startQuiz);
  const [buttonState, setButtonState] = useState<"idle" | "fail">("idle");

  const handleStart = useCallback(() => {
    if (buttonState !== "idle") return;

    playError();
    setButtonState("fail");

    window.setTimeout(() => {
      setButtonState("idle");
    }, 150);

    window.setTimeout(() => {
      startQuiz();
    }, 300);
  }, [buttonState, startQuiz]);

  const isFailFlash = buttonState === "fail";

  return (
    <section className="grid h-full min-h-0 grid-rows-[minmax(0,1fr)_auto_auto_auto] gap-2 sm:gap-2.5">
      <div className="flex min-h-0 items-center justify-center">
        <QuizImageFrame
          src="/pic/intro.webp"
          aspect="square"
          size="fit"
          crop
          cropZoom={1.35}
          priority
          overlay={
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5">
              <p className="text-[11px] tracking-wider text-foreground/70 sm:text-xs">
                [ 監視畫面 // 待機中 ]
              </p>
            </div>
          }
        />
      </div>

      <div className="dither-bg pixel-border flex shrink flex-col gap-1.5 p-2.5 text-ink sm:gap-2 sm:p-3">
        <h1 className="text-base leading-tight tracking-wide sm:text-lg">
          {QUIZ_TITLE}
        </h1>
        <div className="h-px w-full bg-ink/30" />
        <p className="text-sm leading-snug sm:text-base">{QUIZ_SUBTITLE}</p>
      </div>

      <GlitchButton
        onClick={handleStart}
        disabled={buttonState !== "idle"}
        variant={isFailFlash ? "danger" : "primary"}
        className={`w-full shrink px-3 py-2.5 text-sm sm:py-3 sm:text-base ${
          isFailFlash ? "" : "text-ink hover:bg-paper/80"
        }`}
      >
        {isFailFlash ? "測驗失敗" : "▶ 開始測試"}
      </GlitchButton>

      <p className="shrink text-center text-[11px] text-foreground/40 sm:text-xs">
        警告：本測驗可能引發認知不適
      </p>
    </section>
  );
}
