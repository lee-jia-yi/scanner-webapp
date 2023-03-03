import React, { useState, useContext } from 'react'
const AppContext = React.createContext()


const AppProvider = ({ children }) => {
 const [scanners, setScanners] = useState([])

 return (
  <AppContext.Provider
   value={{ scanners, setScanners }}
  >
   {children}
  </AppContext.Provider>
 )
}

export const useGlobalContext = () => {
 return useContext(AppContext)
}

export { AppContext, AppProvider }