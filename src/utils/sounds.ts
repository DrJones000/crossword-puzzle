// Create AudioContext only when needed to comply with browser autoplay policies
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext;
  } catch (error) {
    console.log('AudioContext not supported or blocked by browser');
    return null;
  }
};

const playTone = (frequency: number, duration: number, startTime: number = 0, volume: number = 0.1) => {
  const context = getAudioContext();
  if (!context) return; // Gracefully handle when audio context is not available

  try {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.frequency.value = frequency;
    gainNode.gain.value = volume;

    oscillator.start(context.currentTime + startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + startTime + duration);
    oscillator.stop(context.currentTime + startTime + duration);
  } catch (error) {
    console.log('Error playing sound:', error);
  }
};

export const playSound = (type: "click" | "complete" | "victory") => {
  try {
    switch (type) {
      case "click":
        playTone(800, 0.1);
        break;
      case "complete":
        // Play a short ascending arpeggio
        setTimeout(() => playTone(400, 0.15), 0);
        setTimeout(() => playTone(500, 0.15), 100);
        setTimeout(() => playTone(600, 0.15), 200);
        break;
      case "victory":
        // Play a more elaborate victory fanfare
        const now = getAudioContext()?.currentTime || 0;
        
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
        break;
    }
  } catch (error) {
    console.log('Error in playSound:', error);
  }
};

// Alias functions for backward compatibility
export const playClickSound = () => playSound("click");
export const playCompleteSound = () => playSound("complete");
export const playVictorySound = () => playSound("victory");