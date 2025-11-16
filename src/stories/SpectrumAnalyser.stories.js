import SpectrumAnalyser from '../components/SpectrumAnalyser';

export default {
  title: 'Audio/SpectrumAnalyser',
  component: SpectrumAnalyser,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    waveType: {
      control: 'select',
      options: ['sine', 'square', 'sawtooth', 'triangle'],
    },
  },
};

export const SineWave = {
  args: {
    frequency: 440,
    waveType: 'sine',
    showFrequencyLabels: true,
    maxFrequency: 5000,
    barCount: 128,
    description: 'A pure sine wave shows a single peak at the fundamental frequency',
  },
};

export const SquareWave = {
  args: {
    frequency: 440,
    waveType: 'square',
    showFrequencyLabels: true,
    maxFrequency: 5000,
    barCount: 128,
    description: 'Square waves contain odd harmonics (1st, 3rd, 5th, etc.)',
  },
};

export const SawtoothWave = {
  args: {
    frequency: 440,
    waveType: 'sawtooth',
    showFrequencyLabels: true,
    maxFrequency: 5000,
    barCount: 128,
    description: 'Sawtooth waves contain all harmonics with decreasing amplitude',
  },
};

export const TriangleWave = {
  args: {
    frequency: 440,
    waveType: 'triangle',
    showFrequencyLabels: true,
    maxFrequency: 5000,
    barCount: 128,
    description: 'Triangle waves contain odd harmonics with faster amplitude decay than square waves',
  },
};

export const LowFrequency = {
  args: {
    frequency: 110,
    waveType: 'sawtooth',
    showFrequencyLabels: true,
    maxFrequency: 5000,
    barCount: 128,
    description: 'Low frequency shows more visible harmonics in the spectrum',
  },
};

export const HighDetail = {
  args: {
    frequency: 440,
    waveType: 'square',
    showFrequencyLabels: true,
    maxFrequency: 10000,
    barCount: 256,
    description: 'Higher bar count for more detailed frequency analysis',
  },
};
