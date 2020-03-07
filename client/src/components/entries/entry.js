import React from "react";
import { StyledEntry } from "./styles";
import { EditButton, DeleteButton } from "../buttons/index";

function Entry({
  title,
  author,
  bind,
  index,
  openEditEntryForm,
  deleteEntry,
  small,
  medium,
  style,
  className
}) {
  return (
    <StyledEntry
      onMouseUp={e => {
        if (small) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      {...bind(index)}
      className={className}
      style={style}
      small={small ? 1 : 0}
      medium={medium ? 1 : 0}
    >
      <div style={{ width: "20%" }}></div>
      <div
        style={{
          justifySelf: "center",
          overflow: "hidden",
          maxWidth: "60%",
          textAlign: "center"
        }}
      >
        <h3>{author}</h3>
        &nbsp;
        {author && title && <h3>-</h3>}
        &nbsp;
        <h3>{title}</h3>
      </div>
      <div style={{ width: "20%", justifySelf: "end" }}>
        <EditButton onClick={openEditEntryForm} small={small} />
        <DeleteButton onClick={deleteEntry} small={small} />
      </div>
    </StyledEntry>
  );
}

export default Entry;
