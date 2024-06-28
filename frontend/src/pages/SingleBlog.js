import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/single-blog.css';

export default function SingleBlog() {
    const blog = useLocation().state.blog;
    const { title, content:contentArr } = blog;

    const [content, setContent] = React.useState([]);

    React.useEffect(() => {
        setContent(() => contentArr.map((c, idx) => {
            if (idx % 2 === 0) {
                // this is a subtitle
                return <h3 className="single-blog--subtitle">{c}</h3>
            } else {
                return <p className="single-blog--p">{c}</p>
            }
        }))
    }, [])
    
    return (
        <div className="single-blog--container">
            <h1 className="single-blog--title">{title}</h1>

            <img className='single-blog--img'></img>

            <div>
                {content}
            </div>
        </div>
    )
}