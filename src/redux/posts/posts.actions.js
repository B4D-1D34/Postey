import PostsActionTypes from "./posts.types";

export const fetchPostsSuccess = (posts) => ({
  type: PostsActionTypes.FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = (error) => ({
  type: PostsActionTypes.FETCH_POSTS_FAILURE,
  payload: error,
});

export const postUpdateSuccess = (post) => ({
  type: PostsActionTypes.POST_UPDATE_SUCCESS,
  payload: post,
});

export const postUpdateFailure = (error) => ({
  type: PostsActionTypes.POST_UPDATE_FAILURE,
  payload: error,
});

export const postDelete = (postId) => ({
  type: PostsActionTypes.POST_DELETE,
  payload: postId,
});

export const commentDelete = (postIdAndcommentId) => ({
  type: PostsActionTypes.COMMENT_DELETE,
  payload: postIdAndcommentId,
});
