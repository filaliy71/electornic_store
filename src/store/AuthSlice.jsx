import { createSlice } from "@reduxjs/toolkit";
import users from "../Users";

const initialState = {
  users,
  isAuth: false,
  currentUser: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      const data = action.payload;
      const foundUser = state.users.find(
        (user) => user.username === data.username && user.pass === data.pass
      );

      if (foundUser) {
        state.isAuth = true;
        state.currentUser = foundUser;
      } else {
        state.isAuth = false;
        state.currentUser = null;
      }
    },
    logout(state) {
      state.isAuth = false;
      state.currentUser = null;
    },
    insc(state, action) {
      const data = action.payload;
      const find = state.users.find(
        (user) => user.username === data.username && user.pass === data.pass
      );
      if (!find) {
        let id = state.users[state.users.length - 1].id + 1;
        state.users.push({ id: id, username: data.username, pass: data.pass });
      }
    },
    edit(state, action) {
      const data = action.payload;
      const findUser = state.users.find(
        (user) => user.username == data.username || user.pass == data.oldPass
      );
      if (findUser) {
        findUser.pass = data.newPass;
      }
      console.log(findUser.pass);
    },
  },
});
export const { login, logout, insc, edit } = AuthSlice.actions;
export { AuthSlice };
