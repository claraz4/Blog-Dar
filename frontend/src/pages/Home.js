import HomeBlogs from "../components/HomeBlogs";
import blogs from '../data/blogs';

export default function Home() {
    return (
        <div>
            <HomeBlogs
                title="Latest Posts"
                blogs={blogs}
            />
        </div>
    )
}