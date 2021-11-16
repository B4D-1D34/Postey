import PostsActionTypes from "./posts.types";

const INITIAL_STATE = {
  posts: null,
  err: null,
};

const postsReducer = (state = INITIAL_STATE, action) => {
  const posts = state.posts;

  switch (action.type) {
    case PostsActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        err: null,
      };
    case PostsActionTypes.FETCH_POSTS_FAILURE:
    case PostsActionTypes.POST_UPDATE_FAILURE:
      return {
        ...state,
        err: action.payload,
      };
    case PostsActionTypes.POST_UPDATE_SUCCESS:
      return {
        ...state,
        posts: { ...posts, [action.payload.id]: { ...action.payload.data } },
      };
    case PostsActionTypes.POST_DELETE:
      return {
        ...state,
        posts: Object.keys(posts)
          .filter((key) => key !== action.payload)
          .reduce((acc, key) => {
            return (acc = { ...acc, [key]: posts[key] });
          }, {}),
      };
    case PostsActionTypes.COMMENT_UPDATE:
      const { data } = action.payload;
      return {
        ...state,
        posts: {
          ...posts,
          [data.postId]: {
            ...posts[data.postId],
            comments: {
              ...posts[data.postId].comments,
              [data.commentId]: {
                ...data.comment.data,
              },
            },
          },
        },
      };
    case PostsActionTypes.COMMENT_DELETE:
      const { postId, commentId } = action.payload;
      return {
        ...state,
        posts: {
          ...posts,
          [postId]: {
            ...posts[postId],
            comments: Object.keys(posts[postId].comments)
              .filter((key) => key !== commentId)
              .reduce((acc, key) => {
                return (acc = { ...acc, [key]: posts[postId].comments[key] });
              }, {}),
          },
        },
      };
    default:
      return state;
  }
};

export default postsReducer;
