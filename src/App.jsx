// vim: ft=javascriptreact
// import React, { useState } from "react";
import React from "react";

import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import Customers from "./pages/customers/Customers";
import "./app.css";
import { Route, Routes } from "react-router-dom";
import { Redirect } from "react-router-dom";

const App = () => (
  <div>
    <Topbar />
    <div className="content">
      <Sidebar />
      <Routes>
        <Route index element={<Customers />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </div>
  </div>
);

export default App;
