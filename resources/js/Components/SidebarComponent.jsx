import { Link } from '@inertiajs/react'
import React, { memo, useState } from 'react'
import { Nav } from 'react-bootstrap'

export const NavType = {
    LINK: 0,
    DROPDOWN: 1
}

const NavLink = ({ item,activeLink }) => {
    const currentUrl = window.location;
    return (
        <li>
            <Link className={currentUrl.href === item.href ? 'active' : (activeLink == item.urlPath?'active':'')} href={item.href}>
                {item.icon}
                <span>{item.text}</span>
            </Link>
        </li>
    )
}

const NavDropdown = ({ item,activeLink }) => {
    const currentUrl = window.location;
    const matched = 0;

    const active = currentUrl.pathname.split('/')[2] === item.key;

    const [expanded, setExpanded] = useState(active)

    return (
        <li className={`${active ? 'active' : ''}`}>
            <a onClick={() => setExpanded(s => !s)} aria-expanded={expanded} className='has-arrow bx cursor-pointer'>
                {item.icon}
                <span className=' font-sans'>{item.text}</span>
            </a>
            <ul as="ul" className='nested' aria-expanded={expanded}>
                {
                    item.navList && item.navList.map((i, index) => (
                        i.type === NavType.LINK ? (
                            /* for links */
                            <NavLink key={index} activeLink={activeLink} item={i} />
                        ) : (
                            /* for dropdown */
                            <NavDropdown key={index} item={i} />
                        )
                    ))
                }
            </ul>
        </li>
    )
}

const SidebarComponent = ({ isActive, navList,activeLink}) => {
    return (
        <div className={`app-sidebar border-end bg-white shadow-sm ${isActive ? 'active' : ''}`}>
            <div className="sidebar-menu">
                <ul className='main'>
                    {
                        navList && navList.map((item, index) => (
                            item.type === NavType.LINK ? (
                                /* for links */
                                <NavLink activeLink={activeLink} key={index} item={item} />
                            ) : (
                                /* for dropdown */
                                <NavDropdown activeLink={activeLink} key={index} item={item} />
                            )
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default memo(SidebarComponent)