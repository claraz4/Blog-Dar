import React from 'react';
import BlogBox from './BlogBox';

export default function HomeBlogs({ title, blogs }) {
    const [blogsElement, setBlogsElement] = React.useState([]);

    React.useEffect(() => {
        setBlogsElement(blogs.map((blog) => {
            return (
                <BlogBox 
                    blog={blog}
                />
            )
        }))
    }, [])

    return (
        <div className="home-blogs--container">
            <h6>{title}</h6>
            <div>
                {blogsElement}
            </div>
        </div>
    )
}