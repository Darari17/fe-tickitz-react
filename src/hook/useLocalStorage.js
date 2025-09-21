/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export const useLocalStorage = (key, initValue = "") => {
  const [value, setValue] = useState(() => {
    const valueFormLocalStorage = localStorage.getItem(key);
    if (valueFormLocalStorage !== null) {
      return JSON.parse(valueFormLocalStorage);
    }

    if (typeof initValue === "function") {
      return initValue();
    }

    return initValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
