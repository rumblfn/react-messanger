import { createContext, useState } from "react";

export const ExpandFile = createContext()

const ExpandContext = ({children}) => {
    const [filename, setFilename] = useState('')

    return <ExpandFile.Provider value={{filename, setFilename}}>
        {children}
    </ExpandFile.Provider>
}

export default ExpandContext