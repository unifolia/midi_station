/* eslint-disable no-unused-vars */
import { useState } from "react";
import labelHandler from "../util/labelHandler";

interface HeaderProps {
  name: string;
  setName: (name: string) => void;
}

const Header = ({ name, setName }: HeaderProps) => {
  const [isEditing, setIsEditing] = useState(true);
  const {
    handleLabelClick,
    handleLabelChange,
    handleLabelBlur,
    handleLabelKeyDown,
  } = labelHandler;

  return (
    <>
      <h1>midi pedal web editor</h1>
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={(e) => handleLabelChange(setName, e)}
          onBlur={() => handleLabelBlur(setIsEditing)}
          onKeyDown={(e) => handleLabelKeyDown(setIsEditing, e)}
          className="header form-title-input"
          autoFocus
        />
      ) : (
        <h2
          className="form-title"
          onClick={() => handleLabelClick(setIsEditing)}
        >
          {name}
        </h2>
      )}
    </>
  );
};

export default Header;
