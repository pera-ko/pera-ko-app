import React from "react";
import { useLocation } from "react-router";

export function useLocQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useLocalStorage<T>(name: string, initialValue: T): [T, (initialValue: T) => void] {
  const [value, setValue] = React.useState<T>(initialValue)

  const localStorageName = `settings-${name}`

  React.useEffect(() => {
    const storedValue = localStorage.getItem(localStorageName)

    if (storedValue) {
      setValue(JSON.parse(storedValue))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saveItem = (val: T) => {
    localStorage.setItem(localStorageName, JSON.stringify(val))
    setValue(val)
  }

  return [value, saveItem]
}