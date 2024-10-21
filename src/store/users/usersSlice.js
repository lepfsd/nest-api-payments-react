import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    addUsers: (state, action) => {
      state.users = action.payload;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
    updateUser: (state, action) => {
      const { id, name, email, username, password } = action.payload;
      const existingUser = state.users.find((user) => user._id === id);
      if (existingUser) {
        existingUser.name = name;
        existingUser.username = username;
        existingUser.email = email;
        existingUser.password = password;
      }
    },
  },
});

export const { addUser, addUsers, deleteUser, updateUser } = usersSlice.actions;

export default usersSlice.reducer;
