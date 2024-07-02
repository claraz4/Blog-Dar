import React from 'react';
import { LoadingContext } from '../context/LoadingContext';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';
import BlogBoxAll from "../components/BlogBoxAll";

export default function AllBlogs() {
    const { isLoading, dispatch } = React.useContext(LoadingContext);
    const [blogs, setAllBlogs] = React.useState([]);
    const [blogsElement, setBlogsElement] = React.useState([]);

    // Fetch latest blogs
    const fetchLatest = async () => {
        try {
            dispatch({ type: 'LOAD' });
            const res = await fetch('/blogs/');
            const data = await res.json();

            if (res.ok) {
                // blogsDispatch({ type: 'UPDATE', newBlogs: data });
                setAllBlogs(data);
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
        setBlogsElement(blogs.map((blog) => {
            return <BlogBoxAll blog={blog} />
        }))
    }, [])

    return (
        <div className="all-blogs--container">
            <SearchBar />
            <div className="all-blogs">
                {blogsElement}
            </div>
            {isLoading && <Loader />}
        </div>
    )
}