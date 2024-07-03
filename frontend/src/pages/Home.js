import HomeBlogs from "../components/HomeBlogs";
import RevealOnScroll from "../components/RevealOnScroll";
import { LoadingContext } from "../context/LoadingContext";
// import blogs from "../data/blogs";
import React from 'react';
import { LatestBlogsContext } from "../context/LatestBlogsContext";

export default function Home() {
    const { dispatch } = React.useContext(LoadingContext);
    const { latestBlogs:blogs, dispatch:latestBlogsDispatch } = React.useContext(LatestBlogsContext);
    // const { allBlogs:latestBlogs, dispatch:blogsDispatch } = React.useContext(BlogsContext);
    const [latestBlogs, setLatestBlogs] = React.useState([]);
    const [popularBlogs, setPopularBlogs] = React.useState([]);

    console.log(blogs)

    // Fetch latest blogs
    const fetchLatest = async () => {
        try {
            dispatch({ type: 'LOAD' });
            const res = await fetch('/blogs/');
            const data = await res.json();

            if (res.ok) {
                latestBlogsDispatch({ type: 'SET_LATEST', blogs: data });
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
                    blogs={blogs}
                />
            </RevealOnScroll>
            
            <RevealOnScroll>
                <HomeBlogs
                    title="Popular Blogs"
                    blogs={popularBlogs}
                />
            </RevealOnScroll>

            {/* {isLoading && <Loader />} */}
        </div>
    )
}