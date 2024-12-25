// Create AudioContext only when needed to comply with browser autoplay policies
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

const playTone = (frequency: number, duration: number) => {
  const context = getAudioContext();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.frequency.value = frequency;
  gainNode.gain.value = 0.1;

  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration);
  oscillator.stop(context.currentTime + duration);
};

export const playClickSound = () => {
  playTone(800, 0.1);
};

export const playCompleteSound = () => {
  // Play a short ascending arpeggio
  setTimeout(() => playTone(400, 0.15), 0);
  setTimeout(() => playTone(500, 0.15), 100);
  setTimeout(() => playTone(600, 0.15), 200);
};