import { useRef, useState } from "react";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import Togglable from "./Togglable";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({ setUser }) => {
  //
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

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
    console.log(newBlog?.user);
    setUser(newBlog?.user);

    console.log(newBlog);

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
            <input
              id="title"
              name="title"
              value={newTitle}
              onChange={({ target }) => setNewTitle(target.value)}
              placeholder="write title"
            />
          </div>
          <div>
            author:
            <input
              id="author"
              name="author"
              value={newAuthor}
              onChange={({ target }) => setNewAuthor(target.value)}
              placeholder="write author"
            />
          </div>
          <div>
            url:
            <input
              id="url"
              name="url"
              value={newUrl}
              onChange={({ target }) => setNewUrl(target.value)}
              placeholder="write url"
            />
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
