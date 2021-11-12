import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getDoc } from "firebase/firestore";

import {
  auth,
  createUserProfileDocument,
  getDbPosts,
} from "./firebase/firebase.utils";
import HomePage from "./pages/homepage/homepage.component";
import PostPage from "./pages/post/post-page.component";
import ProfilePage from "./pages/profile/profile-page.component";
import Navbar from "./components/navbar/navbar.component";
import { signInSuccess, updateFailure } from "./redux/user/user.actions";
import "./App.css";
import { selectCurrentUser } from "./redux/user/user.selectors";
import NotificationBox from "./components/notification-box/notification-box.component";
import {
  fetchPostsFailure,
  fetchPostsSuccess,
} from "./redux/posts/posts.actions";
import PostNotFound from "./components/post-not-found/post-not-found.component";
import UpBackButton from "./components/up-back-button/up-back-button.component";

function App() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    getDbPosts()
      .then((posts) => dispatch(fetchPostsSuccess(posts)))
      .catch((err) => dispatch(fetchPostsFailure(err)));

    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      console.log(`userAuth`, userAuth);
      if (userAuth) {
        try {
          const userRef = await createUserProfileDocument(userAuth);
          const userSnapshot = await getDoc(userRef);
          const currentUser = { id: userSnapshot.id, ...userSnapshot.data() };
          console.log(currentUser);
          dispatch(signInSuccess({ currentUser, userAuth }));
        } catch (err) {
          dispatch(
            updateFailure({
              message: "Something is wrong, check your internet connection",
            })
          );
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="page">
        <UpBackButton />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/profile"
            render={() => (currentUser ? <ProfilePage /> : <Redirect to="/" />)}
          />
          <Route path="/post/:postId" component={PostPage} />
          <Route path="*" component={PostNotFound} />
        </Switch>
      </div>
      <NotificationBox />
    </div>
  );
}

export default App;
