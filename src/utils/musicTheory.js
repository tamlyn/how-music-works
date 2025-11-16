// Musical intervals in semitones
export const INTERVALS = {
  UNISON: 0,
  MINOR_SECOND: 1,
  MAJOR_SECOND: 2,
  MINOR_THIRD: 3,
  MAJOR_THIRD: 4,
  PERFECT_FOURTH: 5,
  TRITONE: 6,
  PERFECT_FIFTH: 7,
  MINOR_SIXTH: 8,
  MAJOR_SIXTH: 9,
  MINOR_SEVENTH: 10,
  MAJOR_SEVENTH: 11,
  OCTAVE: 12,
};

// Interval names
export const INTERVAL_NAMES = {
  0: 'Unison',
  1: 'Minor 2nd',
  2: 'Major 2nd',
  3: 'Minor 3rd',
  4: 'Major 3rd',
  5: 'Perfect 4th',
  6: 'Tritone',
  7: 'Perfect 5th',
  8: 'Minor 6th',
  9: 'Major 6th',
  10: 'Minor 7th',
  11: 'Major 7th',
  12: 'Octave',
};

// Just intonation ratios
export const JUST_RATIOS = {
  0: [1, 1],      // Unison
  1: [16, 15],    // Minor second
  2: [9, 8],      // Major second
  3: [6, 5],      // Minor third
  4: [5, 4],      // Major third
  5: [4, 3],      // Perfect fourth
  6: [45, 32],    // Tritone
  7: [3, 2],      // Perfect fifth
  8: [8, 5],      // Minor sixth
  9: [5, 3],      // Major sixth
  10: [16, 9],    // Minor seventh
  11: [15, 8],    // Major seventh
  12: [2, 1],     // Octave
};

// Scales (in semitones from root)
export const SCALES = {
  major: {
    name: 'Major (Ionian)',
    intervals: [0, 2, 4, 5, 7, 9, 11, 12],
  },
  'natural-minor': {
    name: 'Natural Minor (Aeolian)',
    intervals: [0, 2, 3, 5, 7, 8, 10, 12],
  },
  dorian: {
    name: 'Dorian',
    intervals: [0, 2, 3, 5, 7, 9, 10, 12],
  },
  phrygian: {
    name: 'Phrygian',
    intervals: [0, 1, 3, 5, 7, 8, 10, 12],
  },
  lydian: {
    name: 'Lydian',
    intervals: [0, 2, 4, 6, 7, 9, 11, 12],
  },
  mixolydian: {
    name: 'Mixolydian',
    intervals: [0, 2, 4, 5, 7, 9, 10, 12],
  },
  locrian: {
    name: 'Locrian',
    intervals: [0, 1, 3, 5, 6, 8, 10, 12],
  },
  'harmonic-minor': {
    name: 'Harmonic Minor',
    intervals: [0, 2, 3, 5, 7, 8, 11, 12],
  },
  'melodic-minor': {
    name: 'Melodic Minor',
    intervals: [0, 2, 3, 5, 7, 9, 11, 12],
  },
};

// Note names
export const NOTE_NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

// Get note name from MIDI number
export const midiToNoteName = (midi) => {
  const octave = Math.floor(midi / 12) - 1;
  const noteIndex = midi % 12;
  return `${NOTE_NAMES[noteIndex]}${octave}`;
};

// Get MIDI number from note name (e.g., "C4" -> 60)
export const noteNameToMidi = (noteName) => {
  const match = noteName.match(/^([A-G][#♯b♭]?)(-?\d+)$/);
  if (!match) return null;

  const [, note, octaveStr] = match;
  const octave = parseInt(octaveStr);

  const noteMap = {
    'C': 0, 'C#': 1, 'C♯': 1, 'Db': 1, 'D♭': 1,
    'D': 2, 'D#': 3, 'D♯': 3, 'Eb': 3, 'E♭': 3,
    'E': 4,
    'F': 5, 'F#': 6, 'F♯': 6, 'Gb': 6, 'G♭': 6,
    'G': 7, 'G#': 8, 'G♯': 8, 'Ab': 8, 'A♭': 8,
    'A': 9, 'A#': 10, 'A♯': 10, 'Bb': 10, 'B♭': 10,
    'B': 11,
  };

  const noteIndex = noteMap[note];
  if (noteIndex === undefined) return null;

  return (octave + 1) * 12 + noteIndex;
};

// Calculate equal divisions of octave (EDO)
export const calculateEDO = (divisions, step) => {
  return Math.pow(2, step / divisions);
};

// Microtonal tuning systems
export const MICROTONAL_SYSTEMS = {
  '12-tet': {
    name: '12-TET (Standard)',
    divisions: 12,
    stepCents: 100,
  },
  '19-tet': {
    name: '19-TET',
    divisions: 19,
    stepCents: 63.16,
  },
  '24-tet': {
    name: '24-TET (Quarter Tones)',
    divisions: 24,
    stepCents: 50,
  },
  '31-tet': {
    name: '31-TET',
    divisions: 31,
    stepCents: 38.71,
  },
  '53-tet': {
    name: '53-TET',
    divisions: 53,
    stepCents: 22.64,
  },
};
