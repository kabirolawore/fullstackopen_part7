import { useDispatch } from "react-redux";
import Notification from "./Notification";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { showNotification } from "../reducers/notificationReducer";
import { getUser } from "../reducers/userReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;
    event.target.username.value = "";
    event.target.password.value = "";

    try {
      // login service
      const userLogin = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(userLogin),
      );

      blogService.setToken(userLogin?.token);
      // setUser(userLogin);
      dispatch(getUser(userLogin));
      dispatch(showNotification("Login Successful"));
    } catch (exception) {
      dispatch(showNotification("Wrong username or password"));
    }
  };

  return (
    <div>
      <h2>Log in to Application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username <input id="username" type="text" name="username" />
        </div>
        <div>
          password <input id="password" type="password" name="password" />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
