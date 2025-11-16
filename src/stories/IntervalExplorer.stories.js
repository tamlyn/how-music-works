import IntervalExplorer from '../components/IntervalExplorer';

export default {
  title: 'Audio/IntervalExplorer',
  component: IntervalExplorer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    baseFreq: 220,
    showRatios: true,
    showInterference: true,
    playSimultaneous: true,
    description: 'Play different intervals and see how their frequencies interact',
  },
};

export const HigherPitch = {
  args: {
    baseFreq: 440,
    showRatios: true,
    showInterference: true,
    playSimultaneous: true,
    description: 'Explore intervals starting from A440',
  },
};

export const LowerPitch = {
  args: {
    baseFreq: 110,
    showRatios: true,
    showInterference: true,
    playSimultaneous: true,
    description: 'Explore intervals starting from low A (110 Hz)',
  },
};

export const SimplifiedView = {
  args: {
    baseFreq: 220,
    showRatios: false,
    showInterference: false,
    playSimultaneous: true,
    description: 'Simple interval player without technical details',
  },
};
