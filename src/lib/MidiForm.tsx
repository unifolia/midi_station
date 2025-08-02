/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import labelHandler from "../util/labelHandler";

interface MidiFormProps {
  onRemove: () => void;
  midiChannel: number;
  setMidiChannel: (n: number) => void;
  midiCC: number;
  setMidiCC: (n: number) => void;
  value: number;
  setValue: (n: number) => void;
  label: string;
  setLabel: (s: string) => void;
}

const MidiForm = ({
  onRemove,
  midiChannel,
  setMidiChannel,
  midiCC,
  setMidiCC,
  value,
  setValue,
  label,
  setLabel,
}: MidiFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleLabelClick,
    handleLabelChange,
    handleLabelBlur,
    handleLabelKeyDown,
  } = labelHandler;

  const handleMidiUpload = async (currentValue: number) => {
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

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    handleMidiUpload(newValue);
  };

  return (
    <div className="midi-form">
      <div className="form-header">
        <div className="form-header-content">
          {isEditing ? (
            <input
              type="text"
              value={label}
              onChange={(e) => handleLabelChange(setLabel, e)}
              onBlur={() => handleLabelBlur(setIsEditing)}
              onKeyDown={(e) => handleLabelKeyDown(setIsEditing, e)}
              className="form-title-input"
              autoFocus
            />
          ) : (
            <h3
              className="form-title"
              onClick={() => handleLabelClick(setIsEditing)}
            >
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
          {Array.from({ length: 20 }, (_, i) => i + 1).map((channel) => (
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
};

export default MidiForm;
