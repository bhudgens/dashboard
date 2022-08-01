// vim: ft=javascriptreact
import React from 'react'
import './sidebar.css'
import { BsCalendar, BsGear, BsPersonCircle } from 'react-icons/bs'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default function Sidebar() {
    const links = [
        {
            icon: <BsPersonCircle />,
            name: 'Customers',
            url: '/customers',
        },
        {
            icon: <BsCalendar />,
            name: 'Appointments',
            url: '/appointments',
        },
        {
            icon: <BsGear />,
            name: 'Settings',
            url: '/settings',
        },
    ]
    return (
        <div className="d-flex flex-column align-items-center align-items-md-start pt-2 text-white min-vh-100 bg-dark">
            <ul className="nav nav-pills flex-column navbar-dark w-100">
                {links.map((link) => (
                    <li className="nav-item">
                        <LinkContainer to={link.url}>
                            <Nav.Link
                                className="text-white ps-xxl-2"
                                href={link.url}
                            >
                                {link.icon}
                                <span className="align-middle ms-2 d-none d-lg-inline">
                                    {link.name}
                                </span>
                            </Nav.Link>
                        </LinkContainer>
                    </li>
                ))}
            </ul>
        </div>
    )
}
