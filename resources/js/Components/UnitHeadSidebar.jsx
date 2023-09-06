import React from 'react'
import SidebarComponent, { NavType } from './SidebarComponent';
import { useNavMenuLoadedState, useNavMenuState } from '@/States/States';
import { useEffect } from 'react';

const UnitHeadSidebar = ({ isActive, setShowFeedbackModal, activeLink }) => {
    const { setNavList } = useNavMenuState();
    const { setIsLoaded } = useNavMenuLoadedState();

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
            href: route('unit_head.announcements'),
            urlPath: 'announcements',
        },
        {
            type: NavType.BUTTON,
            text: 'Feedback',
            icon: <i className="fi fi-rr-comment"></i>,
            onClick: (e) =>{
                e.preventDefault();
                setShowFeedbackModal(true);
            }
        },
        {
            type: NavType.LINK,
            text: 'Accomplishment Reports',
            icon: <i className="fi fi-rr-document"></i>,
            href: route('unit_head.reports'),
            urlPath: 'reports',
        },
    ];

    useEffect(() => {
        setNavList(navList)
        setIsLoaded(true)
    },[])

    return (
        <SidebarComponent isActive={isActive} activeLink={activeLink} />
    )
}

export default UnitHeadSidebar
