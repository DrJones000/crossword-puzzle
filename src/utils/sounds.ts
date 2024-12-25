// Create AudioContext only when needed to comply with browser autoplay policies
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

const playTone = (frequency: number, duration: number, startTime: number = 0, volume: number = 0.1) => {
  const context = getAudioContext();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.frequency.value = frequency;
  gainNode.gain.value = volume;

  oscillator.start(context.currentTime + startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + startTime + duration);
  oscillator.stop(context.currentTime + startTime + duration);
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

export const playVictorySound = () => {
  // Play a more elaborate victory fanfare
  const now = getAudioContext().currentTime;
  
  // First chord
  playTone(523.25, 0.3, 0, 0.08);  // C5
  playTone(659.25, 0.3, 0, 0.08);  // E5
  playTone(783.99, 0.3, 0, 0.08);  // G5

  // Ascending arpeggio
  playTone(523.25, 0.1, 0.3, 0.08);  // C5
  playTone(587.33, 0.1, 0.4, 0.08);  // D5
  playTone(659.25, 0.1, 0.5, 0.08);  // E5
  playTone(698.46, 0.1, 0.6, 0.08);  // F5
  playTone(783.99, 0.1, 0.7, 0.08);  // G5
  
  // Final chord
  playTone(523.25, 0.4, 0.8, 0.08);  // C5
  playTone(659.25, 0.4, 0.8, 0.08);  // E5
  playTone(783.99, 0.4, 0.8, 0.08);  // G5
  playTone(1046.50, 0.4, 0.8, 0.08); // C6
};