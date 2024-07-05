import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";
import months from "../data/months";
import { UserBlogsContext } from "../context/UserBlogsContext";

export default function BlogBoxUser({ blog }) {
  const { user } = useAuthContext();
  const { dispatch: userBlogsDispatch } = React.useContext(UserBlogsContext);
  const date = new Date(blog.datePublished);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Delete a blog
  const deleteBlog = async () => {
    try {
      await axios.delete(`/blogs/deleteBlog/${blog._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      userBlogsDispatch({ type: "DELETE_BLOG", id: blog._id });
    } catch (error) {
      console.log(error);
    }
  };

  function handleDelete(event) {
    event.preventDefault();
    deleteBlog();
  }

  return (
    <Link className="blog-box-user--container" state={{ blog }} to="/blog">
      <div
        className="img-container--box-user"
        style={{
          backgroundImage: `url(${blog.image.image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>

      <div className="box-user--info">
        <div className="box-user-full-title">
          <div className="box-user-title">
            <h1 className="blog-box-title">{blog.title}</h1>
            <div className="blog-box-category">{blog.category}</div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "row", marginLeft: "5px" }}
          >
            <Link to="/write" state={{ blog }}>
              <span
                className="material-symbols-outlined edit-icon"
                style={{ fontSize: "1.7rem" }}
              >
                edit
              </span>
            </Link>
            {/* <Link to="/write-blog" state={{ blog }}>
                            <span className="material-symbols-outlined bin-icon">delete</span>
                        </Link> */}
            <button onClick={(event) => handleDelete(event)}>
              <span className="material-symbols-outlined bin-icon">delete</span>
            </button>
          </div>
        </div>

        <div className="box-user-date-likes">
          <p className="blog-box-date">{`${months[month]} ${day}, ${year}`}</p>

          <div className="likes--container">
            <p>{blog.likedby.length}</p>
            <span className="material-symbols-rounded thumb-up thumb--clicked">
              thumb_up
            </span>
            <p>{blog.dislikedby.length}</p>
            <span className="material-symbols-rounded thumb-up thumb--clicked">
              thumb_down
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
