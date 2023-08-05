import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAlert: false,
  message: "",
  className: "",
};

const notificatiobSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      const message = action.payload;
      const showAlert = true;

      if (message === "Wrong username or password") {
        // console.log(JSON.parse(JSON.stringify(state)));
        return {
          ...state,
          showAlert: showAlert,
          message: message,
          className: "error",
        };
      } else {
        // console.log(JSON.parse(JSON.stringify(state)));
        return {
          ...state,
          showAlert: showAlert,
          message: message,
          className: "success",
        };
      }
    },
    hideNotification: (state, _action) => {
      const message = initialState.message;
      const showAlert = false;
      // console.log(JSON.parse(JSON.stringify(state)));
      return { ...state, showAlert: showAlert, message: message };
    },
  },
});

export const { showNotification, hideNotification } = notificatiobSlice.actions;
export default notificatiobSlice.reducer;
