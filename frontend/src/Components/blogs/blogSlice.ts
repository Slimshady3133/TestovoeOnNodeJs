import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../App/api/apiBlog';
import { State, Blog, BlogId } from './Types/types';

const initialState: State = {
  blogs: [],
  message: undefined,
};

export const initBlogs = createAsyncThunk('blogs/load', async () => api.loadBlogs());

export const deletePosts = createAsyncThunk('blogs/delete', (id: BlogId) =>
  api.delBlogs(id)
);
export const updateDPost = createAsyncThunk('blogs/update', (post: Blog) =>
  api.updateBlogs(post)
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      .addCase(initBlogs.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(deletePosts.fulfilled, (state, action) => {
        const arr = state.blogs.filter((post) => post.id !== action.payload);
        state.blogs = arr;
      })

      .addCase(deletePosts.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(updateDPost.fulfilled, (state, action) => {
        state.blogs = state.blogs.map((post) =>
          post.id === action.payload.id ? action.payload : post
        );
      })
      .addCase(updateDPost.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});

export default blogSlice.reducer;
