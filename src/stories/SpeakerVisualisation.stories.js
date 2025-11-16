import SpeakerVisualisation from '../components/SpeakerVisualisation';

export default {
  title: 'Audio/SpeakerVisualisation',
  component: SpeakerVisualisation,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    frequency: 100,
    showParticles: true,
    showWaveform: true,
    showSpectrum: true,
    particleCount: 50,
    description: 'See how a speaker creates sound waves by moving air particles',
  },
};

export const LowFrequency = {
  args: {
    frequency: 50,
    showParticles: true,
    showWaveform: true,
    showSpectrum: true,
    particleCount: 50,
    description: 'Low frequency (50 Hz) - notice the longer wavelength in the particle motion',
  },
};

export const HighFrequency = {
  args: {
    frequency: 400,
    showParticles: true,
    showWaveform: true,
    showSpectrum: true,
    particleCount: 50,
    description: 'High frequency (400 Hz) - shorter wavelength, faster particle motion',
  },
};

export const ParticlesOnly = {
  args: {
    frequency: 100,
    showParticles: true,
    showWaveform: false,
    showSpectrum: false,
    particleCount: 50,
    description: 'Focus on particle motion and pressure waves',
  },
};

export const WaveformsOnly = {
  args: {
    frequency: 100,
    showParticles: false,
    showWaveform: true,
    showSpectrum: true,
    particleCount: 50,
    description: 'Compare waveform and spectrum representations',
  },
};

export const ManyParticles = {
  args: {
    frequency: 200,
    showParticles: true,
    showWaveform: true,
    showSpectrum: true,
    particleCount: 100,
    description: 'Denser particle visualisation for clearer wave patterns',
  },
};
