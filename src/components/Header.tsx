import type React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { GiKimono } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <Navbar className="header" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <GiKimono /> Jiu Academy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">
              Alunos
            </Nav.Link>
            <Nav.Link as={Link} to="/cadastro">
              Cadastrar
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
