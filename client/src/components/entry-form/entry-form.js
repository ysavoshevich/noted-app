import React, { useState, useEffect } from "react";

import { getBasicEntryObject } from "../../util";
import { useScreenSize } from "../../contexts/screen-size-context";
import { addEntry, editEntry } from "./util";
import move from "lodash-move";

import { StyledEntryForm, ButtonWrapper } from "./styles";
import Darkener from "../darkener/darkener";
import Input from "../input/input";
import { SaveButton, CancelButton } from "../buttons";

export default function EntryForm({
  data,
  setData,
  order,
  blockId,
  entries,
  idOfCurrentlyEditedElement,
  closeForm,
  isNewEntryBeingAdded,
  setShowEntries
}) {
  const [small, medium] = useScreenSize();
  const [newEntry, setNewEntry] = useState(getBasicEntryObject());
  useEffect(() => {
    if (!isNewEntryBeingAdded) {
      for (let i in entries) {
        if (entries[i].id === idOfCurrentlyEditedElement) {
          setNewEntry({ ...entries[i] });
        }
      }
    }
  }, [entries, blockId, idOfCurrentlyEditedElement, isNewEntryBeingAdded]);
  const changeHandler = (e, propertyName) => {
    setNewEntry({
      ...newEntry,
      [propertyName]: e.target.value
    });
  };

  const getInputs = obj => {
    let inputs = [];
    for (let key in obj) {
      if (key === "position" || key === "id") {
        continue;
      }
      inputs.push(
        <Input
          idOfCurrentlyEditedElement={idOfCurrentlyEditedElement}
          key={key}
          label={key}
          placeholder={`Enter ${key}...`}
          value={obj[key]}
          changeHandler={e => changeHandler(e, key)}
          textarea={key === "description" ? true : false}
          labelId={blockId}
        />
      );
    }
    inputs = move(inputs, 3, 2);
    return inputs;
  };
  const submitHandler = e => {
    e.preventDefault();
    switch (isNewEntryBeingAdded) {
      case true:
        setShowEntries(false);
        addEntry(entries, order, data, setData, blockId, newEntry);
        break;
      case false:
        setShowEntries(false);
        editEntry(
          entries,
          order,
          data,
          setData,
          blockId,
          newEntry,
          idOfCurrentlyEditedElement
        );
        break;
      default:
        break;
    }
    closeForm(e, true);
  };
  return (
    <Darkener
      onMouseDown={e => {
        closeForm(e);
      }}
    >
      <StyledEntryForm
        onKeyPress={e => {
          if (e.keyCode === 27) {
            closeForm(e, true);
          }
        }}
        className="no_expand"
        onSubmit={submitHandler}
        small={small ? 1 : 0}
        medium={medium ? 1 : 0}
      >
        {getInputs(newEntry, blockId)}
        <ButtonWrapper>
          <CancelButton
            onClick={e => closeForm(e, true)}
            children="Cancel"
            type="button"
          />
          <SaveButton type="submit" blockId={blockId} children="Save" />
        </ButtonWrapper>
      </StyledEntryForm>
    </Darkener>
  );
}
