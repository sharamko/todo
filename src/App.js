import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from './components/Loader';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import Header from './components/Header';
import { setUser, setUserInfo } from './store/slice';

import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user != null) {
        dispatch(setUser(auth.currentUser));
        const userInfo = {
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          userId: auth.currentUser.uid,
        };

        const beUser = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (!beUser.exists()) {
          await setDoc(doc(db, 'users', auth.currentUser.uid), userInfo);
          dispatch(setUserInfo(userInfo));
        } else {
          dispatch(setUserInfo(beUser.data()));
        }
      }
    });
  }, [auth]);

  const [_, loading] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
