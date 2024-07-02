import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (prevState, action) => {
    switch(action.type) {
        case 'LOGIN':
            return { user: action.payload }
        
        case 'LOGOUT':
            return { user: null }

        default:
            return prevState;
    }
} 

export const AuthContextProvider = ({ children }) => {
    const [user, dispatch] = useReducer(authReducer, {
        user: null
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
        }
    }
    , [])

    return (
        <AuthContext.Provider value={{ ...user, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}