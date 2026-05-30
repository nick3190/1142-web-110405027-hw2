"use client";

import Image from "next/image";
import { useQuizStore } from "@/store/quiz-store";
import { QUIZ_SUBTITLE, QUIZ_TITLE } from "@/data/quiz";

export function StartScreen() {
  const startQuiz = useQuizStore((state) => state.startQuiz);

  return (
    <section className="fade-in flex flex-1 flex-col gap-4">
      <div className="pixel-border relative aspect-[3/4] w-full overflow-hidden bg-black">
        <Image
          src="/horror/scene-intro.svg"
          alt=""
          fill
          priority
          className="horror-image object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <p className="text-[10px] tracking-wider text-foreground/70">
            [ 監視畫面 // 待機中 ]
          </p>
        </div>
      </div>

      <div className="dither-bg pixel-border flex flex-col gap-3 p-4 text-ink">
        <h1 className="text-lg leading-tight tracking-wide">{QUIZ_TITLE}</h1>
        <div className="h-px w-full bg-ink/30" />
        <p className="text-sm leading-relaxed">{QUIZ_SUBTITLE}</p>
      </div>

      <button
        type="button"
        onClick={startQuiz}
        className="pixel-border dither-bg w-full cursor-pointer px-4 py-3 text-sm tracking-widest text-ink uppercase transition hover:bg-paper/80 active:translate-x-0.5 active:translate-y-0.5"
      >
        ▶ 開始辨識
      </button>

      <p className="text-center text-[10px] text-foreground/40">
        警告：本測驗可能引發認知不適
      </p>
    </section>
  );
}
