/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import {
  NavBar,
  NavButton,
  LoadButton,
  Input,
  GlobalChannelContainer,
  GlobalChannelLabel,
  GlobalChannelSelect,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ToggleContainer,
  ToggleLabel,
  Toggle,
} from "../styles/components";

interface NavigationProps {
  handleAddInput: () => void;
  savePreset: () => void;
  handleLoadPreset: (event: React.ChangeEvent<HTMLInputElement>) => void;
  globalMidiChannel: number | null;
  handleGlobalMidiChannelChange: (channel: number) => void;
  wavesEnabled: boolean;
  setWavesEnabled: (enabled: boolean) => void;
}

const Navigation = ({
  handleAddInput,
  savePreset,
  handleLoadPreset,
  globalMidiChannel,
  handleGlobalMidiChannelChange,
  wavesEnabled,
  setWavesEnabled,
}: NavigationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => setIsModalOpen(false);
  const handleModalOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  return (
    <>
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
        <NavButton onClick={() => setIsModalOpen(true)}>Advanced</NavButton>
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

      <ModalOverlay isopened={isModalOpen} onClick={handleModalOverlayClick}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Advanced Settings</ModalTitle>
            <ModalCloseButton onClick={handleModalClose}>×</ModalCloseButton>
          </ModalHeader>

          <ToggleContainer>
            <ToggleLabel htmlFor="waves-toggle">Waves</ToggleLabel>
            <Toggle
              id="waves-toggle"
              type="checkbox"
              checked={wavesEnabled}
              onChange={(e) => setWavesEnabled(e.target.checked)}
            />
          </ToggleContainer>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default Navigation;
