"use client";

import { useEffect } from "react";
import { useQuizStore } from "@/store/quiz-store";
import { playLoading, stopLoading } from "@/lib/audio";

const messages = [
  "正在比對行為模式…",
  "交叉驗證記憶片段…",
  "掃描異常特徵…",
  "定位個體座標…",
  "生成辨識報告…",
];

export function PreparingScreen() {
  const finishPreparing = useQuizStore((state) => state.finishPreparing);

  useEffect(() => {
    playLoading();

    const timer = window.setTimeout(finishPreparing, 3000);
    return () => {
      window.clearTimeout(timer);
      stopLoading();
    };
  }, [finishPreparing]);

  return (
    <section className="quiz-layout-shell flex h-full min-h-0 flex-col items-center justify-center gap-3 overflow-hidden px-1 sm:gap-4">
      <div className="w-full space-y-2">
        <p className="pulse-red text-center text-sm tracking-widest sm:text-base">
          正在分析您的回應
        </p>
        <div className="pixel-border h-3.5 w-full overflow-hidden bg-black sm:h-4">
          <div className="preparing-bar h-full bg-accent-red" />
        </div>
      </div>

      <div className="dither-bg pixel-border w-full space-y-1.5 p-3 text-sm text-ink sm:space-y-2 sm:p-4 sm:text-base">
        {messages.map((message, index) => (
          <p
            key={message}
            className="opacity-0 fade-in"
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <span className="text-accent-red">&gt;</span> {message}
          </p>
        ))}
        <p className="blink-cursor text-xs text-ink/60 sm:text-sm">請勿關閉視窗</p>
      </div>
    </section>
  );
}
