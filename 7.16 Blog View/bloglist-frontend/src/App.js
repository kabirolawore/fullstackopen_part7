import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import { setBlogs } from "./reducers/blogReducer";
import LoginForm from "./components/LoginForm";
import { getUser } from "./reducers/userReducer";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import ErrorPage from "./components/ErrorPage";

import { Routes, Route, Link } from "react-router-dom";
import User from "./components/User";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(getUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    // remove user from localStorage and log out the user
    window.localStorage.removeItem("loggedBlogAppUser");
    // Redirect the user to the login page
    window.location.href = "/";
  };

  const padding = {
    padding: 5,
  };

  return (
    <div className="container">
      <div>{!user?.name && <LoginForm />}</div>

      <div>
        {user?.name && (
          <div>
            <h1>blogs</h1>
            <Notification />
            <div>
              <p>{user?.name} logged in </p>
              <p>
                <button onClick={handleLogout}>logout</button>
              </p>
              <br />
            </div>
            <Routes>
              <Route path="/" element={<Blogs user={user} />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
            </Routes>
          </div>
        )}
      </div>
      <footer>
        <br />
        <em>Blog app, Department of Computer Science 2023</em>
      </footer>
    </div>
  );
};

export default App;
