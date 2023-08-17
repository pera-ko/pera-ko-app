import React, { PropsWithChildren, useContext } from "react";
import { useParams } from 'react-router-dom';

type PerakoType = {
  currentYear: number;
  currentMonth: number;
}

const PerakoContext = React.createContext<PerakoType>({} as PerakoType)

export const PerakoProvider = ({ children } : PropsWithChildren) => {

  const { year, month } = useParams<{ year: string; month: string }>();

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