# How Music Works - Interactive Article

An interactive educational article explaining the science of music, from basic acoustics to advanced topics like microtonal music.

## Overview

This project presents a comprehensive exploration of music from a scientific perspective, covering:

- **Sound Physics**: Frequencies, waveforms, and the nature of sound
- **Harmonic Series**: Overtones and why instruments sound different
- **Intervals**: Mathematical ratios and consonance
- **Tuning Systems**: Just intonation vs. 12-tone equal temperament
- **Chords and Scales**: Building blocks of harmony and melody
- **Microtonal Music**: Beyond the 12-note octave

## Interactive Components

The article includes several interactive visualizations (to be implemented as React components):

### 1. InteractiveWaveform
Allows users to:
- Adjust frequency slider (100-1000 Hz)
- See waveform visualization in real-time
- Play the tone to hear the frequency

### 2. HarmonicSeriesVisualizer
Features:
- Display up to 16 harmonics stacked vertically
- Show frequencies and musical intervals for each harmonic
- Click individual harmonics to hear them
- Play all harmonics together to demonstrate timbre

### 3. TimbreComparison
Compares different instrument timbres:
- Preset waveforms: sine, clarinet, violin, trumpet, piano
- Spectrum analyzer showing harmonic content
- Play each sound to hear the difference

### 4. IntervalExplorer
Explores musical intervals:
- Play two notes simultaneously
- Show frequency ratios (3:2, 5:4, etc.)
- Visualize wave interference patterns
- Demonstrate consonance vs. dissonance

### 5. TuningSystemComparison
Compares tuning systems:
- Just intonation
- Pythagorean tuning
- 12-tone equal temperament
- Show cent deviations
- Play chords in different keys to hear differences

### 6. TwelveTETCalculator
Interactive calculator:
- Calculate any interval using 2^(n/12)
- Compare to just intonation ratios
- Show cent differences
- Formula visualization

### 7. ChordBuilder
Build and analyze chords:
- Stack intervals to create chords
- Display frequencies and ratios
- Waveform visualization of the combined sound
- Toggle between 12-TET and just intonation

### 8. ScaleExplorer
Explore different scales:
- Major, minor, modes (Dorian, Phrygian, etc.)
- Piano keyboard visualization
- Play scales ascending/descending
- Highlight scale degrees and intervals

### 9. MelodyAnalyzer
Analyze melodic structure:
- Show melodic contour (rising/falling graph)
- Analyze intervals between notes
- Famous melody examples (Twinkle Twinkle, Beethoven's 5th, etc.)
- Upload custom melodies

### 10. MicrotonalExplorer
Explore alternative tuning systems:
- 19-TET, 24-TET, 31-TET, 53-TET
- Bohlen-Pierce scale
- Custom microtonal keyboard
- Play intervals and chords in different systems
- Show cent values for each step

### 11. MusicLabPlayground
Comprehensive sandbox combining all tools:
- Oscillator for generating tones
- Harmonic series builder
- Chord builder
- Scale player
- Tuning system comparison

## Setup and Development

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:5173`

## Technologies

- **Framework**: Vite + React
- **Content**: MDX for the article
- **Audio**: Web Audio API for sound generation
- **Visualization**: Canvas API for waveforms and spectra
- **UI**: React components with interactive controls

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### GitHub Pages Setup

1. Go to your repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The workflow will automatically build and deploy on push to main

The site will be available at: `https://[username].github.io/how-music-works/`

### Audio Generation Approach
```javascript
// Example: Generating a tone at frequency f
const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
oscillator.frequency.value = frequency; // Hz
oscillator.type = 'sine'; // or 'square', 'sawtooth', 'triangle'
oscillator.connect(audioContext.destination);
oscillator.start();
```

### Harmonic Series Generation
```javascript
// Generate harmonic series
function createHarmonicSeries(fundamental, numHarmonics) {
  const harmonics = [];
  for (let n = 1; n <= numHarmonics; n++) {
    harmonics.push({
      number: n,
      frequency: fundamental * n,
      amplitude: 1 / n // Natural decay
    });
  }
  return harmonics;
}
```

### Tuning System Calculations
```javascript
// 12-TET interval calculator
function calculate12TET(semitones) {
  return Math.pow(2, semitones / 12);
}

// Just intonation ratios
const justIntervals = {
  'unison': 1/1,
  'minor-second': 16/15,
  'major-second': 9/8,
  'minor-third': 6/5,
  'major-third': 5/4,
  'perfect-fourth': 4/3,
  'tritone': 45/32,
  'perfect-fifth': 3/2,
  'minor-sixth': 8/5,
  'major-sixth': 5/3,
  'minor-seventh': 16/9,
  'major-seventh': 15/8,
  'octave': 2/1
};
```

## Content Structure

The article follows a pedagogical progression:

1. **Foundation** (Sections 1-2): Basic physics and acoustics
2. **Building Blocks** (Sections 3-4): Intervals and tuning challenges
3. **Practical Systems** (Sections 5-6): 12-TET and chord construction
4. **Musical Application** (Sections 7-8): Scales and melody
5. **Advanced Topics** (Section 9): Microtonal music
6. **Synthesis** (Section 10): Connecting physics to emotion

## Target Audience

The article is written for:
- Music enthusiasts curious about the science behind sound
- Musicians wanting to understand theory more deeply
- Students of physics or mathematics interested in music
- Anyone with high school level science/math background

## Accessibility

Interactive components should include:
- Keyboard navigation support
- Screen reader compatibility
- Visual alternatives for audio content
- Adjustable playback controls with volume

## Future Enhancements

Possible additions:
- MIDI keyboard input support
- Audio file upload and analysis
- Export generated sounds/scales
- Save/share custom tuning systems
- Mobile-optimized touch interfaces
- Integration with music notation display

## License

TBD

## Contributing

TBD
