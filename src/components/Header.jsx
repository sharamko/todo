import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks, setUser } from '../store/slice';
import { auth, googleAuthProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.slice.user);
  const handleLogin = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((credentials) => dispatch(setUser(credentials.user)))
      .catch((e) => console.error(e));
  };
  const handleLogout = () => {
    auth.signOut();
    dispatch(setUser(null));
    dispatch(setTasks(null));
  };
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Link className="fs-4" to="/">
          Home
        </Link>
        {user ? (
          <Button
            onClick={handleLogout}
            className="login-logout"
            variant="danger"
          >
            Вихід
          </Button>
        ) : (
          <Button
            onClick={handleLogin}
            className="login-logout"
            variant="warning"
          >
            Увійти
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
