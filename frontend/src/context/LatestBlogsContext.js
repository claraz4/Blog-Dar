import React from 'react';

export const LatestBlogsContext = React.createContext();

const reduceBlogs = (state, action) => {
    switch (action.type) {
        case 'SET_LATEST':
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

export const LatestBlogsContextProvider = ({ children }) => {
    const [latestBlogs, dispatch] = React.useReducer(reduceBlogs, []);

    return (
        <LatestBlogsContext.Provider value={{ latestBlogs, dispatch }}>
            { children }
        </LatestBlogsContext.Provider>
    )
}