const SOUND_PATHS = {
  bgm: "/sound_assets/bgm.mp3",
  error: "/sound_assets/sfx_error.m4a",
  fatalError: "/sound_assets/sfx_fatal_error.m4a",
  loading: "/sound_assets/sfx_loading.m4a",
  countDown: "/sound_assets/sfx_countDown.m4a",
  crash: "/sound_assets/sfx_crash.m4a",
  click: "/sound_assets/sfx_click.m4a",
  radioGlitch: "/sound_assets/sfx_radioglitch.m4a",
} as const;

type SfxKey = Exclude<keyof typeof SOUND_PATHS, "bgm">;

const VOLUME = {
  bgm: 0.58,
  click: 0.8,
  glitch: 0.38,
  loading: 0.45,
  countDown: 0.8,
  radioGlitch: 0.5,
} as const;

let bgmAudio: HTMLAudioElement | null = null;
let loadingAudio: HTMLAudioElement | null = null;
let bgmUnlocked = false;

function playOneShot(key: SfxKey, volume: number = VOLUME.glitch) {
  if (typeof window === "undefined") return;

  const audio = new Audio(SOUND_PATHS[key]);
  audio.volume = volume;
  void audio.play().catch(() => {});
}

function ensureBgm() {
  if (typeof window === "undefined") return null;

  if (!bgmAudio) {
    bgmAudio = new Audio(SOUND_PATHS.bgm);
    bgmAudio.loop = true;
    bgmAudio.volume = VOLUME.bgm;
  }

  return bgmAudio;
}

export function unlockAndStartBgm() {
  const bgm = ensureBgm();
  if (!bgm) return;

  bgmUnlocked = true;
  void bgm.play().catch(() => {});
}

export function startBgm() {
  unlockAndStartBgm();
}

export function playError() {
  playOneShot("error");
}

export function playFatalError() {
  playOneShot("fatalError");
}

export function playLoading() {
  stopLoading();

  if (typeof window === "undefined") return;

  loadingAudio = new Audio(SOUND_PATHS.loading);
  loadingAudio.loop = true;
  loadingAudio.volume = VOLUME.loading;
  void loadingAudio.play().catch(() => {});
}

export function stopLoading() {
  if (!loadingAudio) return;
  loadingAudio.pause();
  loadingAudio = null;
}

export function playCountDown() {
  playOneShot("countDown", VOLUME.countDown);
}

export function playCrash() {
  playOneShot("crash", VOLUME.glitch);
}

export function playClick() {
  playOneShot("click", VOLUME.click);
}

export function playRadioGlitch() {
  playOneShot("radioGlitch", VOLUME.radioGlitch);
}

export function playAnswerSounds(questionIndex: number, variant: string) {
  if (questionIndex === 0 || questionIndex === 1) {
    playClick();
  }

  if (variant === "none" || questionIndex === 1) return;

  playCrash();

  if (questionIndex === 2 || questionIndex === 3) {
    playError();
  }

  if (questionIndex === 4) {
    playFatalError();
  }
}
