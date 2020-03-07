import React, { useRef, useEffect, useCallback } from "react";
import { useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import axios from "axios";
import * as Sentry from "@sentry/browser";
import { clamp } from "lodash";
import move from "lodash-move";

import { useScreenSize } from "../../contexts/screen-size-context";
import { useAuth } from "../../contexts/auth-context";
import { useServerError } from "../../contexts/server-error-context";

import { ENTRY_HEIGHT } from "../../constants";
import { springHandler, calculatePositionsAfterDeletion } from "./util";
import { assignNewPositions, updateDataObj } from "../../util";

import { StyledEntries, ButtonWrapper } from "./styles";
import { AddButton, SaveAndCloseButton } from "../buttons";
import Entry from "./entry";

function Entries({
  style,
  blockId,
  setIdOfCurrentlyEditedElement,
  setIsNewEntryBeingAdded,
  setShowForm,
  setShowLogoutBtn,
  entries,
  data,
  setData,
  setOrder,
  setShowEntries
}) {
  const order = useRef(
    entries
      .sort((a, b) => {
        return a.position - b.position;
      })
      .map(entry => entry.position)
  );
  const entriesRef = useRef(null);
  let disableScroll = false;
  useEffect(() => {
    const ref = entriesRef.current;
    const listener = e => {
      if (disableScroll) {
        e.preventDefault();
      }
    };
    ref.addEventListener("touchmove", listener, { passive: false });
    return () => {
      window.removeEventListener("touchmove", listener, { passive: false });
    };
  }, [disableScroll, entriesRef]);
  const [small, medium] = useScreenSize();
  const [token] = useAuth();
  const [setServerError] = useServerError();
  const [springs, setSprings] = useSprings(
    entries.length,
    springHandler(order.current)
  );
  useEffect(() => {
    order.current = entries
      .sort((a, b) => {
        return a.position - b.position;
      })
      .map(entry => entry.position);
    setSprings(order.current);
  }, [entries, setSprings, setShowEntries]);

  let touch = false;
  let doubleTouch = false;
  let latestTouch = null;

  const isDoubleTouch = () => {
    let now = 0;
    let timesince = 0;
    if (latestTouch) {
      now = new Date().getTime();
      timesince = now - latestTouch;
    }
    latestTouch = new Date().getTime();
    if (timesince < 250 && timesince > 0) {
      return true;
    } else {
      return false;
    }
  };

  let bind = useDrag(
    ({ args: [originalIndex], down, event, movement: [, y] }) => {
      if (event.type === "touchstart") {
        touch = true;
        doubleTouch = isDoubleTouch(latestTouch);
      }
      if (doubleTouch) {
        disableScroll = true;
      }
      if (
        (touch && doubleTouch) ||
        event.type === "mousedown" ||
        event.type === "mousemove" ||
        event.type === "mouseup"
      ) {
        const curIndex = order.current.indexOf(originalIndex);
        const curRow = clamp(
          Math.round((curIndex * ENTRY_HEIGHT + y) / ENTRY_HEIGHT),
          0,
          entries.length - 1
        );
        const newOrder = move(order.current, curIndex, curRow);
        setSprings(
          springHandler(
            newOrder,
            down,
            touch,
            doubleTouch,
            originalIndex,
            curIndex,
            y
          )
        );

        if (event.type === "touchend" || event.type === "mouseup") {
          order.current = newOrder;
          disableScroll = false;
        }
      }
    }
  );

  const saveChanges = async () => {
    const newDataObj = updateDataObj(
      data,
      setData,
      blockId,
      assignNewPositions(entries, order.current)
    );
    localStorage.setItem("dataObj", JSON.stringify(newDataObj));
    try {
      await axios.post(
        "/updateDataObj",
        {
          dataObj: newDataObj
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      Sentry.withScope(scope => {
        Sentry.captureException(error);
      });
      setServerError(true);
    }
  };

  const deleteEntry = id => {
    let updatedEntries = assignNewPositions(entries, order.current);
    updatedEntries = calculatePositionsAfterDeletion(updatedEntries, id);
    setShowEntries(false);
    updateDataObj(data, setData, blockId, updatedEntries);
  };

  const openAddEntryForm = () => {
    setOrder([...order.current]);
    setIsNewEntryBeingAdded(true);
    setShowForm(true);
    setShowLogoutBtn(false);
  };
  const openEditEntryForm = i => {
    setOrder([...order.current]);
    setIdOfCurrentlyEditedElement(entries[i].id);
    setIsNewEntryBeingAdded(false);
    setShowForm(true);
    setShowLogoutBtn(false);
  };
  return (
    <>
      <ButtonWrapper style={style}>
        <AddButton children="Add Entry" onClick={openAddEntryForm} />
        <SaveAndCloseButton
          onClick={saveChanges}
          className="react-to-use-gesture"
          children="Save and Close"
        />
      </ButtonWrapper>
      <StyledEntries
        ref={entriesRef}
        style={style}
        small={small ? 1 : 0}
        medium={medium ? 1 : 0}
      >
        {springs.map(({ y }, i) => {
          return (
            <Entry
              className="react-to-touch-move"
              key={i}
              index={i}
              bind={bind}
              small={small}
              medium={medium}
              style={{
                transform: y.interpolate(y => `translateY(${y}px)`)
              }}
              title={entries[i].title}
              author={entries[i].author}
              openEditEntryForm={() => openEditEntryForm(i)}
              deleteEntry={() => {
                deleteEntry(entries[i].id);
              }}
            />
          );
        })}
      </StyledEntries>
    </>
  );
}

export default Entries;
