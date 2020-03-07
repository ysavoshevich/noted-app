import { assignNewPositions, updateDataObj } from "../../util";
import uuidv4 from "uuid/v4";

export const substituteWithNewValues = (
  entries,
  idOfCurrentlyEditedElement,
  newEntry
) =>
  entries.map(entry => {
    if (entry.id === idOfCurrentlyEditedElement) {
      return { ...newEntry };
    }
    return { ...entry };
  });

export const addEntry = (entries, order, data, setData, blockId, newEntry) => {
  if (entries.length > 0) {
    const updatedEntries = [
      ...assignNewPositions(entries, order).map(entry => ({
        ...entry,
        position: entry.position + 1
      })),
      { ...newEntry, position: 0, id: uuidv4() }
    ];
    updateDataObj(data, setData, blockId, updatedEntries);
  }
  if (entries.length === 0)
    updateDataObj(data, setData, blockId, [
      { ...newEntry, position: 0, id: uuidv4() }
    ]);
};

export const editEntry = (
  entries,
  order,
  data,
  setData,
  blockId,
  newEntry,
  idOfCurrentlyEditedElement
) => {
  let updatedEntries = substituteWithNewValues(
    entries,
    idOfCurrentlyEditedElement,
    newEntry
  );
  updatedEntries = assignNewPositions(updatedEntries, order);
  updateDataObj(data, setData, blockId, updatedEntries);
};
