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
    <section className="quiz-layout-shell grid h-full min-h-0 grid-rows-[minmax(0,1fr)_auto_auto_auto] gap-1.5 overflow-hidden sm:gap-2">
      <div className="flex min-h-0 items-center justify-center overflow-hidden">
        <QuizImageFrame
          src="/pic/intro.webp"
          aspect="square"
          layout="intro"
          crop
          cropZoom={1.35}
          priority
          overlay={
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1">
              <p className="truncate text-[10px] tracking-wider text-foreground/70 sm:text-xs">
                [ 監視畫面 // 待機中 ]
              </p>
            </div>
          }
        />
      </div>

      <div className="dither-bg pixel-border flex min-w-0 shrink flex-col gap-1 p-2 text-ink sm:gap-1.5 sm:p-2.5">
        <h1 className="break-words text-sm leading-tight tracking-wide sm:text-base md:text-lg">
          {QUIZ_TITLE}
        </h1>
        <div className="h-px w-full bg-ink/30" />
        <p className="break-words text-xs leading-snug sm:text-sm">
          {QUIZ_SUBTITLE}
        </p>
      </div>

      <GlitchButton
        onClick={handleStart}
        disabled={buttonState !== "idle"}
        variant={isFailFlash ? "danger" : "primary"}
        className={`w-full min-w-0 shrink px-3 py-2 text-xs sm:py-2.5 sm:text-sm ${
          isFailFlash ? "" : "text-ink hover:bg-paper/80"
        }`}
      >
        {isFailFlash ? "測驗失敗" : "▶ 開始測試"}
      </GlitchButton>

      <p className="shrink truncate text-center text-[10px] text-foreground/40 sm:text-xs">
        警告：本測驗可能引發認知不適
      </p>
    </section>
  );
}
