import React from 'react';
import BlogBox from './BlogBox';

export default function HomeBlogs({ title, blogs, addClass }) {
    const [blogsElement, setBlogsElement] = React.useState([]);
    const [showMore, setShowMore] = React.useState(false);

    React.useEffect(() => {
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
    }, [showMore])

    return (
        <div className={`home-blogs--container${addClass !== "" ? ` ${addClass}`: ""}`}>
            <div className="home-blogs--full-title">
                <h6 className="home-blogs--title">{title}</h6>
                <button className="green-button">Show All Posts</button>
            </div>
            <div className="home-blogs">
                {blogsElement}
            </div>
            <button onClick={() => setShowMore(prev => !prev)} className="green-button">{!showMore ? "Show + " : "Hide -"}</button>
        </div>
    );
}