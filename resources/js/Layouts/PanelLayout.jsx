import React, { useState } from 'react'
import AppLayout from './AppLayout'
import NavbarComponent from '@/Components/Navbar'
import SidebarComponent from '@/Components/SidebarComponent'
import SuperAdminSidebar from '@/Components/SuperAdminSidebar'
import AdminSidebar from '@/Components/AdminSidebar'
import UnitHeadSidebar from '@/Components/UnitHeadSidebar'
import BottomNav from '@/Components/BottomNav'
import { ToastContainer, toast } from 'react-toastify'
import { useNavState } from '@/States/States'

export const LayoutType = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    UNIT_HEAD: 'unit_head',
}

const Sidebar = ({ layout, isActive, activeLink }) => {
    switch (layout) {
        case LayoutType.ADMIN:
            return <AdminSidebar activeLink={activeLink} isActive={isActive} />;
        case LayoutType.SUPER_ADMIN:
            return <SuperAdminSidebar activeLink={activeLink} isActive={isActive} />;
        case LayoutType.UNIT_HEAD:
            return <UnitHeadSidebar activeLink={activeLink} isActive={isActive} />;
        default:
            return null;
    }
}

const PanelLayout = ({ userAuth, children, layout = null, headerTitle = null, defaultActiveLink }) => {

    const [activeLink, setActiveLink] = useState(defaultActiveLink)
    const {isNavActive, setNavActive} = useNavState();
    return (
        <AppLayout auth={userAuth}>
            <ToastContainer theme='light' />
            <NavbarComponent headerTitle={headerTitle || activeLink} setIsActive={setNavActive} isActive={isNavActive} />
            <Sidebar activeLink={activeLink} isActive={isNavActive} layout={layout} />
            <main className={`${isNavActive ? '' : 'expanded'} content-body bg-gray-100 `}>
                {children}
            </main>
        </AppLayout>
    )
}

export default PanelLayout