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