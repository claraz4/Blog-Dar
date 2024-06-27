import React from 'react';
import BlogBox from './BlogBox';

export default function HomeBlogs({ title, blogs }) {
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
        <div className="home-blogs--container">
            <h6 className="home-blogs--title">{title}</h6>
            <div className="home-blogs">
                {blogsElement}
            </div>
            <button onClick={() => setShowMore(prev => !prev)} className="blue-button">{!showMore ? "Show + " : "Hide -"}</button>
        </div>
    )
}