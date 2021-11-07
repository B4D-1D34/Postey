import PostsActionTypes from "./posts.types";

const INITIAL_STATE = {
  posts: null,
  err: null,
};

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PostsActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        err: null,
      };
    case PostsActionTypes.FETCH_POSTS_FAILURE:
      return {
        ...state,
        err: action.payload,
      };

    default:
      return state;
  }
};

export default postsReducer;
