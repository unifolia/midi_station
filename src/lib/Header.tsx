/* eslint-disable no-unused-vars */
import { useState } from "react";
import labelHandler from "../util/labelHandler";
import { Title } from "../styles/GlobalStyles";
import { FormTitleDisplay, FormTitleInput } from "../styles/components";

interface HeaderProps {
  name: string;
  setName: (name: string) => void;
}

const Header = ({ name, setName }: HeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    handleLabelClick,
    handleLabelChange,
    handleLabelBlur,
    handleLabelKeyDown,
  } = labelHandler;

  console.log(name);

  return (
    <>
      <Title>MIDI Messenger</Title>
      {isEditing ? (
        <>
          <label htmlFor="presetName">Edit Preset Name</label>
          <FormTitleInput
            id="presetName"
            type="text"
            value={name}
            onChange={(e) => handleLabelChange(setName, e)}
            onBlur={() => handleLabelBlur(setIsEditing)}
            onKeyDown={(e) => handleLabelKeyDown(setIsEditing, e)}
            className="header"
            autoFocus
          />
        </>
      ) : (
        <FormTitleDisplay
          as="h2"
          onClick={() => handleLabelClick(setIsEditing)}
        >
          {name}
        </FormTitleDisplay>
      )}
    </>
  );
};

export default Header;
