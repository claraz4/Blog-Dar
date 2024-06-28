import React from 'react';

export const LoadingContext = React.createContext();

const loadingReducer = (prevState, action) => {
    switch(action.type) {
        case 'LOAD':
            return true;

        case 'STOP_LOAD':
            return false;
    }
}

export const LoadingContextProvider = ({ children }) => {
    const [isLoading, dispatch] = React.useReducer(loadingReducer, false);
    
    return (
        <LoadingContext.Provider value={{ isLoading, dispatch }}>
            { children }
        </LoadingContext.Provider>
    )
}

export default { LoadingContext, LoadingContextProvider };