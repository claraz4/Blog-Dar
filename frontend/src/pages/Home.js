import HomeBlogs from "../components/HomeBlogs";
import RevealOnScroll from "../components/RevealOnScroll";
import blogs from '../data/blogs';
import popularBlogs from "../data/popularBlogs";

export default function Home() {
    return (
        <div>
            <RevealOnScroll>
                <HomeBlogs
                    title="Latest Posts"
                    blogs={blogs}
                />
            </RevealOnScroll>
            
            <RevealOnScroll>
                <HomeBlogs
                    title="Popular Posts"
                    blogs={popularBlogs}
                />
            </RevealOnScroll>
        </div>
    )
}