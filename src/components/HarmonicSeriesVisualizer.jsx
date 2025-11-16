import React, { useState } from 'react';
import { playFrequency, playHarmonicSeries, formatFreq } from '../utils/audio';
import { INTERVAL_NAMES } from '../utils/musicTheory';

const HarmonicSeriesVisualizer = ({
  fundamental = 100,
  numHarmonics = 16,
  showFrequencies = true,
  showIntervals = true,
  interactive = true,
  description
}) => {
  const [playingHarmonic, setPlayingHarmonic] = useState(null);
  const [playingAll, setPlayingAll] = useState(false);

  // Generate harmonic data
  const harmonics = Array.from({ length: numHarmonics }, (_, i) => {
    const n = i + 1;
    const freq = fundamental * n;

    // Calculate interval from fundamental (in semitones)
    const semitones = Math.round(12 * Math.log2(n));
    const intervalName = INTERVAL_NAMES[semitones % 12] || 'Complex';
    const octaves = Math.floor(semitones / 12);
    const fullIntervalName = octaves > 0
      ? `${octaves} Oct + ${intervalName}`
      : intervalName;

    return {
      number: n,
      frequency: freq,
      interval: fullIntervalName,
      amplitude: 1 / n, // Natural amplitude decay
    };
  });

  const playHarmonic = (harmonic) => {
    if (playingHarmonic === harmonic.number) {
      setPlayingHarmonic(null);
      return;
    }

    setPlayingHarmonic(harmonic.number);
    playFrequency(harmonic.frequency, 1.5);

    setTimeout(() => {
      setPlayingHarmonic(null);
    }, 1500);
  };

  const playAll = () => {
    if (playingAll) return;

    setPlayingAll(true);
    playHarmonicSeries(fundamental, numHarmonics, 2.5);

    setTimeout(() => {
      setPlayingAll(false);
    }, 2500);
  };

  return (
    <div className="interactive-component">
      {description && <p className="component-description">{description}</p>}

      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>Fundamental:</strong> {formatFreq(fundamental)}
          </div>
          <button
            onClick={playAll}
            disabled={playingAll}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: playingAll ? '#6c757d' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: playingAll ? 'not-allowed' : 'pointer',
              fontWeight: 600,
            }}
          >
            {playingAll ? '⏸ Playing All...' : '▶ Play All Harmonics'}
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gap: '0.5rem',
        marginTop: '1rem'
      }}>
        {harmonics.map((harmonic) => {
          const isPlaying = playingHarmonic === harmonic.number || playingAll;
          const maxAmplitude = harmonics[0].amplitude;
          const widthPercent = (harmonic.amplitude / maxAmplitude) * 100;

          return (
            <div
              key={harmonic.number}
              onClick={interactive ? () => playHarmonic(harmonic) : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem',
                backgroundColor: isPlaying ? '#e3f2fd' : '#f5f5f5',
                border: isPlaying ? '2px solid #0066cc' : '1px solid #e0e0e0',
                borderRadius: '4px',
                cursor: interactive ? 'pointer' : 'default',
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                minWidth: '2rem',
                fontWeight: 600,
                color: '#666'
              }}>
                {harmonic.number}
              </div>

              <div style={{
                flex: 1,
                height: '24px',
                backgroundColor: '#e0e0e0',
                borderRadius: '2px',
                overflow: 'hidden',
                marginRight: '1rem'
              }}>
                <div style={{
                  width: `${widthPercent}%`,
                  height: '100%',
                  backgroundColor: isPlaying ? '#0066cc' : '#4a90e2',
                  transition: 'all 0.3s'
                }} />
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                fontSize: '0.9rem',
                minWidth: '200px'
              }}>
                {showFrequencies && (
                  <span style={{ fontFamily: 'monospace', color: '#333' }}>
                    {formatFreq(harmonic.frequency)}
                  </span>
                )}
                {showIntervals && (
                  <span style={{ color: '#666', fontStyle: 'italic' }}>
                    {harmonic.interval}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {interactive && (
        <p style={{
          marginTop: '1rem',
          fontSize: '0.85rem',
          color: '#666',
          fontStyle: 'italic'
        }}>
          Click on any harmonic to hear it individually
        </p>
      )}
    </div>
  );
};

export default HarmonicSeriesVisualizer;
