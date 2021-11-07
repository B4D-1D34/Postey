import UserActionTypes from "./user.types";

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const updateSuccess = (message) => ({
  type: UserActionTypes.UPDATE_SUCCESS,
  payload: message,
});

export const updateFailure = (error) => ({
  type: UserActionTypes.UPDATE_FAILURE,
  payload: error,
});

export const currentUserUpdate = (currentUser) => ({
  type: UserActionTypes.CURRENT_USER_UPDATE,
  payload: currentUser,
});
