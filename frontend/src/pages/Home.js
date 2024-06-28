import HomeBlogs from "../components/HomeBlogs";
import RevealOnScroll from "../components/RevealOnScroll";
import { LoadingContext } from "../context/LoadingContext";
import popularBlogs from "../data/popularBlogs";
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    const [latestBlogs, setLatestBlogs] = React.useState([]);
    const { isLoading, dispatch } = React.useContext(LoadingContext);

    // Fetch latest blogs
    const fetchLatest = async () => {
        try {
            dispatch({ type: 'LOAD' });
            const res = await fetch('/blogs/');
            const data = await res.json();
            setLatestBlogs(data);
            dispatch({ type: 'STOP_LOAD' });
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

            {isLoading && 
            <div className="spinner">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>}
        </div>
    )
}