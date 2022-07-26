import { createContext, useState } from "react";

export const ExpandFile = createContext()

const ExpandContext = ({children}) => {
    const [filename, setFilename] = useState('http://localhost:4000/media/getFile/47_4.png')

    return <ExpandFile.Provider value={{filename, setFilename}}>
        {children}
    </ExpandFile.Provider>
}

export default ExpandContext