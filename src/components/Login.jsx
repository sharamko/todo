import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slice';

const Login = () => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((credentials) => dispatch(setUser(credentials.user)))
      .catch((e) => console.error(e));
  };

  return (
    <Container
      style={{ height: 80 + 'vh' }}
      className="d-flex justify-content-center align-items-center"
    >
      <Button onClick={handleLogin} variant="success" size="lg">
        Увійти за допомогою Google
      </Button>
    </Container>
  );
};

export default Login;
