import React, { useState, useEffect, useRef } from 'react';
import { getAudioContext } from '../utils/audio';

const SpectrumAnalyser = ({
  frequency = 440,
  waveType = 'sine',
  showFrequencyLabels = true,
  maxFrequency = 5000,
  barCount = 128,
  description
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  const startAnalyser = () => {
    const ctx = getAudioContext();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const analyser = ctx.createAnalyser();

    oscillator.type = waveType;
    oscillator.frequency.value = frequency;
    gainNode.gain.value = 0.3;

    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.8;

    oscillator.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(ctx.destination);

    oscillator.start();

    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
    analyserRef.current = analyser;

    setIsPlaying(true);
    animateSpectrum(analyser);
  };

  const stopAnalyser = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
      gainNodeRef.current = null;
      analyserRef.current = null;
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    setIsPlaying(false);

    // Clear canvas
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAnalyser();
    } else {
      startAnalyser();
    }
  };

  const animateSpectrum = (analyser) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      // Clear canvas
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(0, 0, width, height);

      // Calculate bar width
      const effectiveBarCount = Math.min(barCount, bufferLength);
      const barWidth = width / effectiveBarCount;

      // Draw frequency bars
      for (let i = 0; i < effectiveBarCount; i++) {
        const barHeight = (dataArray[i] / 255) * height;
        const x = i * barWidth;
        const y = height - barHeight;

        // Color gradient based on frequency
        const hue = (i / effectiveBarCount) * 240; // Blue to red
        ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
        ctx.fillRect(x, y, barWidth - 1, barHeight);
      }

      // Draw frequency labels if enabled
      if (showFrequencyLabels) {
        ctx.fillStyle = '#333';
        ctx.font = '11px monospace';
        ctx.textAlign = 'center';

        const sampleRate = getAudioContext().sampleRate;
        const nyquist = sampleRate / 2;

        // Draw labels at key frequencies with better spacing
        const allFrequencies = [100, 200, 500, 1000, 2000, 5000, 10000];
        const labelFrequencies = allFrequencies.filter(f => f <= maxFrequency);

        // Only show labels that are far enough apart (at least 60px)
        const minSpacing = 60;
        const visibleLabels = [];
        let lastX = -minSpacing;

        labelFrequencies.forEach(freq => {
          const binIndex = Math.floor((freq / nyquist) * bufferLength);
          const normalizedIndex = (binIndex / bufferLength) * effectiveBarCount;
          const x = normalizedIndex * barWidth;

          if (x >= 0 && x <= width && (x - lastX) >= minSpacing) {
            visibleLabels.push({ freq, x });
            lastX = x;
          }
        });

        visibleLabels.forEach(({ freq, x }) => {
          const label = freq >= 1000 ? `${freq / 1000}kHz` : `${freq}Hz`;
          ctx.fillText(label, x, height - 5);

          // Draw tick mark
          ctx.strokeStyle = '#999';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, height - 20);
          ctx.lineTo(x, height);
          ctx.stroke();
        });
      }
    };

    draw();
  };

  // Update oscillator frequency when prop changes
  useEffect(() => {
    if (isPlaying && oscillatorRef.current) {
      oscillatorRef.current.frequency.value = frequency;
    }
  }, [frequency, isPlaying]);

  // Update oscillator wave type when prop changes
  useEffect(() => {
    if (isPlaying && oscillatorRef.current) {
      oscillatorRef.current.type = waveType;
    }
  }, [waveType, isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAnalyser();
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
          marginBottom: '1rem'
        }}>
          <div>
            <strong>Frequency:</strong> {frequency.toFixed(2)} Hz
            <br />
            <strong>Wave Type:</strong> {waveType}
          </div>
          <button
            onClick={togglePlay}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: isPlaying ? '#dc3545' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {isPlaying ? '⏸ Stop' : '▶ Start Analysis'}
          </button>
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={300}
          style={{
            width: '100%',
            height: 'auto',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
          }}
        />
      </div>

      <div style={{
        backgroundColor: '#fff3cd',
        padding: '1rem',
        borderRadius: '4px',
        fontSize: '0.9rem'
      }}>
        <strong>💡 What you're seeing:</strong> The spectrum analyser shows the frequency
        content of the sound. Each bar represents the amplitude at a specific frequency.
        Pure tones (like sine waves) show a single peak, while complex waveforms
        (square, sawtooth) show multiple peaks at harmonic frequencies.
      </div>
    </div>
  );
};

export default SpectrumAnalyser;
