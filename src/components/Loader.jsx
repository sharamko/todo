import React from 'react';
import { Container } from 'react-bootstrap';

const Loader = () => {
  return (
    <Container
      style={{ height: 80 + 'vh' }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="lds-dual-ring"></div>
    </Container>
  );
};

export default Loader;
