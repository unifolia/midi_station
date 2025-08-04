/* eslint-disable no-unused-vars */
import React from "react";

import {
  NavBar,
  NavButton,
  LoadButton,
  Input,
  GlobalChannelContainer,
  GlobalChannelLabel,
  GlobalChannelSelect,
} from "../styles/components";

interface NavigationProps {
  handleAddInput: () => void;
  savePreset: () => void;
  handleLoadPreset: (event: React.ChangeEvent<HTMLInputElement>) => void;
  globalMidiChannel: number | null;
  handleGlobalMidiChannelChange: (channel: number) => void;
}

const Navigation = ({
  handleAddInput,
  savePreset,
  handleLoadPreset,
  globalMidiChannel,
  handleGlobalMidiChannelChange,
}: NavigationProps) => {
  return (
    <NavBar>
      <NavButton onClick={handleAddInput}>Add Input</NavButton>
      <NavButton onClick={savePreset}>Save Preset</NavButton>
      <LoadButton>
        Upload Preset
        <Input
          type="file"
          accept=".json"
          onChange={handleLoadPreset}
          value=""
        />
      </LoadButton>
      <GlobalChannelContainer>
        <GlobalChannelLabel>Global MIDI Channel:</GlobalChannelLabel>
        <GlobalChannelSelect
          value={globalMidiChannel || ""}
          onChange={(e) =>
            handleGlobalMidiChannelChange(Number(e.target.value))
          }
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((channel) => (
            <option key={channel} value={channel}>
              {channel}
            </option>
          ))}
        </GlobalChannelSelect>
      </GlobalChannelContainer>
    </NavBar>
  );
};

export default Navigation;
