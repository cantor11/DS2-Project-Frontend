// DirectorNavigation.js
import React, { useState } from 'react';
import { CDBSidebar, CDBSidebarContent, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import "../../../App.css";

const DirectorNavigation = ({ handleSearch, handleLogout }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const onSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const onSearchSubmit = (e) => {
        e.preventDefault();
        if (typeof handleSearch === 'function') {
            handleSearch(searchTerm);
        } else {
            console.error("handleSearch is not a function");
        }
    };

    return (
        <div>
            <Navbar className="custom-navbar" expand="lg" id="my-nav">
                <Navbar.Brand className="app-logo" href="/">
                    EDIFEX
                </Navbar.Brand>
                <Form inline onSubmit={onSearchSubmit} className="ml-auto">
                    <FormControl
                        type="text"
                        placeholder="Buscar usuarios..."
                        className="mr-sm-2"
                        value={searchTerm}
                        onChange={onSearchChange}
                    />
                    <Button type="submit" variant="outline-success">Buscar</Button>
                </Form>
            </Navbar>
            <div className='sidebar'>
                <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
                    <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
                        Director
                    </CDBSidebarHeader>
                    <CDBSidebarContent>
                        <CDBSidebarMenu>
                            <NavLink exact to="/director/works" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="list">Lista de obras</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/director/manage_works" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="table">Gestión de obras</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/director/dashboard" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="chart-bar">Dashboard</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/director/text_reports" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="file-alt">Reportes de Texto</CDBSidebarMenuItem>
                            </NavLink>
                            <CDBSidebarMenuItem onClick={handleLogout} icon="sign-out-alt">Cerrar sesión</CDBSidebarMenuItem>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>
                </CDBSidebar>
            </div>
        </div>
    );
};

export default DirectorNavigation;
