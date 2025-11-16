import ScaleExplorer from '../components/ScaleExplorer';

export default {
  title: 'Audio/ScaleExplorer',
  component: ScaleExplorer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    scales: ['major', 'natural-minor', 'dorian', 'phrygian', 'lydian', 'mixolydian'],
    showPiano: true,
    playable: true,
    description: 'Explore different scales and modes with an interactive piano keyboard',
  },
};

export const AllScales = {
  args: {
    scales: ['major', 'natural-minor', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'locrian', 'harmonic-minor', 'melodic-minor'],
    showPiano: true,
    playable: true,
    description: 'Full collection of scales including harmonic and melodic minor',
  },
};

export const ModesOnly = {
  args: {
    scales: ['dorian', 'phrygian', 'lydian', 'mixolydian', 'locrian'],
    showPiano: true,
    playable: true,
    description: 'Explore the church modes',
  },
};

export const NoPiano = {
  args: {
    scales: ['major', 'natural-minor', 'harmonic-minor', 'melodic-minor'],
    showPiano: false,
    playable: true,
    description: 'Scale player without keyboard visualization',
  },
};
