import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SingleBlog() {
    const blog = useLocation().state.blog;
    
    return (
        <div>
            hi
        </div>
    )
}