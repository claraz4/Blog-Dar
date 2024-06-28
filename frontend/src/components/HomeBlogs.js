import React from 'react';
import BlogBox from './BlogBox';
import { Link } from 'react-router-dom';

export default function HomeBlogs({ title, blogs, addClass }) {
    const [blogsElement, setBlogsElement] = React.useState([]);
    const [showMore, setShowMore] = React.useState(false);

    React.useEffect(() => {
        if (blogs) {
            let blogsEdited = [...blogs];
            
            if (!showMore) {
                blogsEdited = blogsEdited.slice(0,6);
            } else {
                blogsEdited = [...blogs];
            }

            setBlogsElement(blogsEdited.map((blog, idx) => {
                return (
                    <BlogBox 
                        key={idx}
                        blog={blog}
                    />
                )
            }))
        }
    }, [showMore, blogs]);

    return (
        <div className={`home-blogs--container${addClass && addClass !== "" ? ` ${addClass}`: ""}`}>
            <div className="home-blogs--full-title">
                <h6 className="home-blogs--title">{title}</h6>
                <Link className="green-button" to="/blogs">Show All Posts</Link>
            </div>
            <div className="home-blogs">
                {blogsElement}
            </div>
            <button onClick={() => setShowMore(prev => !prev)} className="green-button">{!showMore ? "Show + " : "Hide -"}</button>
        </div>
    );
}