import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    createComment: (state, action) => {
      state.push(action.payload);
      console.log(JSON.parse(JSON.stringify(state)));
    },
    appendComment: (state, action) => {
      state.push(action.payload);
    },
    setComments: (state, action) => {
      return action.payload;
    },
  },
});

export const { createComment, setComments, appendComment } =
  commentSlice.actions;

export default commentSlice.reducer;
