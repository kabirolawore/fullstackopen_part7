import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog: (state, action) => {
      state.push(action.payload);

      // console.log(JSON.parse(JSON.stringify(state)));
    },
    increaseBlogLike: (state, action) => {
      const id = action.payload;

      const blogTochange = state.find((n) => n.id === id);

      const changedBlog = {
        ...blogTochange,
        likes: blogTochange.likes + 1,
      };

      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },
    deleteBlog: (state, action) => {
      const id = action.payload;
      return [...state].filter((blog) => blog.id !== id);
    },
    appendBlog: (state, action) => {
      state.push(action.payload);
    },
    setBlogs: (_state, action) => action.payload,
  },
});

export const {
  createBlog,
  setBlogs,
  appendBlog,
  increaseBlogLike,
  deleteBlog,
} = blogSlice.actions;

export default blogSlice.reducer;
