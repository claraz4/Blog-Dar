import HomeBlogs from "../components/HomeBlogs";
import RevealOnScroll from "../components/RevealOnScroll";
import { LoadingContext } from "../context/LoadingContext";
import popularBlogs from "../data/popularBlogs";
import React from 'react';
import Loader from "../components/Loader";

export default function Home() {
    const { isLoading, dispatch } = React.useContext(LoadingContext);
    // const { allBlogs:latestBlogs, dispatch:blogsDispatch } = React.useContext(BlogsContext);
    const [latestBlogs, setLatestBlogs] = React.useState([]);

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

    // Fetch the needed data
    React.useEffect(() => {
        fetchLatest();
    }, [])

    return (
        <div>
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