import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import commentReducer from "./reducers/commentReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    comments: commentReducer,
  },
});

store.subscribe(() => {
  console.log("state", store.getState());
});

export default store;
