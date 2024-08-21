import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default class Navbar_components extends Component {
  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg='dark' color='font-white' data-bs-theme='dark'>
          <Container>
            <Navbar.Brand href="/employees">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/companies">Companies</Nav.Link>
                <Nav.Link href="/projects">Projects</Nav.Link>

                <NavDropdown title="Add" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="/add-employee">
                    Add Employee
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/add-project">
                    Add Project
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/add-company">
                    Add Company
                  </NavDropdown.Item>
                  
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/add-employee-to-project">
                    Add Employee to project
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}
