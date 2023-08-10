import { useRef } from "react";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import Togglable from "./Togglable";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({ setUser }) => {
  //

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();

    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;

    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    event.target.author.value = "";
    event.target.url.value = "";
    event.target.title.value = "";

    const newBlog = await blogService.create(blogObject);
    dispatch(createBlog(newBlog));
    setUser(newBlog?.user);

    if (newBlog.title) {
      dispatch(
        showNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
        ),
      );
    }
  };

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>Create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input id="title" name="title" placeholder="write title" />
          </div>
          <div>
            author:
            <input id="author" name="author" placeholder="write author" />
          </div>
          <div>
            url:
            <input id="url" name="url" placeholder="write url" />
          </div>
          <button id="create-button" type="submit">
            create
          </button>
        </form>
      </Togglable>
    </div>
  );
};

export default BlogForm;
