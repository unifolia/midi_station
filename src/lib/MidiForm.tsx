/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import labelHandler from "../util/labelHandler";
import {
  MidiFormContainer,
  FormHeader,
  FormHeaderContent,
  FormTitleDisplay,
  FormTitleInput,
  RemoveButton,
  FormGroup,
  FormLabel,
  Select,
  RangeInput,
} from "../styles/components";

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
  backgroundColor: string;
  setBackgroundColor: (s: string) => void;
  device: string;
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
  backgroundColor,
  setBackgroundColor,
  device,
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

      const outputs = midiAccess?.outputs?.values();
      const outputsArray = outputs ? Array.from(outputs) : [];
      const [output] = outputsArray.filter(
        (outputs) => outputs?.name === device
      );

      const message = [0xb0 + midiChannel - 1, midiCC, currentValue];

      if (output) {
        output.send(message);
      }
    } catch (error) {
      console.error("MIDI Error:", error);
      alert(
        "MIDI not supported on this browser. Please check your settings, or try a different browser."
      );
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    handleMidiUpload(newValue);
  };

  useEffect(() => {
    handleMidiUpload(value);
  }, [device, midiChannel, midiCC]);

  return (
    <MidiFormContainer style={{ background: backgroundColor + "55" }}>
      <FormHeader>
        <FormHeaderContent>
          {isEditing ? (
            <>
              <label htmlFor=""></label>
              <FormTitleInput
                type="text"
                value={label}
                onChange={(e) => handleLabelChange(setLabel, e)}
                onBlur={() => handleLabelBlur(setIsEditing, label, setLabel)}
                onKeyDown={(e) => handleLabelKeyDown(setIsEditing, e)}
                autoFocus
              />
            </>
          ) : (
            <FormTitleDisplay onClick={() => handleLabelClick(setIsEditing)}>
              {label}
            </FormTitleDisplay>
          )}
        </FormHeaderContent>
        <RemoveButton onClick={onRemove}>×</RemoveButton>
      </FormHeader>

      <FormGroup>
        <FormLabel htmlFor="midi-channel">MIDI Channel:</FormLabel>
        <Select
          id="midi-channel"
          value={midiChannel}
          onChange={(e) => setMidiChannel(Number(e.target.value))}
          disabled={false}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((channel) => (
            <option key={channel} value={channel}>
              {channel}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="midi-cc">MIDI CC:</FormLabel>
        <Select
          id="midi-cc"
          value={midiCC}
          onChange={(e) => setMidiCC(Number(e.target.value))}
        >
          {Array.from({ length: 100 }, (_, i) => i + 1).map((cc) => (
            <option key={cc} value={cc}>
              {cc}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="value-slider">Value: {value}</FormLabel>
        <RangeInput
          id="value-slider"
          type="range"
          min="0"
          max="127"
          value={value}
          onChange={(e) => handleValueChange(e)}
        />
      </FormGroup>

      <FormGroup className="color-picker">
        <FormLabel htmlFor="color-picker">Background:</FormLabel>
        <input
          id="color-picker"
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          style={{
            width: "45%",
            height: "40px",
            border: "none",
            outline: "5px solid #3e3e3e",
            outlineOffset: "-6px",
            borderRadius: "8px",
            cursor: "pointer",
            background: "transparent",
          }}
        />
      </FormGroup>
    </MidiFormContainer>
  );
};

export default MidiForm;
