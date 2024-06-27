import HomeBlogs from "../components/HomeBlogs";
import blogs from '../data/blogs';
import popularBlogs from "../data/popularBlogs";

export default function Home() {
    return (
        <div>
            <HomeBlogs
                title="Latest Blogs"
                blogs={blogs}
                addClass={""}
            />
            
            <HomeBlogs
                title="Popular Blogs"
                blogs={popularBlogs}
                addClass={"popular-blogs"}
            />
        </div>
    )
}