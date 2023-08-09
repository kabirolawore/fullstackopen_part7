import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../reducers/blogReducer";

//
const Blog = ({
  blog,
  user,
  updateLikes,
  deleteBlog,
  toggleFn,
  onIncreaseLikes,
}) => {
  //
  const [isHidden, setIsHidden] = useState(true);
  const [likes, setLikes] = useState(blog.likes || 0);
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

  const handleLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    try {
      updateLikes(blog.id, updatedBlog);
      setLikes((likes) => likes + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title}? by ${blog.author}`))
      try {
        deleteBlog(blog.id) &&
          dispatch(setBlogs(blogs.filter((b) => b.id !== blog.id)));
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
          onClick={() => toggleFn(toggleDetails)}
        >
          {isHidden ? "view" : "hide"}
        </button>
      </div>
      {!isHidden && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes <span className="likes-count">{likes} </span>
            <button
              id="likes"
              data-testid="like-button"
              onClick={() => onIncreaseLikes(handleLikes)}
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
