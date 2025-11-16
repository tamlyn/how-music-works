import React, { useState, useEffect, useRef } from 'react';
import { getAudioContext } from '../utils/audio';

const SpeakerVisualisation = ({
  frequency = 100,
  showParticles = true,
  showWaveform = true,
  showSpectrum = true,
  particleCount = 50,
  description
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const speakerCanvasRef = useRef(null);
  const waveformCanvasRef = useRef(null);
  const spectrumCanvasRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  // Initialize particles
  useEffect(() => {
    if (showParticles && speakerCanvasRef.current) {
      const canvas = speakerCanvasRef.current;
      const width = canvas.width;

      // Create particles in front of speaker
      particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
        x: 150 + (i / particleCount) * (width - 200),
        y: canvas.height / 2 + (Math.random() - 0.5) * 100,
        baseY: canvas.height / 2 + (Math.random() - 0.5) * 100,
        phase: Math.random() * Math.PI * 2,
      }));
    }
  }, [showParticles, particleCount]);

  const startSound = () => {
    const ctx = getAudioContext();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const analyser = ctx.createAnalyser();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gainNode.gain.value = 0.2;

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
    animate(analyser);
  };

  const stopSound = () => {
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
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound();
    }
  };

  const animate = (analyser) => {
    const timeDataArray = new Uint8Array(analyser.fftSize);
    const freqDataArray = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(timeDataArray);
      analyser.getByteFrequencyData(freqDataArray);

      // Calculate average amplitude for speaker movement
      const average = timeDataArray.reduce((a, b) => a + b, 0) / timeDataArray.length;
      const normalizedAmplitude = (average - 128) / 128;

      // Draw speaker with particles
      if (showParticles) {
        drawSpeaker(normalizedAmplitude);
      }

      // Draw waveform
      if (showWaveform) {
        drawWaveform(timeDataArray);
      }

      // Draw spectrum
      if (showSpectrum) {
        drawSpectrum(freqDataArray);
      }
    };

    draw();
  };

  const drawSpeaker = (amplitude) => {
    if (!speakerCanvasRef.current) return;

    const canvas = speakerCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

    // Clear canvas
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, width, height);

    // Draw speaker cone
    const speakerX = 50;
    const speakerWidth = 80;
    const movement = amplitude * 15;

    // Speaker body
    ctx.fillStyle = '#333';
    ctx.fillRect(speakerX - speakerWidth / 2, centerY - 60, speakerWidth, 120);

    // Speaker cone (moving)
    ctx.fillStyle = '#666';
    ctx.beginPath();
    ctx.moveTo(speakerX + speakerWidth / 2 + movement, centerY - 50);
    ctx.lineTo(speakerX + speakerWidth / 2 + 30 + movement, centerY);
    ctx.lineTo(speakerX + speakerWidth / 2 + movement, centerY + 50);
    ctx.closePath();
    ctx.fill();

    // Draw air particles
    const time = Date.now() / 1000;
    particlesRef.current.forEach((particle, i) => {
      // Wave motion moving away from speaker
      const distanceFromSpeaker = particle.x - (speakerX + speakerWidth);
      const waveOffset = Math.sin(time * frequency / 50 - distanceFromSpeaker / 20) * 15;

      particle.y = particle.baseY + waveOffset * (isPlaying ? 1 : 0);

      ctx.fillStyle = `rgba(66, 133, 244, ${0.3 + Math.abs(waveOffset) / 30})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw pressure wave lines
    ctx.strokeStyle = 'rgba(66, 133, 244, 0.2)';
    ctx.lineWidth = 2;
    const wavelength = 400 / (frequency / 100);

    for (let i = 0; i < 5; i++) {
      const x = (speakerX + speakerWidth) + (time * 100 % wavelength) + i * wavelength;
      if (x < width) {
        ctx.beginPath();
        ctx.moveTo(x, centerY - 80);
        ctx.lineTo(x, centerY + 80);
        ctx.stroke();
      }
    }

    // Labels
    ctx.fillStyle = '#333';
    ctx.font = '14px sans-serif';
    ctx.fillText('Speaker', speakerX - 20, centerY + 80);
    ctx.fillText('Air particles', 200, 30);
    ctx.fillText('→ Pressure waves →', width - 200, 30);
  };

  const drawWaveform = (dataArray) => {
    if (!waveformCanvasRef.current) return;

    const canvas = waveformCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#0066cc';
    ctx.beginPath();

    const sliceWidth = width / dataArray.length;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * height) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Center line
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Label
    ctx.fillStyle = '#333';
    ctx.font = '12px sans-serif';
    ctx.fillText('Waveform (time domain)', 10, 20);
  };

  const drawSpectrum = (dataArray) => {
    if (!spectrumCanvasRef.current) return;

    const canvas = spectrumCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, width, height);

    const barWidth = width / dataArray.length;

    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = (dataArray[i] / 255) * height;
      const x = i * barWidth;
      const y = height - barHeight;

      const hue = (i / dataArray.length) * 240;
      ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
      ctx.fillRect(x, y, barWidth - 1, barHeight);
    }

    // Label
    ctx.fillStyle = '#333';
    ctx.font = '12px sans-serif';
    ctx.fillText('Spectrum (frequency domain)', 10, 20);
  };

  // Update frequency when prop changes
  useEffect(() => {
    if (isPlaying && oscillatorRef.current) {
      oscillatorRef.current.frequency.value = frequency;
    }
  }, [frequency, isPlaying]);

  // Cleanup
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
          marginBottom: '1rem'
        }}>
          <div>
            <strong>Frequency:</strong> {frequency.toFixed(1)} Hz
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
            {isPlaying ? '⏸ Stop' : '▶ Start'}
          </button>
        </div>

        {/* Speaker visualization */}
        <canvas
          ref={speakerCanvasRef}
          width={800}
          height={200}
          style={{
            width: '100%',
            height: 'auto',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            marginBottom: '1rem',
            display: showParticles ? 'block' : 'none',
          }}
        />

        {/* Waveform */}
        {showWaveform && (
          <canvas
            ref={waveformCanvasRef}
            width={800}
            height={150}
            style={{
              width: '100%',
              height: 'auto',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              marginBottom: '1rem',
            }}
          />
        )}

        {/* Spectrum */}
        {showSpectrum && (
          <canvas
            ref={spectrumCanvasRef}
            width={800}
            height={150}
            style={{
              width: '100%',
              height: 'auto',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
            }}
          />
        )}
      </div>

      <div style={{
        backgroundColor: '#e3f2fd',
        padding: '1rem',
        borderRadius: '4px',
        fontSize: '0.9rem'
      }}>
        <strong>💡 How it works:</strong> The speaker cone vibrates back and forth,
        pushing air particles. These pressure variations travel as waves through the air.
        We can visualise this same phenomenon in different ways: as particle motion,
        as a waveform (amplitude over time), or as a spectrum (frequency content).
      </div>
    </div>
  );
};

export default SpeakerVisualisation;
