import React, { useState } from 'react';
import { midiToFreq, playFrequency } from '../utils/audio';
import { SCALES, NOTE_NAMES } from '../utils/musicTheory';

const ScaleExplorer = ({
  scales = ['major', 'natural-minor', 'dorian', 'phrygian', 'lydian', 'mixolydian'],
  showPiano = true,
  playable = true,
  description
}) => {
  const [selectedScale, setSelectedScale] = useState('major');
  const [rootNote, setRootNote] = useState(60); // C4
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingNote, setPlayingNote] = useState(null);

  const scale = SCALES[selectedScale];
  const scaleNotes = scale.intervals.map(interval => rootNote + interval);

  const playScale = async () => {
    if (isPlaying) return;

    setIsPlaying(true);

    for (let i = 0; i < scaleNotes.length; i++) {
      const note = scaleNotes[i];
      setPlayingNote(note);
      const freq = midiToFreq(note);
      playFrequency(freq, 0.5);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setPlayingNote(null);
    setIsPlaying(false);
  };

  const playNote = (midi) => {
    if (isPlaying) return;
    setPlayingNote(midi);
    const freq = midiToFreq(midi);
    playFrequency(freq, 0.8);
    setTimeout(() => setPlayingNote(null), 800);
  };

  // Generate piano keys (2 octaves)
  const generatePianoKeys = () => {
    const startMidi = Math.floor(rootNote / 12) * 12;
    const keys = [];

    for (let i = 0; i < 24; i++) {
      const midi = startMidi + i;
      const noteIndex = midi % 12;
      const noteName = NOTE_NAMES[noteIndex];
      const isBlackKey = noteName.includes('♯');
      const isInScale = scaleNotes.includes(midi);
      const isRoot = midi % 12 === rootNote % 12;

      keys.push({
        midi,
        noteName,
        isBlackKey,
        isInScale,
        isRoot,
        isPlaying: playingNote === midi,
      });
    }

    return keys;
  };

  const pianoKeys = generatePianoKeys();

  return (
    <div className="interactive-component">
      {description && <p className="component-description">{description}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label htmlFor="scale-select" style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
            Scale:
          </label>
          <select
            id="scale-select"
            value={selectedScale}
            onChange={(e) => setSelectedScale(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              fontSize: '1rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            {scales.map((scaleKey) => (
              <option key={scaleKey} value={scaleKey}>
                {SCALES[scaleKey].name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="root-select" style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
            Root Note:
          </label>
          <select
            id="root-select"
            value={rootNote}
            onChange={(e) => setRootNote(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '0.5rem',
              fontSize: '1rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            {NOTE_NAMES.map((note, i) => (
              <option key={i} value={60 + i}>
                {note}4
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '1rem',
        borderRadius: '4px',
        marginBottom: '1rem',
        fontSize: '0.9rem'
      }}>
        <strong>Scale degrees:</strong>{' '}
        <span style={{ fontFamily: 'monospace' }}>
          {scale.intervals.join(' - ')}
        </span>
        {' '}(semitones from root)
      </div>

      {showPiano && (
        <div style={{ marginBottom: '1rem', overflowX: 'auto' }}>
          <div style={{
            display: 'flex',
            height: '150px',
            position: 'relative',
            minWidth: '600px',
          }}>
            {/* White keys */}
            {pianoKeys.filter(k => !k.isBlackKey).map((key) => (
              <div
                key={key.midi}
                onClick={() => playable && playNote(key.midi)}
                style={{
                  flex: 1,
                  border: '1px solid #333',
                  borderRadius: '0 0 4px 4px',
                  cursor: playable ? 'pointer' : 'default',
                  position: 'relative',
                  backgroundColor: key.isPlaying
                    ? '#0066cc'
                    : key.isRoot
                    ? '#ffc107'
                    : key.isInScale
                    ? '#e3f2fd'
                    : 'white',
                  transition: 'background-color 0.1s',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: key.isRoot ? 'bold' : 'normal',
                }}
              >
                <span style={{ color: key.isPlaying ? 'white' : key.isInScale ? '#333' : '#999' }}>
                  {key.noteName}
                </span>
              </div>
            ))}

            {/* Black keys */}
            {pianoKeys.filter(k => k.isBlackKey).map((key, idx) => {
              const whiteKeysBefore = pianoKeys.filter(
                k => !k.isBlackKey && k.midi < key.midi
              ).length;
              const leftPercent = ((whiteKeysBefore + 0.7) / pianoKeys.filter(k => !k.isBlackKey).length) * 100;

              return (
                <div
                  key={key.midi}
                  onClick={() => playable && playNote(key.midi)}
                  style={{
                    position: 'absolute',
                    left: `${leftPercent}%`,
                    width: '40px',
                    height: '100px',
                    backgroundColor: key.isPlaying
                      ? '#0066cc'
                      : key.isRoot
                      ? '#ff9800'
                      : key.isInScale
                      ? '#64b5f6'
                      : '#333',
                    border: '1px solid #000',
                    borderRadius: '0 0 4px 4px',
                    cursor: playable ? 'pointer' : 'default',
                    zIndex: 1,
                    transition: 'background-color 0.1s',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    paddingBottom: '0.5rem',
                    fontSize: '0.65rem',
                    fontWeight: key.isRoot ? 'bold' : 'normal',
                    color: key.isPlaying || key.isInScale ? 'white' : '#666',
                  }}
                >
                  {key.isInScale && <span>{key.noteName}</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {playable && (
        <button
          onClick={playScale}
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
          {isPlaying ? '⏸ Playing Scale...' : '▶ Play Scale Ascending'}
        </button>
      )}

      <div style={{
        marginTop: '1rem',
        fontSize: '0.85rem',
        color: '#666'
      }}>
        <div><strong>Legend:</strong></div>
        <div>🟡 Yellow = Root note</div>
        <div>🔵 Blue = Notes in scale</div>
        {playable && <div style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>Click keys to play individual notes</div>}
      </div>
    </div>
  );
};

export default ScaleExplorer;
