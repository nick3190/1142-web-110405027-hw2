"use client";

import { useEffect } from "react";
import { useQuizStore } from "@/store/quiz-store";

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
    const timer = window.setTimeout(finishPreparing, 3000);
    return () => window.clearTimeout(timer);
  }, [finishPreparing]);

  return (
    <section className="fade-in flex flex-1 flex-col items-center justify-center gap-6 px-2">
      <div className="w-full space-y-2">
        <p className="pulse-red text-center text-sm tracking-widest">
          正在分析您的回應
        </p>
        <div className="pixel-border h-4 w-full overflow-hidden bg-black">
          <div className="preparing-bar h-full bg-accent-red" />
        </div>
      </div>

      <div className="dither-bg pixel-border w-full space-y-2 p-4 text-sm text-ink">
        {messages.map((message, index) => (
          <p
            key={message}
            className="opacity-0 fade-in"
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <span className="text-accent-red">&gt;</span> {message}
          </p>
        ))}
        <p className="blink-cursor text-xs text-ink/60">請勿關閉視窗</p>
      </div>
    </section>
  );
}
