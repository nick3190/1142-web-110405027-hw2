"use client";

import { useQuizStore } from "@/store/quiz-store";
import { GlitchOverlay } from "@/components/GlitchOverlay";
import { StartScreen } from "@/components/StartScreen";
import { QuestionScreen } from "@/components/QuestionScreen";
import { PreparingScreen } from "@/components/PreparingScreen";
import { ResultScreen } from "@/components/ResultScreen";

export function QuizApp() {
  const stage = useQuizStore((state) => state.stage);
  const isGlitching = useQuizStore((state) => state.isGlitching);

  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background px-3 py-4 sm:max-w-lg sm:px-4 md:max-w-xl">
      <header className="mb-3 shrink-0 border-b border-foreground/20 pb-2 text-[10px] tracking-widest text-foreground/60 uppercase">
        SYS://ENTITY_RECOGNITION_v3.2
      </header>

      <div className="relative flex flex-1 flex-col">
        {stage === "start" && <StartScreen />}
        {stage === "quiz" && <QuestionScreen />}
        {stage === "preparing" && <PreparingScreen />}
        {stage === "result" && <ResultScreen />}
      </div>

      {isGlitching && <GlitchOverlay />}
    </main>
  );
}
