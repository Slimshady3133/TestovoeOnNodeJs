import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apiUser from '../../App/api/apiUser';

import { State, User } from './Types/types';

const initialState: State = {
  user: {},
  message: undefined,
};

export const registrUser = createAsyncThunk('user/registr', (newUser: User) =>
  apiUser.regUser(newUser)
);

export const loginUser = createAsyncThunk('user/login', (users: User) =>
  apiUser.loginUser(users)
);

export const checkUser = createAsyncThunk('user/check', () => apiUser.getCheckUser());
export const LogoutCheck = createAsyncThunk('user/logout', () => apiUser.Logout());
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registrUser.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.user = action.payload.user;
        } else {
          state.message = action.payload.message;
        }
      })
      .addCase(registrUser.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.user = action.payload.user;
        } else {
          state.message = action.payload.message;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.user = action.payload.user;
        } else {
          state.message = action.payload.message;
        }
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(LogoutCheck.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(LogoutCheck.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});

export default userSlice.reducer;
