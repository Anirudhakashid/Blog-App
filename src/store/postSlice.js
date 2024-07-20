import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost: (state, action) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => {
        post.id !== action.payload;
      });
    },
    getPosts:(state,action)=>{
        state.posts
    }
  },
});

export const { createPost, deletePost,getPosts } = postsSlice.actions;

export default postsSlice.reducer;
