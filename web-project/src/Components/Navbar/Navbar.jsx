import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import navbarCSS from './Navbar.module.css';

const NavbarComponent = ({ handleSpecializationChange, handleLocationChange }) => {
  const handleClick = (specialization) => {
    handleSpecializationChange(specialization);
  };

  const handleLocation = (location) => {
    handleLocationChange(location); // Pass the selected location to the parent component
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>OlaDoc</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/Home">Home</Nav.Link>
              <NavDropdown title="Doctors" id="doctor-dropdown">
                <NavDropdown.Item href="/Doctor" onClick={() => handleClick("Dermatologist")}>Dermatologists</NavDropdown.Item>
                <NavDropdown.Item href="/Doctor" onClick={() => handleClick("Neurologist")}>Neurologists</NavDropdown.Item>
                <NavDropdown.Item href="/Doctor" onClick={() => handleClick("Psychiatrist")}>Psychiatrists</NavDropdown.Item>
                <NavDropdown.Item href="/Doctor" onClick={() => handleClick("Pediatrician")}>Pediatricians</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/Hospital">Hospitals</Nav.Link>

              <Nav.Link href="/Contact">Contact</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/" className={navbarCSS.logoutButton}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
