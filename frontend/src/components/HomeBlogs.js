import React from 'react';
import BlogBox from './BlogBox';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

export default function HomeBlogs({ title, blogs, addClass }) {
    const [blogsElement, setBlogsElement] = React.useState([]);
    const [showMore, setShowMore] = React.useState(false);
    const [noBlogs, setNoBlogs] = React.useState(true);
    const isMedium = useMediaQuery('(max-width: 710px)');
    const isSmall = useMediaQuery('(max-width: 500px)');
    const isVerySmall = useMediaQuery('(max-width: 315px)');

    React.useEffect(() => {
        setNoBlogs(Number(blogs.length) === 0);
        
        if (!noBlogs && blogs) {
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
                {!noBlogs && <Link className="green-button" to="/blogs">{isVerySmall ? "+" : `Show All${isSmall ? "" : " Posts"}`}</Link>}
            </div>
            {noBlogs && <p className="no-blogs-p">There are no blogs available at the moment.</p>}
            <div className="home-blogs">
                {blogsElement}
            </div>
            {!noBlogs && !isMedium && <button onClick={() => setShowMore(prev => !prev)} className="green-button">{!showMore ? "Show + " : "Hide -"}</button>}
        </div>
    );
}