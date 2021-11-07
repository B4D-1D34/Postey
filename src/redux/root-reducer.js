import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import postsReducer from "./posts/posts.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

export default rootReducer;
