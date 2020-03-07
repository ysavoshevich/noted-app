import React, { useRef, useState, useEffect } from "react";
import { useSpring } from "react-spring";

import { useScreenSize } from "../../contexts/screen-size-context";
import { theme } from "../../theme";
import { getTransform, getBlockStyle, getIconClassname } from "./util";
import { capitalizeFirstLetter } from "../../util";

import { StyledHeader, StyledBlock, StyledIcon } from "./styles";
import EntryForm from "../entry-form/entry-form";
import Entries from "../entries/entries";

function Block({
  data,
  setData,
  blockId,
  position,
  entries,
  setShowLogoutBtn
}) {
  const [small] = useScreenSize();
  const blockRef = useRef(null);
  const [order, setOrder] = useState(null);
  const [showEntries, setShowEntries] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [isNewEntryBeingAdded, setIsNewEntryBeingAdded] = useState(false);
  const [idOfCurrentlyEditedElement, setIdOfCurrentlyEditedElement] = useState(
    null
  );
  const [showForm, setShowForm] = useState(false);
  const { y, opacity, reverseOpacity } = useSpring({
    y: expanded ? 0 : small ? 25 : 45,
    opacity: expanded ? 0 : 1,
    reverseOpacity: expanded ? 1 : 0
  });
  const { xy, wh } = useSpring({
    xy: expanded ? getTransform(position, small) : [0, 0],
    wh: expanded ? [100, 100] : small ? [100, 25] : [50, 50]
  });
  const { z } = useSpring({
    z: expanded ? 20 : 1,
    immediate: expanded ? true : false
  });
  //Rerender on deletion
  useEffect(() => {
    setShowEntries(true);
  }, [entries, setShowEntries]);
  const expandHandler = event => {
    if (
      expanded &&
      event.target.className.split(" ").includes("react-to-use-gesture")
    ) {
      setExpanded(false);
    }
    if (!expanded) {
      setExpanded(true);
    }
  };

  const closeForm = (e, immediate) => {
    if (e.target.className.split(" ").includes("close-on-click") || immediate) {
      setIdOfCurrentlyEditedElement(null);
      setShowForm(false);
      setShowLogoutBtn(true);
    }
  };

  return (
    <StyledBlock
      onClick={expandHandler}
      ref={blockRef}
      className={expanded ? "" : "react-to-use-gesture"}
      style={getBlockStyle(wh, xy, z, position, small)}
      background={theme.bg[blockId.toLowerCase()]}
      expanded={expanded ? 1 : 0}
    >
      <StyledHeader
        children={capitalizeFirstLetter(blockId)}
        style={{ top: y.interpolate(y => `${y}%`) }}
      />
      <StyledIcon
        className={getIconClassname(blockId)}
        style={{ opacity: opacity.interpolate(o => `${o}`) }}
      />
      {expanded && showEntries && (
        <Entries
          style={{ opacity: reverseOpacity }}
          blockId={blockId}
          entries={entries}
          setIdOfCurrentlyEditedElement={setIdOfCurrentlyEditedElement}
          setIsNewEntryBeingAdded={setIsNewEntryBeingAdded}
          setShowForm={setShowForm}
          setShowLogoutBtn={setShowLogoutBtn}
          data={data}
          setData={setData}
          setOrder={setOrder}
          setShowEntries={setShowEntries}
        />
      )}
      {showForm && (
        <EntryForm
          closeForm={closeForm}
          entries={entries}
          data={data}
          order={order}
          setData={setData}
          blockId={blockId}
          idOfCurrentlyEditedElement={idOfCurrentlyEditedElement}
          isNewEntryBeingAdded={isNewEntryBeingAdded}
          setShowEntries={setShowEntries}
        />
      )}
    </StyledBlock>
  );
}

export default Block;
