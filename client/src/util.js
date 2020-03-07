import uuidv4 from "uuid/v4";

export const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiryDate");
  localStorage.removeItem("dataObj");
  window.location.reload();
};

export const setAutoLogout = milliseconds => {
  if (milliseconds < 0) {
    logout();
  } else {
    setTimeout(() => {
      logout();
    }, milliseconds);
  }
};

export const loginOnRefresh = () => {
  try {
    const token = localStorage.getItem("token");
    const dataObj = JSON.parse(localStorage.getItem("dataObj"));
    const expiryDate = localStorage.getItem("expiryDate");
    if (token) {
      setAutoLogout(new Date(expiryDate).getTime() - new Date().getTime());
    }
    return [token, dataObj];
  } catch (error) {
    console.log(error);
  }
};

export const capitalizeFirstLetter = str =>
  str[0].toUpperCase() + str.substring(1);

export const getBasicDataObj = () => ({
  books: {
    entries: []
  },
  music: {
    entries: []
  },
  movies: {
    entries: []
  },
  articles: {
    entries: []
  }
});

export const getBasicEntryObject = () => ({
  author: "",
  title: "",
  description: "",
  link: "",
  position: null,
  id: uuidv4()
});

export const updateDataObj = (data, setData, blockId, updatedEntries) => {
  const newObj = data.setIn([blockId, "entries"], updatedEntries);
  setData(newObj);
  return newObj;
};

export const assignNewPositions = (entries, order) =>
  entries.map(entry => {
    for (let index in order) {
      if (entry.position === order[+index]) {
        return { ...entry, position: +index };
      }
    }
    return null;
  });
