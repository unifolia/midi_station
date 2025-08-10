/* eslint-disable no-unused-vars */
import { useState } from "react";
import labelHandler from "../util/labelHandler";
import { Title } from "../styles/GlobalStyles";
import {
  FormClickable,
  FormTitleDisplay,
  FormTitleInput,
} from "../styles/components";

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

  return (
    <>
      <Title>Messenger</Title>
      <FormClickable>
        {isEditing ? (
          <FormTitleInput
            id="presetName"
            type="text"
            value={name}
            onChange={(e) => handleLabelChange(setName, e)}
            onBlur={() => handleLabelBlur(setIsEditing, name, setName)}
            onKeyDown={(e) => handleLabelKeyDown(setIsEditing, e)}
            className="header"
            autoFocus
          />
        ) : (
          <FormTitleDisplay
            as="h2"
            className="header"
            onClick={() => handleLabelClick(setIsEditing)}
          >
            {name}
          </FormTitleDisplay>
        )}
      </FormClickable>
    </>
  );
};

export default Header;
