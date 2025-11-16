# Interactive Components Reference

This document outlines the React components needed for the interactive article.

## Component List

### 1. `<InteractiveWaveform />`

**Props:**
```typescript
interface InteractiveWaveformProps {
  description: string;
  minFreq: number;
  maxFreq: number;
  showWaveform: boolean;
  playable: boolean;
}
```

**Features:**
- Frequency slider control
- Real-time waveform rendering using Canvas API
- Play/pause button
- Frequency display (Hz)

**Implementation hints:**
- Use Web Audio API's `OscillatorNode`
- Canvas `requestAnimationFrame` for smooth waveform updates
- Consider using `AnalyserNode` for waveform data

---

### 2. `<HarmonicSeriesVisualizer />`

**Props:**
```typescript
interface HarmonicSeriesVisualizerProps {
  fundamental: number;
  numHarmonics: number;
  showFrequencies: boolean;
  showIntervals: boolean;
  interactive: boolean;
  description: string;
}
```

**Features:**
- Visual representation of harmonic stack
- Individual harmonic playback (click to play)
- Play all harmonics simultaneously
- Display frequency and musical interval for each

**Implementation hints:**
- Create multiple `OscillatorNode` instances
- Use `GainNode` to control relative amplitudes (1/n for harmonic n)
- Visual bars or stacked waveforms for display

---

### 3. `<TimbreComparison />`

**Props:**
```typescript
interface TimbreComparisonProps {
  instruments: string[];
  showSpectrum: boolean;
  description: string;
}
```

**Features:**
- Preset waveforms for different instrument approximations
- FFT spectrum analyzer display
- Dropdown or tabs to switch instruments
- Play button for each

**Implementation hints:**
```javascript
// Approximating instrument timbres
const instrumentWaveforms = {
  sine: { type: 'sine', harmonics: [1] },
  clarinet: {
    // Emphasize odd harmonics
    harmonics: [
      { n: 1, amp: 1.0 },
      { n: 3, amp: 0.75 },
      { n: 5, amp: 0.5 },
      { n: 7, amp: 0.14 },
      { n: 9, amp: 0.11 }
    ]
  },
  violin: {
    // Rich harmonic spectrum
    harmonics: [
      { n: 1, amp: 1.0 },
      { n: 2, amp: 0.7 },
      { n: 3, amp: 0.6 },
      { n: 4, amp: 0.5 },
      { n: 5, amp: 0.4 },
      { n: 6, amp: 0.3 }
    ]
  }
};
```

---

### 4. `<IntervalExplorer />`

**Props:**
```typescript
interface IntervalExplorerProps {
  baseFreq: number;
  showRatios: boolean;
  showInterference: boolean;
  playSimultaneous: boolean;
  description: string;
}
```

**Features:**
- Dropdown to select interval
- Display frequency ratio
- Play both notes together
- Waveform visualization showing interference pattern

**Implementation hints:**
- Create two oscillators
- Mix waveforms visually on canvas
- Calculate and display beats (frequency difference)

---

### 5. `<TuningSystemComparison />`

**Props:**
```typescript
interface TuningSystemComparisonProps {
  systems: string[];
  showCents: boolean;
  showBeating: boolean;
  description: string;
}
```

**Features:**
- Switch between tuning systems
- Play intervals/chords in different tunings
- Visual representation of cent deviations
- Key modulation demonstration

**Implementation hints:**
```javascript
// Tuning system calculations
const tuningSystems = {
  'just-intonation': {
    intervals: {
      0: 1/1,      // unison
      1: 16/15,    // minor second
      2: 9/8,      // major second
      3: 6/5,      // minor third
      4: 5/4,      // major third
      5: 4/3,      // perfect fourth
      6: 45/32,    // tritone
      7: 3/2,      // perfect fifth
      8: 8/5,      // minor sixth
      9: 5/3,      // major sixth
      10: 16/9,    // minor seventh
      11: 15/8,    // major seventh
      12: 2/1      // octave
    }
  },
  '12-tet': {
    intervals: Object.fromEntries(
      Array.from({length: 13}, (_, i) => [i, Math.pow(2, i/12)])
    )
  }
};

// Cents calculation
function ratioCents(ratio) {
  return 1200 * Math.log2(ratio);
}
```

---

### 6. `<TwelveTETCalculator />`

**Props:**
```typescript
interface TwelveTETCalculatorProps {
  showFormula: boolean;
  compareToJust: boolean;
  interactive: boolean;
  description: string;
}
```

**Features:**
- Input: number of semitones
- Output: frequency ratio
- Display formula: 2^(n/12)
- Compare to just intonation equivalent
- Show cent difference

---

### 7. `<ChordBuilder />`

**Props:**
```typescript
interface ChordBuilderProps {
  showFrequencies: boolean;
  showRatios: boolean;
  showWaveform: boolean;
  tuningSystem: string;
  description: string;
}
```

**Features:**
- Select root note
- Add intervals (3rd, 5th, 7th, etc.)
- Display resulting frequencies
- Play chord
- Waveform visualization of combined sound

**Implementation hints:**
- Multiple oscillators, one per note
- Use `GainNode` for balanced mixing
- Display chord formula (e.g., "Root + M3 + P5")

---

### 8. `<ScaleExplorer />`

**Props:**
```typescript
interface ScaleExplorerProps {
  scales: string[];
  showPiano: boolean;
  playable: boolean;
  description: string;
}
```

**Features:**
- Dropdown to select scale
- Visual piano keyboard
- Highlight scale notes
- Play scale up/down
- Click individual notes

**Implementation hints:**
```javascript
const scales = {
  'major': [0, 2, 4, 5, 7, 9, 11, 12],
  'natural-minor': [0, 2, 3, 5, 7, 8, 10, 12],
  'dorian': [0, 2, 3, 5, 7, 9, 10, 12],
  'phrygian': [0, 1, 3, 5, 7, 8, 10, 12],
  'lydian': [0, 2, 4, 6, 7, 9, 11, 12],
  'mixolydian': [0, 2, 4, 5, 7, 9, 10, 12],
  'harmonic-minor': [0, 2, 3, 5, 7, 8, 11, 12],
  'melodic-minor': [0, 2, 3, 5, 7, 9, 11, 12]
};
```

---

### 9. `<MelodyAnalyzer />`

**Props:**
```typescript
interface MelodyAnalyzerProps {
  showContour: boolean;
  showIntervals: boolean;
  examples: string[];
  description: string;
}
```

**Features:**
- Load example melodies
- Visual contour graph (pitch over time)
- Interval analysis
- Step vs. leap statistics
- Upload custom melody (MIDI or simple format)

**Data format:**
```javascript
const melody = [
  { note: 60, duration: 0.5 }, // Middle C, half second
  { note: 62, duration: 0.5 }, // D
  { note: 64, duration: 1.0 }, // E
  // ...
];
```

---

### 10. `<MicrotonalExplorer />`

**Props:**
```typescript
interface MicrotonalExplorerProps {
  systems: string[];
  showCents: boolean;
  showKeyboard: boolean;
  playable: boolean;
  description: string;
}
```

**Features:**
- Select EDO system (19, 24, 31, 53, etc.)
- Custom keyboard layout for non-12 divisions
- Play intervals and chords
- Display cent values
- Compare to 12-TET

**Implementation hints:**
```javascript
function calculateEDO(divisions, step) {
  return Math.pow(2, step / divisions);
}

// Example: 31-TET
const edo31 = Array.from({length: 32}, (_, i) =>
  calculateEDO(31, i)
);

// Bohlen-Pierce (tritave-based)
function calculateBP(step) {
  return Math.pow(3, step / 13); // 13 divisions of tritave
}
```

---

### 11. `<MusicLabPlayground />`

**Props:**
```typescript
interface MusicLabPlaygroundProps {
  enabledTools: string[];
  description: string;
}
```

**Features:**
- Tabbed interface with multiple tools
- Oscillator with waveform selection
- Harmonic series builder
- Chord builder
- Scale player
- Tuning system comparison
- Save/load presets (localStorage)

---

## Shared Utilities

### Audio Manager (`useAudio` hook)

```typescript
function useAudio() {
  const audioContextRef = useRef<AudioContext>();

  const playFrequency = (freq: number, duration?: number) => {
    const ctx = audioContextRef.current || new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    osc.start();

    if (duration) {
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.stop(ctx.currentTime + duration);
    }

    return osc;
  };

  return { playFrequency };
}
```

### Frequency Calculator

```typescript
// Convert MIDI note to frequency
function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Convert frequency to MIDI note
function freqToMidi(freq: number): number {
  return 69 + 12 * Math.log2(freq / 440);
}

// Calculate cents between two frequencies
function centsBetween(freq1: number, freq2: number): number {
  return 1200 * Math.log2(freq2 / freq1);
}
```

### Waveform Renderer

```typescript
function drawWaveform(
  canvas: HTMLCanvasElement,
  analyser: AnalyserNode
) {
  const ctx = canvas.getContext('2d');
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const draw = () => {
    requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);

    ctx.fillStyle = 'rgb(200, 200, 200)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.beginPath();

    const sliceWidth = canvas.width / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * canvas.height / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  };

  draw();
}
```

## Styling Recommendations

- Use consistent color scheme (suggest: blue for waveforms, green for frequencies, amber for active states)
- Responsive design: stack controls vertically on mobile
- Accessible controls: large touch targets (min 44x44px)
- Dark mode support
- Smooth animations for visual feedback

## Performance Considerations

- Limit number of simultaneous oscillators (max ~10-15)
- Use `requestAnimationFrame` for smooth canvas updates
- Debounce slider inputs to reduce re-renders
- Clean up audio nodes when components unmount
- Consider using OfflineAudioContext for pre-rendering complex sounds

## Accessibility

- All interactive controls must be keyboard accessible
- Provide text descriptions of audio content
- Use ARIA labels for custom controls
- Ensure sufficient color contrast
- Provide pause/stop for all auto-playing audio
