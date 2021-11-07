import PostsActionTypes from "./posts.types";

export const fetchPostsSuccess = (posts) => ({
  type: PostsActionTypes.FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = (error) => ({
  type: PostsActionTypes.FETCH_POSTS_FAILURE,
  payload: error,
});
