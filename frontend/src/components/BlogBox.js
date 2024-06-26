import React from 'react';
import './BlogBox.css'; // Import the CSS file

export default function BlogBox({ blog }) {
    const { title, author, category, date } = blog;

    return (
        <div className="blog-box--container">
            <div className="blog-box--img"></div>
            <p className="blog-box-category">{category}</p>
            <h6 className="blog-box-title">{title}</h6>
            <div className="blog-box--info">
                <p>{author}</p>
                <p>{date}</p>
            </div>
        </div>
    )
}
