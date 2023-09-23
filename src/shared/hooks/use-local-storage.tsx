import React from "react"

function useLocalStorage<T>(name: string, initialValue: T) {
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

export default useLocalStorage