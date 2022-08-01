// vim: ft=javascriptreact

/************************************************************
 * React
 ***********************************************************/
import React from 'react'
import { Route, Routes } from 'react-router-dom'

/************************************************************
 * CSS
 ***********************************************************/
import './app.css'

/************************************************************
 * UI
 ***********************************************************/
import {Container} from 'react-bootstrap'

/************************************************************
 * Page Imports
 ***********************************************************/
import Topbar from './components/topbar/Topbar'
import Sidebar from './components/sidebar/Sidebar'
import Customers from './pages/customers/Customers'
import Settings from './pages/settings/Settings'
import Appointments from './components/appointments/Appointments'

const App = () => (
    <div>
        <div className="sticky-top">
            <Topbar />
        </div>
        <Container fluid className="p-0 m-0 flex-nowrap row">
            <div className="sidebar col col-auto col-xxl-1 col-xl-2 col-lg-3 d-none d-md-inline p-0">
                <Sidebar />
            </div>
            <div className="main col p-0">
                <Routes>
                    <Route index element={<Appointments />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/sidebar" element={<Sidebar />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </Container>
    </div>
)

export default App
