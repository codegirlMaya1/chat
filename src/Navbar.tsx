import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar: React.FC = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/">Chat App</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/chat">Chat</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
