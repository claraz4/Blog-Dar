import React from 'react';
import months from '../data/months';
import { Link } from "react-router-dom";

export default function BlogBox({ blog }) {
    const { title, author, category, datePublished } = blog;
    const date = new Date(datePublished);

    const year = date.getYear() + 1900;
    const month = date.getMonth();
    const day = date.getDate();
  
    return (
        <Link className="blog-box--container" state={{ blog }} to="/blog">
            <div className="blog-box--info-post">
                <div className="blog-box--img"></div>
                <div className="category-likes--container">
                    <p className="blog-box-category">{category}</p>
                    <div className="likes--container">
                        <span className="material-symbols-rounded thumb-up">thumb_up</span>
                        <span className="material-symbols-rounded thumb-up">thumb_down</span>
                    </div>
                </div>
                <h6 className="blog-box-title">{title}</h6>
            </div>

            <div className="blog-box--info">
                <p className="blog-box-author">{author}</p>
                <p className="blog-box-date">{`${months[month]} ${day}, ${year}`}</p>
            </div>
        </Link>
    )
}