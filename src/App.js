import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getDoc } from "firebase/firestore";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import HomePage from "./pages/homepage/homepage.component";
import PostPage from "./pages/post/post-page.component";
import ProfilePage from "./pages/profile/profile-page.component";
import Navbar from "./components/navbar/navbar.component";
import { signInSuccess } from "./redux/user/user.actions";
import "./App.css";
import { selectCurrentUser } from "./redux/user/user.selectors";

function App() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      console.log(`userAuth`, userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        const userSnapshot = await getDoc(userRef);
        const currentUser = { id: userSnapshot.id, ...userSnapshot.data() };
        console.log(currentUser);
        dispatch(signInSuccess(currentUser));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/profile"
          render={() => (currentUser ? <ProfilePage /> : <Redirect to="/" />)}
        />
        <Route path="/post" component={PostPage} />
      </Switch>
    </div>
  );
}

export default App;
