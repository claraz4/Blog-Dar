import React from 'react';
import months from '../data/months';
import { Link } from "react-router-dom";

export default function BlogBox({ blog }) {
    const { title, author, category, datePublished } = blog;

    const year = datePublished.getYear() + 1900;
    const month = datePublished.getMonth();
    const day = datePublished.getDate();
  
    return (
        <Link className="blog-box--container" state={{ blog }} to="/blog">
            <div className="blog-box--info-post">
                <div className="blog-box--img"></div>
                <p className="blog-box-category">{category}</p>
                <h6 className="blog-box-title">{title}</h6>
            </div>

            <div className="blog-box--info">
                <p className="blog-box-author">{author}</p>
                <p className="blog-box-date">{`${months[month]} ${day}, ${year}`}</p>
            </div>
        </Link>
    )
}
