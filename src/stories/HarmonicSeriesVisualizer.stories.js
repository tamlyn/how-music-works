import HarmonicSeriesVisualizer from '../components/HarmonicSeriesVisualizer';

export default {
  title: 'Audio/HarmonicSeriesVisualizer',
  component: HarmonicSeriesVisualizer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    fundamental: 100,
    numHarmonics: 16,
    showFrequencies: true,
    showIntervals: true,
    interactive: true,
    description: 'Click on individual harmonics to hear them, or play them all together',
  },
};

export const MiddleC = {
  args: {
    fundamental: 261.63,
    numHarmonics: 12,
    showFrequencies: true,
    showIntervals: true,
    interactive: true,
    description: 'Harmonic series starting from middle C (261.63 Hz)',
  },
};

export const A440 = {
  args: {
    fundamental: 440,
    numHarmonics: 8,
    showFrequencies: true,
    showIntervals: true,
    interactive: true,
    description: 'Harmonic series starting from A440 (concert pitch)',
  },
};

export const ExtendedSeries = {
  args: {
    fundamental: 55,
    numHarmonics: 32,
    showFrequencies: true,
    showIntervals: true,
    interactive: true,
    description: 'Extended harmonic series with 32 harmonics from low A (55 Hz)',
  },
};

export const SimplifiedView = {
  args: {
    fundamental: 200,
    numHarmonics: 8,
    showFrequencies: false,
    showIntervals: true,
    interactive: true,
    description: 'Simplified view showing only intervals',
  },
};
