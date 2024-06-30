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
        <Link className="blog-box--container blog-box-all--container" state={{ blog }} to="/blog">
            <div className="blog-box--img blog-box-all--img"></div>
            <div className="blog-box--info-post blog-box-all--info-post">
                
                <div>
                    <p className="blog-box-category blog-box-all-category">{category}</p>
                    <h6 className="blog-box-title blog-box-all-title">{title}</h6>
                </div>

                <div>
                    <div className="blog-box--info blog-box-all--info">
                        <p className="blog-box-author">{author}</p>
                        <p className="blog-box-date">{`${months[month]} ${day}, ${year}`}</p>
                    </div>

                    <div className="likes--container likes-all--container">
                        <span className="material-symbols-rounded thumb-up">thumb_up</span>
                        <span className="material-symbols-rounded thumb-up">thumb_down</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}