import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "./reducers/notificationReducer";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      dispatch(showNotification("Login Successful"));
      setUsername("");
      setPassword("");
      // console.log();
    } catch (exception) {
      dispatch(showNotification("Wrong username or password"));
      // setTimeout(() => {
      //   setErrorMessage(null);
      // }, 5000);
    }
  };

  const handleLogout = () => {
    // remove user from localStorage and log out the user
    window.localStorage.removeItem("loggedBlogAppUser");

    // Redirect the user to the login page
    window.location.href = "/login";
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setUser(returnedBlog.user);

      if (returnedBlog.title) {
        dispatch(
          showNotification(
            `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          ),
        );

        // setTimeout(() => {
        //   setSuccessMessage(null);
        // }, 5000);
      }
    });
  };

  const blogFormRef = useRef();

  const addBlogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const LoginForm = () => (
    <div>
      <h2>Log in to Application</h2>
      {/* <Notification className="error" message={errorMessage} /> */}
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username{" "}
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );

  loggeduser = window.localStorage.getItem("loggedBlogAppUser");
  const name = JSON.parse(loggeduser)?.name;

  blogs.sort((a, b) => a.likes - b.likes);

  const toggleFn = (fn) => {
    fn();
  };

  const increaseLikes = (fn) => {
    fn();
  };

  return (
    <div>
      {!user && LoginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          {/* <Notification className="success" message={successMessage} /> */}
          <Notification />
          <div>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </div>
          <br />
          {addBlogForm()}
          <br />
          <div>
            {blogs.map((blog) => (
              <Blog
                updateLikes={blogService.update}
                deleteBlog={blogService.del}
                key={blog.id}
                blog={blog}
                user={name}
                blogs={blogs}
                setBlogs={setBlogs}
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
