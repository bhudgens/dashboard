// vim: ft=javascriptreact
import React from "react";
import "./topbar.css";
import { Badge, Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BsBell } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";

export default function Topbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/home">
          <Navbar.Brand href="/home">Business Name</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/home">
              <Nav.Link href="/home">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/link">
              <Nav.Link href="/link">Link</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link className="topNotificationIcon">
              <BsBell />
              <Badge pill bg="danger">
                2
              </Badge>
            </Nav.Link>
            <NavDropdown title="Account" id="login-dropdown"></NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
