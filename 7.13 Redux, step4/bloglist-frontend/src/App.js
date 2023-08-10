import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import { setBlogs } from "./reducers/blogReducer";
import LoginForm from "./components/LoginForm";
import { getUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => a.likes - b.likes),
  );

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // console.log("App user", user);
      dispatch(getUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    // remove user from localStorage and log out the user
    window.localStorage.removeItem("loggedBlogAppUser");
    // Redirect the user to the login page
    window.location.href = "/login";
  };

  return (
    <div>
      {!user?.name && <LoginForm />}
      {user?.name && (
        <div>
          <h2>blogs</h2>
          <Notification />
          <div>
            {user?.name} logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </div>
          <br />
          <BlogForm />
          <br />
          <div>
            {blogs?.map((blog) => (
              <Blog key={blog.id} blog={blog} user={user?.name} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
