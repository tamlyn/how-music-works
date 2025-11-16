import React, { useState } from 'react';
import { playFrequency, playChord, formatFreq, semitonesToRatio } from '../utils/audio';
import { INTERVAL_NAMES, JUST_RATIOS } from '../utils/musicTheory';

const IntervalExplorer = ({
  baseFreq = 220,
  showRatios = true,
  showInterference = true,
  playSimultaneous = true,
  description
}) => {
  const [selectedInterval, setSelectedInterval] = useState(7); // Perfect fifth by default
  const [isPlaying, setIsPlaying] = useState(false);
  const [playMode, setPlayMode] = useState('simultaneous'); // 'sequential' or 'simultaneous'

  const intervals = Object.keys(INTERVAL_NAMES).map(Number);

  const secondFreq = baseFreq * semitonesToRatio(selectedInterval);
  const justRatio = JUST_RATIOS[selectedInterval];
  const justFreq = baseFreq * (justRatio[0] / justRatio[1]);
  const tetRatio = semitonesToRatio(selectedInterval);

  const playInterval = () => {
    if (isPlaying) return;

    setIsPlaying(true);

    if (playMode === 'simultaneous') {
      playChord([baseFreq, secondFreq], 2);
      setTimeout(() => setIsPlaying(false), 2000);
    } else {
      playFrequency(baseFreq, 1);
      setTimeout(() => {
        playFrequency(secondFreq, 1);
      }, 1000);
      setTimeout(() => setIsPlaying(false), 2000);
    }
  };

  return (
    <div className="interactive-component">
      {description && <p className="component-description">{description}</p>}

      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="interval-select" style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
          Select Interval:
        </label>
        <select
          id="interval-select"
          value={selectedInterval}
          onChange={(e) => setSelectedInterval(Number(e.target.value))}
          style={{
            width: '100%',
            padding: '0.5rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        >
          {intervals.map((interval) => (
            <option key={interval} value={interval}>
              {INTERVAL_NAMES[interval]}
            </option>
          ))}
        </select>
      </div>

      {showRatios && (
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Base Note:</div>
              <div style={{ fontFamily: 'monospace', color: '#0066cc' }}>{formatFreq(baseFreq)}</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Interval Note:</div>
              <div style={{ fontFamily: 'monospace', color: '#0066cc' }}>{formatFreq(secondFreq)}</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Just Intonation:</div>
              <div style={{ fontFamily: 'monospace', color: '#666' }}>
                {justRatio[0]}:{justRatio[1]} = {(justRatio[0] / justRatio[1]).toFixed(4)}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>
                ({formatFreq(justFreq)})
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>12-TET:</div>
              <div style={{ fontFamily: 'monospace', color: '#666' }}>
                2^({selectedInterval}/12) = {tetRatio.toFixed(4)}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>
                ({formatFreq(secondFreq)})
              </div>
            </div>
          </div>

          {selectedInterval > 0 && (
            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #e0e0e0' }}>
              <strong>Difference:</strong>{' '}
              <span style={{ color: Math.abs(justFreq - secondFreq) < 1 ? '#28a745' : '#dc3545' }}>
                {Math.abs(justFreq - secondFreq).toFixed(2)} Hz
                ({(1200 * Math.log2(secondFreq / justFreq)).toFixed(1)} cents)
              </span>
            </div>
          )}
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Play Mode:</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setPlayMode('simultaneous')}
            style={{
              flex: 1,
              padding: '0.5rem',
              backgroundColor: playMode === 'simultaneous' ? '#0066cc' : '#f5f5f5',
              color: playMode === 'simultaneous' ? 'white' : '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Simultaneous
          </button>
          <button
            onClick={() => setPlayMode('sequential')}
            style={{
              flex: 1,
              padding: '0.5rem',
              backgroundColor: playMode === 'sequential' ? '#0066cc' : '#f5f5f5',
              color: playMode === 'sequential' ? 'white' : '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Sequential
          </button>
        </div>
      </div>

      <button
        onClick={playInterval}
        disabled={isPlaying}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: isPlaying ? '#6c757d' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isPlaying ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          fontSize: '1rem',
        }}
      >
        {isPlaying ? '⏸ Playing...' : '▶ Play Interval'}
      </button>

      {showInterference && selectedInterval > 0 && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#fff3cd',
          borderRadius: '4px',
          fontSize: '0.9rem'
        }}>
          <strong>💡 Listen for:</strong> When playing simultaneously, simple ratios like the perfect fifth
          (3:2) create stable, consonant sounds with minimal beating. Complex ratios create more beating
          and dissonance.
        </div>
      )}
    </div>
  );
};

export default IntervalExplorer;
