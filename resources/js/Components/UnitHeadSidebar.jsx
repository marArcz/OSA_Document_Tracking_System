import React from 'react'
import SidebarComponent, { NavType } from './SidebarComponent';

const UnitHeadSidebar = ({ isActive, setShowFeedbackModal,activeLink }) => {

    const navList = [
        {
            type: NavType.LINK,
            text: 'Dashboard',
            icon: <i className="fi fi-rr-apps"></i>,
            href: route('dashboard'),
            urlPath: 'dashboard',
        },
        {
            type: NavType.LINK,
            text: 'Announcements',
            icon: <i className="fi fi-rr-bullhorn"></i>,
            href: '/unit-heads/announcements',
            urlPath: 'announcements',
        },
        {
            type: NavType.LINK,
            text: 'Accomplishment Reports',
            icon: <i className="fi fi-rr-document"></i>,
            href: route('unit_head.reports'),
            urlPath: 'reports',
        },
    ];

    return (
        <SidebarComponent isActive={isActive} activeLink={activeLink} navList={navList} />
    )
}

export default UnitHeadSidebar