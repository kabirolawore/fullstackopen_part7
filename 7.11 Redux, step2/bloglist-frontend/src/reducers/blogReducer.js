import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog: (state, action) => {
      state.push(action.payload);

      // console.log(JSON.parse(JSON.stringify(state)));
    },
    appendBlog: (state, action) => {
      state.push(action.payload);
    },
    setBlogs: (_state, action) => action.payload,
  },
});

export const { createBlog, setBlogs, appendBlog } = blogSlice.actions;

export default blogSlice.reducer;
