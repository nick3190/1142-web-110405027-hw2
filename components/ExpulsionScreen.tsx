"use client";

import { useQuizStore } from "@/store/quiz-store";
import { GlitchButton } from "@/components/GlitchButton";

export function ExpulsionScreen() {
  const resetQuiz = useQuizStore((state) => state.resetQuiz);

  return (
    <section className="flex h-full min-h-0 flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="snap-glitch-reveal w-full">
        <p className="snap-glitch-text text-2xl font-bold tracking-widest text-accent-red sm:text-3xl">
          判定：偽人
        </p>
        <p className="mt-3 text-base tracking-wider text-foreground sm:text-lg">
          答題逾時
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/70 sm:text-base">
          系統已確認您非原始人類個體。
          <br />
          驅逐程序啟動中…
        </p>
      </div>
      <div className="system-failure-shake w-full">
        <p className="glitch-active text-lg tracking-[0.3em] text-white uppercase sm:text-xl">
          驅逐完成
        </p>
      </div>
      <GlitchButton
        onClick={resetQuiz}
        className="w-full max-w-xs px-4 py-2.5 text-sm text-ink sm:text-base"
      >
        ↺ 重新測驗
      </GlitchButton>
    </section>
  );
}
