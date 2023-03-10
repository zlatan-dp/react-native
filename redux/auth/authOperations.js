// import fb from "../../firebase/config";
import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { authSlice } from "./authReducer";

export const authSignUp =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    console.log(email, password);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
      });

      const { displayName, uid } = await auth.currentUser;
      console.log(authSlice);

      dispatch(
        authSlice.actions.updateUser({ userId: uid, login: displayName })
      );
    } catch (error) {
      console.log(error);
    }
  };
export const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    console.log(email, password);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
export const authSignOut = () => async (dispatch, getState) => {
  signOut(auth);
  dispatch(authSlice.actions.authSignOut());
};

export const onAuthStateChanged = () => async (dispatch, getState) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        authSlice.actions.updateUser({
          userId: user.uid,
          login: user.displayName,
        })
      );
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};
