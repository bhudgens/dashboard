// vim: ft=javascriptreact

import React from 'react'

/************************************************************
 * Page Imports
 ***********************************************************/
import Topbar from './components/topbar/Topbar'
import Sidebar from './components/sidebar/Sidebar'
import Home from './pages/home/Home'
import Customers from './pages/customers/Customers'
import CustomerView from './pages/customer-view/CustomerView'

/************************************************************
 * CSS
 ***********************************************************/
import './app.css'
import { Route, Routes } from 'react-router-dom'
import {Container} from 'react-bootstrap'

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
                    <Route index element={<CustomerView />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/sidebar" element={<Sidebar />} />
                    <Route path="/customer-view" element={<CustomerView />} />
                </Routes>
            </div>
        </Container>
    </div>
)

export default App
