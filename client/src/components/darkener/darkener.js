import React from "react";
import { StyledDarkener } from "./styles";

export default function Darkener({ children, ...rest }) {
  return (
    <StyledDarkener children={children} className="close-on-click" {...rest} />
  );
}
