import InteractiveWaveform from '../components/InteractiveWaveform';

export default {
  title: 'Audio/InteractiveWaveform',
  component: InteractiveWaveform,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    description: 'Adjust the frequency slider to hear different pitches and see how the waveform changes',
    minFreq: 100,
    maxFreq: 1000,
    showWaveform: true,
    playable: true,
  },
};

export const WideRange = {
  args: {
    description: 'Explore a wider frequency range from sub-bass to high treble',
    minFreq: 20,
    maxFreq: 5000,
    showWaveform: true,
    playable: true,
  },
};

export const NarrowRange = {
  args: {
    description: 'Fine-tune around middle A (440 Hz)',
    minFreq: 400,
    maxFreq: 480,
    showWaveform: true,
    playable: true,
  },
};

export const NoWaveform = {
  args: {
    description: 'Simple frequency player without waveform visualization',
    minFreq: 100,
    maxFreq: 1000,
    showWaveform: false,
    playable: true,
  },
};
