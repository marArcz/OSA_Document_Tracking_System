import React, { useEffect, useState } from 'react'
import { Button, Container, Dropdown, Image, Nav, NavDropdown, NavItem, Navbar } from 'react-bootstrap'
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import NavbarHeader from './NavbarHeader';
import NavLink from './NavLink';
import ThemeSwitch from './ThemeSwitch';
import { useThemeState, useUserAuthState } from '@/States/States';
const NavbarComponent = ({ isActive, setIsActive, headerTitle }) => {
    const { theme, setTheme } = useThemeState();
    const { userAuth, setUserAth } = useUserAuthState();

    const getUserType = () => {
        let url = window.location.pathname.split('/')[1];

        switch (url) {
            case 'super-admin':
                return 'Super Admin';
            case 'admin':
                return 'Admin';
            case 'unit-head':
                return 'Unit Head';
            default:
                return 'Guest';
        }
    }


    return (
        <>
            <NavbarHeader isActive={isActive} setIsActive={setIsActive} />
            <div className={`${isActive ? '' : 'active'} app-header `}>
                <Navbar bg={theme === 'light' ? 'white' : 'dark'} data-bs-theme={theme} className={`border-bottom `}>
                    <Container fluid>
                        <Nav className='ms-auto align-items-center lg:gap-4 md:gap-3 sm:gap-3'>
                            <Nav.Item>
                                <ThemeSwitch />
                            </Nav.Item>
                            <Nav.Link href='#' className='d-flex justify-content-center align-items-center'>
                                <div className="c-icon flex justify-center items-center my-0">
                                    <i className='fi fi-rr-bell text-[1.1rem] text-dark leading-none  my-0'></i>
                                </div>
                            </Nav.Link>
                            <Nav.Link href='#' className='d-flex justify-content-center align-items-center'>
                                <div className="c-icon flex justify-center items-center my-0">
                                    <i className='fi fi-rr-calendar-day text-[1.1rem] text-dark leading-none my-0'></i>
                                </div>
                            </Nav.Link>
                            <Dropdown align="end" as={NavItem} className=''>
                                <DropdownToggle bsPrefix="nav-profile-toggler" data-bs-theme={theme} className="cursor-pointer btn btn-link nav-link bg-transparent text-decoration-none">
                                    <div className=" flex gap-x-2 justify-center text-center items-center">
                                        <Image
                                            className='rounded-circle'
                                            src='/images/johndoe.jpg'
                                            alt='User Photo'
                                            width={45}
                                            height={45}
                                        />
                                        <div className="text-start lg:block sm:hidden md:block hidden">
                                            {
                                                userAuth?.user ? (
                                                    <>
                                                        <p className='my-0 text-dark'>
                                                            <strong>{userAuth.user.firstname} {userAuth.user.lastname}</strong><br />
                                                            <small className='my-0'>{getUserType()}</small>
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className='my-0'>
                                                            <strong>Guest</strong><br />
                                                            <small className='my-0'>Guest</small>
                                                        </p>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                </DropdownToggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href='#' className='link-secondary'>
                                        <i className='bx bx-user text-primary'></i> Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item href='#' className='link-secondary'>
                                        <i className='bx bx-log-out text-danger'></i> Log Out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Container>
                </Navbar>
                <div className={`${theme === 'light' ? 'bg-white' : 'bg-dark'} sub-header w-full px-3 border-bottom shadow-sm`}>
                    <div className="container-fluid">
                        <p className='my-0 text-xl text-capitalize'>{headerTitle}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavbarComponent