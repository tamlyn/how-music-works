import React from 'react'

// Import implemented components
import InteractiveWaveformComponent from './InteractiveWaveform'
import HarmonicSeriesVisualizerComponent from './HarmonicSeriesVisualizer'
import IntervalExplorerComponent from './IntervalExplorer'
import ScaleExplorerComponent from './ScaleExplorer'

// Placeholder component wrapper for components not yet implemented
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

// Export implemented components
export const InteractiveWaveform = InteractiveWaveformComponent
export const HarmonicSeriesVisualizer = HarmonicSeriesVisualizerComponent
export const IntervalExplorer = IntervalExplorerComponent
export const ScaleExplorer = ScaleExplorerComponent

// Placeholder exports for components not yet implemented
export const TimbreComparison = (props) => <Placeholder name="Timbre Comparison" {...props} />
export const TuningSystemComparison = (props) => <Placeholder name="Tuning System Comparison" {...props} />
export const TwelveTETCalculator = (props) => <Placeholder name="12-TET Calculator" {...props} />
export const ChordBuilder = (props) => <Placeholder name="Chord Builder" {...props} />
export const MelodyAnalyzer = (props) => <Placeholder name="Melody Analyzer" {...props} />
export const MicrotonalExplorer = (props) => <Placeholder name="Microtonal Explorer" {...props} />
export const MusicLabPlayground = (props) => <Placeholder name="Music Lab Playground" {...props} />
