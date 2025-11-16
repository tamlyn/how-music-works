import React from 'react'

// Placeholder component wrapper
const Placeholder = ({ name, description, ...props }) => (
  <div className="interactive-component">
    {description && <p className="component-description">{description}</p>}
    <div className="placeholder">
      <h4>⚡ {name}</h4>
      <p>This interactive component will be implemented soon!</p>
      {Object.keys(props).length > 0 && (
        <details style={{ marginTop: '1rem', textAlign: 'left' }}>
          <summary style={{ cursor: 'pointer' }}>View Props</summary>
          <pre style={{ textAlign: 'left', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            {JSON.stringify(props, null, 2)}
          </pre>
        </details>
      )}
    </div>
  </div>
)

// All interactive components as placeholders
export const InteractiveWaveform = (props) => <Placeholder name="Interactive Waveform" {...props} />
export const HarmonicSeriesVisualizer = (props) => <Placeholder name="Harmonic Series Visualizer" {...props} />
export const TimbreComparison = (props) => <Placeholder name="Timbre Comparison" {...props} />
export const IntervalExplorer = (props) => <Placeholder name="Interval Explorer" {...props} />
export const TuningSystemComparison = (props) => <Placeholder name="Tuning System Comparison" {...props} />
export const TwelveTETCalculator = (props) => <Placeholder name="12-TET Calculator" {...props} />
export const ChordBuilder = (props) => <Placeholder name="Chord Builder" {...props} />
export const ScaleExplorer = (props) => <Placeholder name="Scale Explorer" {...props} />
export const MelodyAnalyzer = (props) => <Placeholder name="Melody Analyzer" {...props} />
export const MicrotonalExplorer = (props) => <Placeholder name="Microtonal Explorer" {...props} />
export const MusicLabPlayground = (props) => <Placeholder name="Music Lab Playground" {...props} />
