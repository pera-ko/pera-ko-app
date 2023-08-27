import { get, set, del } from 'idb-keyval'                                                                             
import { StateStorage } from 'zustand/middleware'
                                                                                                                      
const IndexedDBStorage: StateStorage = {                                                                                                
  getItem: async (name: string): Promise<string | null> => {
    // Exit early on server
    if (typeof indexedDB === 'undefined') {                                                                       
      return null                                                                                                 
    }                     
    
    const data = await get(name) || null
    // console.log(data)
    return data
  },                                                                                                                
  setItem: async (name: string, value: string): Promise<void> => {
    // Exit early on server                                               
    if (typeof indexedDB === 'undefined') {                                                                         
      return
    }                                                                                                                                                                                          
    set(name, value)
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(name, 'has been deleted')
    await del(name)
  },
}

const getUrlSearch = () => {
  const [year, month] = window.location.pathname.slice(1).split('/')
  return {
    year, month
  }
}

export const IndexedDBStorageYearMonth: StateStorage = {                                                                                                
  getItem: async (name: string): Promise<string | null> => {
    const { year, month } = getUrlSearch()
    console.log(year, month)
    // Exit early on server
    if (typeof indexedDB === 'undefined') {                                                                       
      return null                                                                                                 
    }                     
    const dbName = `${name}-${year}-${month}`;
    console.log(dbName)
    const data = await get(dbName) || null
    // console.log(data)
    return data
  },                                                                                                                
  setItem: async (name: string, value: string): Promise<void> => {
    const [year, month] = window.location.pathname.slice(1).split('/')
    // Exit early on server                                               
    if (typeof indexedDB === 'undefined') {                                                                         
      return
    }                                                                                                                                                                                          
    set(`${name}-${year}-${month}`, value)
  },
  removeItem: async (name: string): Promise<void> => {
    const [year, month] = window.location.pathname.slice(1).split('/')
    console.log(`${name}-${year}-${month}`, 'has been deleted')
    await del(`${name}-${year}-${month}`)
  },
}
                                                                                                                      
export default IndexedDBStorage