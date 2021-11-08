import PostsActionTypes from "./posts.types";

export const fetchPostsSuccess = (posts) => ({
  type: PostsActionTypes.FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = (error) => ({
  type: PostsActionTypes.FETCH_POSTS_FAILURE,
  payload: error,
});

export const postsUpdateSuccess = (posts) => ({
  type: PostsActionTypes.POSTS_UPDATE_SUCCESS,
  payload: posts,
});

export const postsUpdateFailure = (error) => ({
  type: PostsActionTypes.POSTS_UPDATE_FAILURE,
  payload: error,
});
