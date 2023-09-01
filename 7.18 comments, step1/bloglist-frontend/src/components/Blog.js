import { useDispatch, useSelector } from "react-redux";
import { increaseBlogLike, deleteBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import { useParams, useNavigate } from "react-router-dom";
import commentService from "../services/comments";

//
const Blog = () => {
  //
  const id = useParams().id;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [blog] = useSelector((state) => {
    return [...state.blogs].filter((blog) => blog.id === id);
  });
  const user = useSelector((state) => state.user.username);

  // console.log("blogs", blog);
  // console.log("user", user);

  const buttonStyle = {
    backgroundColor: "#4dabf7",
    borderRadius: "10%",
    paddingLeft: "5px",
    paddingRight: "5px",
  };

  const deleteStyle = {
    backgroundColor: "red",
    borderRadius: "10%",
    paddingLeft: "5px",
    paddingRight: "5px",
  };

  const handleLikes = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog?.likes + 1,
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
        navigate("/blogs");
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div className="blog">
      <div>
        <h2>
          {blog?.title} by {blog?.author}
        </h2>
        <br />
        <a href={blog?.url}>{blog?.url}</a>
        <div>
          {blog?.likes} likes{" "}
          <button style={buttonStyle} onClick={() => handleLikes()}>
            like
          </button>
          <p>
            added by <strong>{blog?.user.username}</strong>
          </p>
          <br />
          <div>
            <h5>comments</h5>
          </div>
          <br />
          <div>
            <div>
              {blog?.user.username === user ? (
                <div>
                  <button onClick={() => handleDelete()} style={deleteStyle}>
                    delete
                  </button>{" "}
                  <span>post</span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
