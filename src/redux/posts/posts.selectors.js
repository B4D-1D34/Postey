import { createSelector } from "reselect";

const selectPosts = (state) => state.posts;

export const selectCurrentPosts = createSelector(
  [selectPosts],
  (posts) => posts.posts
);
