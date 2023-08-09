import { useDispatch } from "react-redux";
import Notification from "./Notification";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { showNotification } from "../reducers/notificationReducer";
import { useState } from "react";

const LoginForm = ({ setUser }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);

  // let loggeduser;

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");

  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON);
  //     setUser(user);

  //     blogService.setToken(user.Token);
  //   }
  // }, []);

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
    } catch (exception) {
      dispatch(showNotification("Wrong username or password"));
    }
  };

  // loggeduser = window.localStorage.getItem("loggedBlogAppUser");
  // const name = JSON.parse(loggeduser)?.name;

  return (
    <div>
      <h2>Log in to Application</h2>
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
};

export default LoginForm;
