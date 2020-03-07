import React from "react";
import {
  StyledInput,
  StyledInputWrapper,
  StyledLabel,
  StyledTextarea
} from "./styles";
import { OpenLinkButton } from "../buttons/index";

import { capitalizeFirstLetter } from "../../util";

export default function Input({
  label,
  placeholder,
  value,
  changeHandler,
  textarea,
  labelId,
  style,
  type,
  idOfCurrentlyEditedElement
}) {
  const handleEnterKey = e => {
    if (e.charCode === 13) {
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      if (form.elements[index + 2]) {
        form.elements[index + 1].focus();
        e.preventDefault();
      }
    }
  };

  let input = (
    <StyledInput
      onKeyPress={handleEnterKey}
      id={label}
      placeholder={placeholder}
      name={label}
      value={value}
      onChange={changeHandler}
      type={type ? type : "text"}
    />
  );

  if (textarea) {
    input = (
      <StyledTextarea
        id={label}
        placeholder={placeholder}
        name={label}
        value={value}
        onChange={changeHandler}
        type={type ? type : null}
      />
    );
  }
  return (
    <StyledInputWrapper style={style ? style : null}>
      <StyledLabel htmlFor={label} labelId={labelId}>
        {capitalizeFirstLetter(label)}
      </StyledLabel>
      {idOfCurrentlyEditedElement && label === "link" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around"
          }}
        >
          {input}
          <OpenLinkButton href={value} />
        </div>
      ) : (
        input
      )}
    </StyledInputWrapper>
  );
}
