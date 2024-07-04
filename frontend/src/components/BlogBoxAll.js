import React from 'react';
import months from '../data/months';
import { Link } from "react-router-dom";
import axios from "axios";
import useAuthContext from '../hooks/useAuthContext';
import { LatestBlogsContext } from '../context/LatestBlogsContext';
import { useNavigate } from 'react-router-dom';

export default function BlogBox({ blog }) {
    const { title, author, category, datePublished } = blog;
    const { user } = useAuthContext();
    const { dispatch } = React.useContext(LatestBlogsContext);
    const date = new Date(datePublished);

    const year = date.getYear() + 1900;
    const month = date.getMonth();
    const day = date.getDate();

    const navigate = useNavigate();

    async function handleLike(event) {
        event.preventDefault();

        try {
            await axios.post('/blogs/like', {
                _id: blog._id
              }, {
                headers: {
                  "Authorization": `Bearer ${user.token}`
                }
              });
              dispatch({ type: 'UPDATE_LIKE', blog_id: blog._id, user_id: user.id})
            } catch (error) {
                if (!user) {
                    navigate('/signInUp');
                } else {
                    console.log(error);
                }
            }
        }
        
        async function handleDislike(event) {
            event.preventDefault();
            
            try {
                await axios.post('/blogs/dislike', {
                    _id: blog._id
                }, {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                });
                dispatch({ type: 'UPDATE_DISLIKE', blog_id: blog._id, user_id: user.id})
            } catch (error) {
                if (!user) {
                    navigate('/signInUp');
                } else {
                    console.log(error);
                }
            }
    }
  
    return (
        <Link className="blog-box--container blog-box-all--container" state={{ blog }} to="/blog">
            <div className="blog-box--img blog-box-all--img"></div>
            <div className="blog-box--info-post blog-box-all--info-post">
                
                <div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
                        <div>
                            <p className="blog-box-category blog-box-all-category">{category}</p>
                            <h6 className="blog-box-title blog-box-all-title">{title}</h6>
                        </div>
                        <div className="likes--container">
                            <p>{blog.likedby.length}</p>
                            <span className={`material-symbols-rounded thumb-up${user && blog.likedby.includes(user.id) ? " thumb--clicked" : ""}`} onClick={handleLike}>thumb_up</span>
                            <p>{blog.dislikedby.length}</p>
                            <span className={`material-symbols-rounded thumb-up${user && blog.dislikedby.includes(user.id) ? " thumb--clicked" : ""}`} onClick={handleDislike}>thumb_down</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="blog-box--info blog-box-all--info">
                        <p className="blog-box-author">{author}</p>
                        <p className="blog-box-date">{`${months[month]} ${day}, ${year}`}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}