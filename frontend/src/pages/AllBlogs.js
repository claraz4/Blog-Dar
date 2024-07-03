import React from 'react';
import { LoadingContext } from '../context/LoadingContext';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';
import BlogBoxAll from "../components/BlogBoxAll";
import { LatestBlogsContext } from '../context/LatestBlogsContext';

export default function AllBlogs({ setDisplayFooter }) {
    const { isLoading, dispatch } = React.useContext(LoadingContext);
    const { latestBlogs, dispatch:blogsDispatch } = React.useContext(LatestBlogsContext);
    const [blogsElement, setBlogsElement] = React.useState([]);
    
    React.useEffect(() => {
        setDisplayFooter(true);
    }, [])

    // Fetch latest blogs
    const fetchLatest = async () => {
        try {
            dispatch({ type: 'LOAD' });
            const res = await fetch('/blogs/');
            const data = await res.json();

            if (res.ok) {
                // blogsDispatch({ type: 'UPDATE', newBlogs: data });
                blogsDispatch({ type: 'SET_BLOGS', blogs: data });
                dispatch({ type: 'STOP_LOAD' });
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Fetch the needed data 
    React.useEffect(() => {
        fetchLatest();
    }, []);

    // Create the blogs elements to be rendered
    React.useEffect(() => {
        setBlogsElement(latestBlogs.map((blog) => {
            return <BlogBoxAll blog={blog} />
        }))
    }, [latestBlogs])

    return (
        <div className="all-blogs--container">
            <SearchBar />
            <div className="all-blogs">
                {blogsElement}
            </div>
        </div>
    )
}