import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function BlogBoxUser() {
    const blog = {
        title: "Title",
        category: "Health",
        content: ["hi", "hi", "hi", "hi"],
        date: new Date(Date.now())
    }

    // Delete a blog
    const deleteBlog = async () => {
        try {
            await axios.delete(`/blogs/deleteBlog/${id}`);
        } catch (error) {
            console.log(error);
        }
    }

    function handleDelete(event) {
        event.preventDefault();
        
    }

    return (
        <Link className="blog-box-user--container" state={{ blog }} to="/blog">
            <div className="img-container--box-user"></div>

            <div className="box-user--info">
                <div className="box-user-full-title">
                    <div className="box-user-title">
                        <h1 className="blog-box-title">Title of the blog</h1>
                        <div className="blog-box-category">Technology</div>
                    </div>
                    <div>
                        <Link to="/write" state={{ blog }}>
                            <span className="material-symbols-outlined edit-icon" style={{ "fontSize": "1.7rem" }}>edit</span>
                        </Link>
                        {/* <Link to="/write-blog" state={{ blog }}>
                            <span className="material-symbols-outlined bin-icon">delete</span>
                        </Link> */}
                        <button onClick={(event) => handleDelete(event)}>
                            <span class="material-symbols-outlined bin-icon">delete</span>
                        </button>
                    </div>
                </div>

                <div className="box-user-date-likes">
                    <p className="blog-box-date">July 2, 2024</p>

                    <div className="likes--container">
                        <p>300</p>
                        <span className="material-symbols-rounded thumb-up thumb--clicked">thumb_up</span>
                        <p>100</p>
                        <span className="material-symbols-rounded thumb-up thumb--clicked">thumb_down</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}