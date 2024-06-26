import HomeBlogs from "../components/HomeBlogs";
import blogs from '../data/blogs';

export default function Home() {
    return (
        <div>
            <p style={{ fontSize: '30px', textAlign: 'center' }}> Recent posts</p>
            <HomeBlogs
                blogs={blogs}
            />
            <p style={{ fontSize: '30px', textAlign: 'center' }}> Popular posts</p>
            <HomeBlogs
                blogs={blogs}
            />
        </div>
    )
}