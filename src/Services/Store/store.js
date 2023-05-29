import { createContext, useState } from 'react';

export const StoreContext = createContext("");

export const StoreProvider = ({ children }) => {
    const [storeData, setStoreData] = useState(null);

    const clearData = () => {
        setStoreData(null)
    }

    return (
        <StoreContext.Provider value ={{storeData, setStoreData, clearData}}>
            {children}
        </StoreContext.Provider>
    )
}

