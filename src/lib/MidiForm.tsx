import React, { useState } from "react";

function MidiForm({ onRemove }) {
  const [midiChannel, setMidiChannel] = useState(1);
  const [midiCC, setMidiCC] = useState(1);
  const [value, setValue] = useState(64);
  const [label, setLabel] = useState("MIDI Control Block");
  const [isEditing, setIsEditing] = useState(false);

  const handleMidiUpload = async (currentValue) => {
    try {
      const midiAccess = await navigator.requestMIDIAccess();
      const outputs = Array.from(midiAccess.outputs.values());

      if (outputs.length === 0) {
        alert("No MIDI outputs found. Please connect a MIDI device.");
        return;
      }

      const output = outputs[5];
      const message = [0xb0 + midiChannel - 1, midiCC, currentValue];
      output.send(message);
    } catch (error) {
      console.error("MIDI Error:", error);
      alert("MIDI not supported or access denied");
    }
  };

  const handleLabelClick = () => {
    setIsEditing(true);
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const handleLabelBlur = () => {
    setIsEditing(false);
  };

  const handleLabelKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setIsEditing(false);
    }
  };

  const handleValueChange = (e) => {
    setValue(Number(e.target.value));
    handleMidiUpload(e.target.value);
  };

  return (
    <div className="midi-form">
      <div className="form-header">
        <div className="form-header-content">
          {isEditing ? (
            <input
              type="text"
              value={label}
              onChange={handleLabelChange}
              onBlur={handleLabelBlur}
              onKeyDown={handleLabelKeyDown}
              className="form-title-input"
              autoFocus
            />
          ) : (
            <h3 className="form-title" onClick={handleLabelClick}>
              {label}
            </h3>
          )}
        </div>
        <button className="remove-button" onClick={onRemove}>
          ×
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="midi-channel">MIDI Channel:</label>
        <select
          id="midi-channel"
          value={midiChannel}
          onChange={(e) => setMidiChannel(Number(e.target.value))}
        >
          {Array.from({ length: 15 }, (_, i) => i + 1).map((channel) => (
            <option key={channel} value={channel}>
              {channel}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="midi-cc">MIDI CC:</label>
        <select
          id="midi-cc"
          value={midiCC}
          onChange={(e) => setMidiCC(Number(e.target.value))}
        >
          {Array.from({ length: 100 }, (_, i) => i + 1).map((cc) => (
            <option key={cc} value={cc}>
              {cc}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="value-slider">Value: {value}</label>
        <input
          id="value-slider"
          type="range"
          min="0"
          max="127"
          value={value}
          onChange={(e) => handleValueChange(e)}
        />
      </div>
    </div>
  );
}

export default MidiForm;
