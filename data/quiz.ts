export type ResultId =
  | "replacement"
  | "observer"
  | "lost"
  | "mimic"
  | "anomaly";

export type QuizStage = "start" | "quiz" | "preparing" | "result";

export interface QuizOption {
  id: string;
  label: string;
  scores: Partial<Record<ResultId, number>>;
}

export interface QuizQuestion {
  id: number;
  text: string;
  image: string;
  options: QuizOption[];
}

export interface QuizResult {
  id: ResultId;
  title: string;
  titleEn: string;
  body: string[];
  traits: string[];
  image: string;
}

export const QUIZ_TITLE = "實體辨識系統 v3.2";
export const QUIZ_SUBTITLE =
  "本系統將確認您是否為原始人類個體。請誠實回答以下問題。";

export const questions: QuizQuestion[] = [
  {
    id: 1,
    text: "深夜回家時，你發現家中的燈是亮的。但你記得出門前已經關燈。你會：",
    image: "/horror/scene-light.svg",
    options: [
      { id: "A", label: "進屋查看", scores: { observer: 2, replacement: 1 } },
      { id: "B", label: "打電話給家人", scores: { mimic: 2 } },
      { id: "C", label: "先觀察一段時間", scores: { observer: 3, lost: 1 } },
      { id: "D", label: "直接離開", scores: { lost: 2, anomaly: 2 } },
      {
        id: "E",
        label: "我不確定燈原本是否關閉",
        scores: { replacement: 3 },
      },
    ],
  },
  {
    id: 2,
    text: "鏡中的你比現實慢了半秒鐘。你第一個想法是：",
    image: "/horror/scene-mirror.svg",
    options: [
      { id: "A", label: "自己太累了", scores: { replacement: 2, mimic: 1 } },
      { id: "B", label: "鏡子有問題", scores: { observer: 2 } },
      { id: "C", label: "錄下來", scores: { observer: 2, anomaly: 2 } },
      { id: "D", label: "逃離現場", scores: { lost: 3 } },
      {
        id: "E",
        label: "觀察鏡中的自己",
        scores: { replacement: 2, observer: 2 },
      },
    ],
  },
  {
    id: 3,
    text: "手機收到一張照片。照片中的你正在睡覺。拍攝時間顯示：「五分鐘後」。你會：",
    image: "/horror/scene-phone.svg",
    options: [
      { id: "A", label: "刪除照片", scores: { mimic: 2, replacement: 1 } },
      { id: "B", label: "報警", scores: { observer: 2 } },
      { id: "C", label: "查看房間", scores: { observer: 3, lost: 1 } },
      { id: "D", label: "關閉手機", scores: { lost: 2 } },
      { id: "E", label: "放大照片細看", scores: { observer: 2, anomaly: 3 } },
    ],
  },
  {
    id: 4,
    text: "你在空無一人的走廊上聽見有人叫你的名字。聲音來自前方。但前方沒有任何人。你會：",
    image: "/horror/scene-hallway.svg",
    options: [
      { id: "A", label: "回應", scores: { replacement: 3, mimic: 1 } },
      { id: "B", label: "無視", scores: { mimic: 3, observer: 1 } },
      { id: "C", label: "走向聲音來源", scores: { lost: 2, replacement: 1 } },
      { id: "D", label: "逃跑", scores: { lost: 3 } },
      { id: "E", label: "仔細聆聽第二次", scores: { observer: 3, anomaly: 2 } },
    ],
  },
  {
    id: 5,
    text: "你發現另一個自己坐在房間角落。祂沒有動。只是看著你。你覺得祂是：",
    image: "/horror/scene-double.svg",
    options: [
      { id: "A", label: "幻覺", scores: { replacement: 2, mimic: 1 } },
      { id: "B", label: "威脅", scores: { observer: 2, lost: 1 } },
      { id: "C", label: "某種警告", scores: { observer: 1, anomaly: 2 } },
      { id: "D", label: "未來的自己", scores: { lost: 2, anomaly: 2 } },
      { id: "E", label: "真正的自己", scores: { anomaly: 4, replacement: 1 } },
    ],
  },
];

export const results: Record<ResultId, QuizResult> = {
  replacement: {
    id: "replacement",
    title: "替代體",
    titleEn: "Replacement",
    body: [
      "系統檢測到身份重疊。",
      "原始個體位置未知。",
      "您正在閱讀這段文字的事實，",
      "無法證明您是原來的那個人。",
    ],
    traits: ["容易接受異常", "自我認知不穩定"],
    image: "/horror/result-replacement.svg",
  },
  observer: {
    id: "observer",
    title: "觀察者",
    titleEn: "Observer",
    body: ["您不是目標。", "但您看見了太多東西。"],
    traits: ["冷靜", "高警覺", "會注意到別人忽略的細節"],
    image: "/horror/result-observer.svg",
  },
  lost: {
    id: "lost",
    title: "迷失者",
    titleEn: "Lost Subject",
    body: [
      "您的位置無法定位。",
      "最後一次紀錄：",
      "Level 0",
      "走廊17-B",
      "之後再無訊號。",
    ],
    traits: ["方向感依賴直覺", "容易陷入記憶迷宮"],
    image: "/horror/result-lost.svg",
  },
  mimic: {
    id: "mimic",
    title: "模仿體",
    titleEn: "Mimic",
    body: [
      "您非常擅長扮演他人。",
      "久而久之，",
      "您已忘記自己的樣子。",
    ],
    traits: ["適應力強", "社交面具多"],
    image: "/horror/result-mimic.svg",
  },
  anomaly: {
    id: "anomaly",
    title: "異常源",
    titleEn: "Anomaly",
    body: [
      "系統發生錯誤。",
      "您不在資料庫內。",
      "您並非被發現的異常。",
      "您是異常產生的原因。",
    ],
    traits: ["高獨立性", "不容易被分類", "所有結果都不適用於你"],
    image: "/horror/result-anomaly.svg",
  },
};

export function calculateResult(
  answers: string[],
): ResultId {
  const scores: Record<ResultId, number> = {
    replacement: 0,
    observer: 0,
    lost: 0,
    mimic: 0,
    anomaly: 0,
  };

  answers.forEach((optionId, questionIndex) => {
    const question = questions[questionIndex];
    const option = question?.options.find((item) => item.id === optionId);
    if (!option) return;

    for (const [resultId, value] of Object.entries(option.scores)) {
      scores[resultId as ResultId] += value ?? 0;
    }
  });

  const entries = Object.entries(scores) as [ResultId, number][];
  const maxScore = Math.max(...entries.map(([, score]) => score));
  const topResults = entries.filter(([, score]) => score === maxScore);

  if (topResults.length >= 3) {
    return "anomaly";
  }

  const anomalyScore = scores.anomaly;
  const secondMax = Math.max(
    ...entries
      .filter(([id]) => id !== "anomaly")
      .map(([, score]) => score),
  );

  if (anomalyScore >= 6 || (anomalyScore >= 4 && anomalyScore >= secondMax)) {
    return "anomaly";
  }

  return topResults[0][0];
}
