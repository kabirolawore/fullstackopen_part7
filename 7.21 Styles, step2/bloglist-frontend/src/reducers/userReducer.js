import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    getUser: (state, action) => {
      // console.log("reducer", JSON.parse(JSON.stringify(action.payload)));
      return action.payload;
    },
  },
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
