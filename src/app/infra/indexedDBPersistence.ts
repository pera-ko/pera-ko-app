import { get, set, del } from 'idb-keyval'                                                                             
import { StateStorage } from 'zustand/middleware'
                                                                                                                      
const IndexedDBStorage: StateStorage = {                                                                                                
  getItem: async (name: string): Promise<string | null> => {                                                                                          
    // Exit early on server
    if (typeof indexedDB === 'undefined') {                                                                       
      return null                                                                                                 
    }                     

    return await get(name) || null
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
                                                                                                                      
export default IndexedDBStorage