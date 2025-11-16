// Audio context singleton
let audioContext = null;

export const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

// Convert MIDI note to frequency (A4 = 440 Hz = MIDI 69)
export const midiToFreq = (midi) => {
  return 440 * Math.pow(2, (midi - 69) / 12);
};

// Convert frequency to MIDI note
export const freqToMidi = (freq) => {
  return 69 + 12 * Math.log2(freq / 440);
};

// Calculate cents between two frequencies
export const centsBetween = (freq1, freq2) => {
  return 1200 * Math.log2(freq2 / freq1);
};

// Calculate frequency for a given number of semitones in 12-TET
export const semitonesToRatio = (semitones) => {
  return Math.pow(2, semitones / 12);
};

// Play a frequency for a specified duration
export const playFrequency = (freq, duration = 1, waveType = 'sine', gain = 0.3) => {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.frequency.value = freq;
  osc.type = waveType;

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  gainNode.gain.setValueAtTime(gain, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);

  return { osc, gainNode };
};

// Play multiple frequencies simultaneously (for chords)
export const playChord = (frequencies, duration = 1, waveType = 'sine', gain = 0.2) => {
  const ctx = getAudioContext();
  const nodes = [];

  frequencies.forEach(freq => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.frequency.value = freq;
    osc.type = waveType;

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    gainNode.gain.setValueAtTime(gain, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);

    nodes.push({ osc, gainNode });
  });

  return nodes;
};

// Create oscillator with harmonic series
export const playHarmonicSeries = (fundamental, numHarmonics, duration = 2) => {
  const ctx = getAudioContext();
  const nodes = [];

  for (let n = 1; n <= numHarmonics; n++) {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.frequency.value = fundamental * n;
    osc.type = 'sine';

    // Natural amplitude decay: 1/n
    const amplitude = (1 / n) * 0.15;

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    gainNode.gain.setValueAtTime(amplitude, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);

    nodes.push({ osc, gainNode });
  }

  return nodes;
};

// Format frequency for display
export const formatFreq = (freq) => {
  return freq < 1000 ? `${freq.toFixed(2)} Hz` : `${(freq / 1000).toFixed(2)} kHz`;
};

// Format cents for display
export const formatCents = (cents) => {
  const sign = cents >= 0 ? '+' : '';
  return `${sign}${cents.toFixed(1)}¢`;
};
