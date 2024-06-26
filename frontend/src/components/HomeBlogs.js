import React from 'react';
import BlogBox from './BlogBox';
import './HomeBlogs.css'; // Import the CSS file

export default function HomeBlogs({ title, blogs }) {
    const [blogsElement, setBlogsElement] = React.useState([]);

    React.useEffect(() => {
        setBlogsElement(blogs.map((blog, index) => {
            return (
                <BlogBox 
                    key={index}
                    blog={blog}
                />
            )
        }));
    }, [blogs]);

    return (
        <div className="home-blogs--container">
            <h6>{title}</h6>
            <div className="home-blogs--grid">
                {blogsElement}
            </div>
        </div>
    );
}
