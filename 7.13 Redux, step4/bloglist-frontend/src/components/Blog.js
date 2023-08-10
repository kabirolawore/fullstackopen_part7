import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseBlogLike, deleteBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";

//
const Blog = ({ blog, user }) => {
  //
  const [isHidden, setIsHidden] = useState(true);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  // console.log("blogs", blogs);

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    color: "green",
    marginBottom: 5,
  };

  const buttonStyle = {
    backgroundColor: "#4dabf7",
    borderRadius: "10%",
  };

  const handleLikes = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    try {
      await blogService.update(blog.id, updatedBlog);
      dispatch(increaseBlogLike(updatedBlog.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title}? by ${blog.author}`))
      try {
        blogService.del(blog.id) && dispatch(deleteBlog(blog.id));
      } catch (error) {
        console.log(error);
      }
  };

  const toggleDetails = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div style={blogStyle} className="blog">
      <div className="select">
        {blog.title} {blog.author}{" "}
        <button
          className="view-hide"
          data-testid="view-button"
          onClick={() => toggleDetails()}
        >
          {isHidden ? "view" : "hide"}
        </button>
      </div>
      {!isHidden && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes <span className="likes-count">{blog.likes} </span>
            <button
              id="likes"
              data-testid="like-button"
              onClick={() => handleLikes()}
            >
              likes
            </button>
          </div>
          <div>{blog.user.name ? blog.user.name : user}</div>
          {blog.user.name === user ? (
            <button onClick={handleDelete} style={buttonStyle}>
              remove
            </button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
