import React from 'react';

export const UserBlogsContext = React.createContext();

const reduceBlogs = (state, action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return action.blogs;

        case 'DELETE_BLOG':
            return state.filter(blog => blog._id !== action.id);

        default:
            return state;
    }
}

export const UserBlogsContextProvider = ({ children }) => {
    const [userBlogs, dispatch] = React.useReducer(reduceBlogs, []);

    return (
        <UserBlogsContext.Provider value={{ userBlogs, dispatch }}>
            { children }
        </UserBlogsContext.Provider>
    )
}