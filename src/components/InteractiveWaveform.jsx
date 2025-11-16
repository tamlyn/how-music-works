import React, { useState, useEffect, useRef } from 'react';
import { getAudioContext, formatFreq } from '../utils/audio';

const InteractiveWaveform = ({
  description,
  minFreq = 100,
  maxFreq = 1000,
  showWaveform = true,
  playable = true
}) => {
  const [frequency, setFrequency] = useState((minFreq + maxFreq) / 2);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  // Draw static waveform on canvas (phase-locked)
  useEffect(() => {
    if (!showWaveform || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Generate static sine wave visualization (phase-locked at left edge)
    const drawWaveform = () => {
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#0066cc';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const cycles = 3; // Number of complete cycles to show
      const amplitude = height * 0.4;
      const centerY = height / 2;

      for (let x = 0; x < width; x++) {
        // Phase starts at 0 at the left edge (always zero crossing going up)
        const angle = (x / width) * cycles * 2 * Math.PI;
        const y = centerY - Math.sin(angle) * amplitude;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Draw center line
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Draw zero crossing marker at left edge
      ctx.fillStyle = '#0066cc';
      ctx.beginPath();
      ctx.arc(0, centerY, 4, 0, Math.PI * 2);
      ctx.fill();
    };

    drawWaveform();
  }, [frequency, showWaveform]);

  // Handle play/stop
  const togglePlay = () => {
    if (isPlaying) {
      stopSound();
    } else {
      playSound();
    }
  };

  const playSound = () => {
    const ctx = getAudioContext();

    // Create oscillator
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const analyser = ctx.createAnalyser();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;

    gainNode.gain.value = 0.3;

    oscillator.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(ctx.destination);

    oscillator.start();

    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
    analyserRef.current = analyser;
    setIsPlaying(true);
  };

  const stopSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
      gainNodeRef.current = null;
      analyserRef.current = null;
    }

    setIsPlaying(false);
  };

  // Update frequency while playing
  useEffect(() => {
    if (isPlaying && oscillatorRef.current) {
      oscillatorRef.current.frequency.value = frequency;
    }
  }, [frequency, isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  return (
    <div className="interactive-component">
      {description && <p className="component-description">{description}</p>}

      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem'
        }}>
          <label htmlFor="freq-slider" style={{ fontWeight: 600 }}>
            Frequency: {formatFreq(frequency)}
          </label>
          {playable && (
            <button
              onClick={togglePlay}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: isPlaying ? '#dc3545' : '#0066cc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              {isPlaying ? '⏸ Stop' : '▶ Play'}
            </button>
          )}
        </div>

        <input
          id="freq-slider"
          type="range"
          min={minFreq}
          max={maxFreq}
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
          style={{ width: '100%' }}
        />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.85rem',
          color: '#666',
          marginTop: '0.25rem'
        }}>
          <span>{formatFreq(minFreq)}</span>
          <span>{formatFreq(maxFreq)}</span>
        </div>
      </div>

      {showWaveform && (
        <canvas
          ref={canvasRef}
          width={800}
          height={200}
          style={{
            width: '100%',
            height: 'auto',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
          }}
        />
      )}
    </div>
  );
};

export default InteractiveWaveform;
