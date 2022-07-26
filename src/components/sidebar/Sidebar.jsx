// vim: ft=javascriptreact
import React from 'react'
import './sidebar.css'
import { BsPersonCircle, BsSpeedometer2 } from 'react-icons/bs'
import { Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Sidebar = (props) => {
    return (
        <div className="sidebar d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
            <ul className="nav nav-pills flex-column navbar-dark">
                <li>
                    <LinkContainer to="/home">
                        <Nav.Link className="text-white" href="/home">
                            Home
                        </Nav.Link>
                    </LinkContainer>
                </li>
                <li>
                    <LinkContainer to="/customers">
                        <Nav.Link className="text-white" href="/customers">
                            <BsPersonCircle className="me-2" />
                            <span style={{ verticalAlign: 'middle' }}>
                                Customers
                            </span>
                        </Nav.Link>
                    </LinkContainer>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
