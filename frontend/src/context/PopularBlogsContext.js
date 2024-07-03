import React from 'react';

export const PopularBlogsContext = React.createContext();

const reduceBlogs = (state, action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return action.blogs;

        case 'UPDATE_LIKE':
            return state.map(blog => {
                if (blog._id === action.blog_id) {
                    let likes = [...blog.likedby]
                    
                    if (!likes.includes(action.user_id)) {
                        likes.push(action.user_id)
                    } else {
                        likes = likes.filter(id => id !== action.user_id);
                    }

                    return {
                        ...blog,
                        likedby: likes
                    }
                }
                return blog;
            })

            case 'UPDATE_DISLIKE':
                return state.map(blog => {
                    if (blog._id === action.blog_id) {
                        let likes = [...blog.dislikedby]
                        
                        if (!likes.includes(action.user_id)) {
                            likes.push(action.user_id)
                        } else {
                            likes = likes.filter(id => id !== action.user_id);
                        }
    
                        return {
                            ...blog,
                            dislikedby: likes
                        }
                    }
                    return blog;
                })

        default:
            return state;
    }
}

export const PopularBlogsContextProvider = ({ children }) => {
    const [popularBlogs, dispatch] = React.useReducer(reduceBlogs, []);

    return (
        <PopularBlogsContext.Provider value={{ popularBlogs, dispatch }}>
            { children }
        </PopularBlogsContext.Provider>
    )
}

export default { PopularBlogsContext, PopularBlogsContextProvider };