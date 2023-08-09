import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import { setBlogs } from "./reducers/blogReducer";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => a.likes - b.likes),
  );

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, []);

  let loggeduser;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);

      blogService.setToken(user.Token);
    }
  }, []);

  const handleLogout = () => {
    // remove user from localStorage and log out the user
    window.localStorage.removeItem("loggedBlogAppUser");
    // Redirect the user to the login page
    window.location.href = "/login";
  };

  loggeduser = window.localStorage.getItem("loggedBlogAppUser");
  const name = JSON.parse(loggeduser)?.name;

  const toggleFn = (fn) => fn();
  const increaseLikes = (fn) => fn();

  return (
    <div>
      {!user && <LoginForm setUser={setUser} />}
      {user && (
        <div>
          <h2>blogs</h2>
          <Notification />
          <div>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </div>
          <br />
          <BlogForm setUser={setUser} />
          <br />
          <div>
            {blogs.map((blog) => (
              <Blog
                updateLikes={blogService.update}
                deleteBlog={blogService.del}
                key={blog.id}
                blog={blog}
                user={name}
                toggleFn={toggleFn}
                onIncreaseLikes={increaseLikes}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
