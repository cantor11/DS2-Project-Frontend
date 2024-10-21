import React, { useState } from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import "../../../App.css";

const Navigation = ({ handleSearch, handleLogout }) => {
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
                <CDBSidebar textColor="#333" backgroundColor="#e9ebec">
                    <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
                        Gerente
                    </CDBSidebarHeader>
                    <CDBSidebarContent>
                        <CDBSidebarMenu>
                            <NavLink exact to="/manage_users" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="user">Gestion usuarios</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/manage_products" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="table">Gestion de obras</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/dashboard" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="chart-bar">Dashboard</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/text_reports" activeClassName="activeClicked">
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

export default Navigation;