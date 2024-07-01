import HomeBlogs from "../components/HomeBlogs";
import RevealOnScroll from "../components/RevealOnScroll";
import { LoadingContext } from "../context/LoadingContext";
// import blogs from "../data/blogs";
import React from 'react';
import Loader from "../components/Loader";

export default function Home() {
    const { isLoading, dispatch } = React.useContext(LoadingContext);
    // const { allBlogs:latestBlogs, dispatch:blogsDispatch } = React.useContext(BlogsContext);
    const [latestBlogs, setLatestBlogs] = React.useState([]);
    const [popularBlogs, setPopularBlogs] = React.useState([]);

    // Fetch latest blogs
    const fetchLatest = async () => {
        try {
            dispatch({ type: 'LOAD' });
            const res = await fetch('/blogs/');
            const data = await res.json();

            if (res.ok) {
                // blogsDispatch({ type: 'UPDATE', newBlogs: data });
                setLatestBlogs(data);
                dispatch({ type: 'STOP_LOAD' });
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Fetch popular blogs
    const fetchPopular = async () => {
        try {
            const res = await fetch('/blogs/popularBlogs');
            const data = await res.json();

            if (res.ok) {
                setPopularBlogs(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Fetch the needed data
    React.useEffect(() => {
        fetchLatest();
        fetchPopular();
    }, [])

    return (
        <div className="home--container">
            <RevealOnScroll>
                <HomeBlogs
                    title="Latest Blogs"
                    blogs={latestBlogs}
                />
            </RevealOnScroll>
            
            <RevealOnScroll>
                <HomeBlogs
                    title="Popular Blogs"
                    blogs={popularBlogs}
                />
            </RevealOnScroll>

            {isLoading && <Loader />}
        </div>
    )
}