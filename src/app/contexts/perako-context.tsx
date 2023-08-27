import React, { PropsWithChildren, useContext, useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom';
import { useTransactionStore } from "../store";
import { keys } from "idb-keyval";

type PerakoType = {
  currentYear: number;
  currentMonth: number;
}

const PerakoContext = React.createContext<PerakoType>({} as PerakoType)

export const PerakoProvider = ({ children } : PropsWithChildren) => {
  const { year, month } = useParams<{ year: string; month: string }>();
  const location = useLocation();
  
  useEffect(() => {
    const dbName = `perako-transaction-${year}-${month}`;

    keys().then(k => {
      const exists = k.some(v => v.toString() === dbName)
      console.log('rehydrating transaction store...')
      useTransactionStore.persist.rehydrate()

      if (!exists) {
        console.log(dbName + ' doesnt exist')
        useTransactionStore.setState(state => ({
          ...state,
          list: [],
          incomeList: []
        })) 
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <PerakoContext.Provider value={{ currentYear: +year, currentMonth: +month }}>
      {children}
    </PerakoContext.Provider>
  )
}

const usePerako = () => {
  return useContext(PerakoContext)
}

export default usePerako