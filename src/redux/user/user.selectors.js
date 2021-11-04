import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectUserAuth = createSelector(
  [selectUser],
  (user) => user.userAuth
);

export const selectUserNotification = createSelector(
  [selectUser],
  (user) => user.notification
);

export const selectError = createSelector([selectUser], (user) => user.error);
