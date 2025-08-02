/* eslint-disable no-unused-vars */
import React from "react";
const labelHandler = {
  handleLabelClick: function (setIsEditing: (editing: boolean) => void): void {
    setIsEditing(true);
  },

  handleLabelChange: function (
    setLabel: (label: string) => void,
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    setLabel(e.target.value);
  },

  handleLabelBlur: function (setIsEditing: (editing: boolean) => void): void {
    setIsEditing(false);
  },

  handleLabelKeyDown: function (
    setIsEditing: (editing: boolean) => void,
    e: React.KeyboardEvent
  ): void {
    if (e.key === "Enter" || e.key === "Escape") {
      setIsEditing(false);
    }
  },
};

export default labelHandler;
