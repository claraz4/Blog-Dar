import HomeBlogs from "../components/HomeBlogs";
import blogs from '../data/blogs';
import popularBlogs from "../data/popularBlogs";

export default function Home() {
    return (
        <div>
            <HomeBlogs
                title="Latest Posts"
                blogs={blogs}
            />
            
            <HomeBlogs
                title="Popular Posts"
                blogs={popularBlogs}
            />

            
        </div>
    )
}