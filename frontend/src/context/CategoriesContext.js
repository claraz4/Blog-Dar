import React from 'react';

export const CategoriesContext = React.createContext();

const categoriesReducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE':
            return action.newCategories;

        default:
            return state;
    }
}

export const CategoriesContextProvider = ({ children }) => {
    const [categories, categoriesDispatch] = React.useReducer(categoriesReducer, []);

    return (
        <CategoriesContext.Provider value={{ categories, categoriesDispatch }}>
            { children }
        </CategoriesContext.Provider>
    )
}