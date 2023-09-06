import { usePage } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Badge, Dropdown, Nav, NavItem } from 'react-bootstrap'
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle'

const CalendarDropdown = () => {
    const [notifications, setNotifications] = useState([]);
    const { auth } = usePage().props;

    const getNotifications = () => {
        axios.get(`/notifications/calendar/${auth.user.id}`)
            .then((res) => {
                console.log('calendar notifs: ', res)
                setNotifications(res.data.notifications);
            })
    }
    useEffect(() => {
        getNotifications();
    }, [])

    return (
        <>
            <Dropdown align="end" as={NavItem} className=''>
                <DropdownToggle bsPrefix="nav-profile-toggler" className="cursor-pointer btn btn-link nav-link bg-transparent text-decoration-none">
                    <div className="c-icon my-0 position-relative">
                        <i className='fi fi-rr-calendar-day text-[1.1rem] text-dark leading-none my-0'></i>
                        {
                            notifications.length > 0 && (
                                <div className="blob bg-primary absolute top-[-3px] end-0"></div>
                            )
                        }
                    </div>
                </DropdownToggle>
                <Dropdown.Menu>
                    <div className="px-3">
                        <div className="flex items-center">
                            <div className="text-center text-sm w-[10rem] flex items-center gap-1 text-black-50">
                                <i className='fi fi-rr-bell text-[1rem] text-black-50 leading-none my-0'></i>
                                <strong>Notifications</strong>
                                {/* <Dropdown>
                                    <DropdownToggle
                                        as="button"
                                        className='btn text-decoration-none btn-link link-dark'
                                    >
                                        Unread
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={e => e.preventDefault()}>
                                            Read
                                        </DropdownItem>
                                        <DropdownItem>
                                            Unread
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown> */}
                            </div>
                            <button disabled={notifications.length == 0} className='btn btn-link btn-sm link-secondary w-max text-decoration-none'>
                                <i className='text-sm me-1 bx bxs-check-circle'></i>
                                <span className='text-sm'>Mark as read</span>
                            </button>
                        </div>
                        <hr className='my-1' />
                        <div className="">
                            <Nav className='flex-column'>
                                {
                                    notifications.map((item, index) => (
                                        <Nav.Link href={route('notifications.open', { id: item.id })} key={item.id} className=' position-relative ps-3'>
                                            <small className={`fw-bolder text-dark`}>
                                                {item.data.title}
                                            </small>
                                            <div className="w-2 h-2 rounded-circle bg-primary absolute top-[15px] start-0"></div>
                                        </Nav.Link>
                                    ))
                                }
                                {
                                    notifications.length == 0 && (
                                        <NavItem className='text-black-50 my-2'>
                                            <small>Nothing to show.</small>
                                        </NavItem>
                                    )
                                }
                            </Nav>
                        </div>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default CalendarDropdown
