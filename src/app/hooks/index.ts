import React from "react";
import { useHistory, useLocation } from "react-router";

export function useLocQuery<T extends Record<string, string>>() {
  const history = useHistory();
  const location = useLocation();
  
  const set = (q: Partial<T>) => {
    const newQuery = new URLSearchParams(location.search)
    
    Object.keys(q as T).forEach(k => {
      if (!newQuery.has(k)) {
        newQuery.append(k, q[k] ?? "");
      } else {
        newQuery.set(k, q[k] ?? "");
      }
    })

    history.push(`${location.pathname}?${newQuery.toString()}`)
  }

  const search: Record<string, string> = { }

  const query = new URLSearchParams(useLocation().search)

  query.forEach((v, k) => {
    search[k] = v
  })

  return {
    search,
    set
  }
}

export function useLocalStorage<T>(name: string, initialValue: T) {
  const [loading, setLoading] = React.useState(true)
  const [value, setValue] = React.useState<T>(initialValue)

  const localStorageName = `settings-${name}`

  React.useEffect(() => {
    const load = async () => {
      return await localStorage.getItem(localStorageName)
    }

    load().then(storedValue => {
      if (storedValue) {
        setValue(JSON.parse(storedValue))
      }
      setLoading(false)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saveItem = async (val: T) => {
    await localStorage.setItem(localStorageName, JSON.stringify(val))
    setValue(val)
  }

  return { value, loading, setValue: saveItem }
}