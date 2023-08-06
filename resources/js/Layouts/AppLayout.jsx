import PageLoader from '@/Components/PageLoader';
import { useLoaderState, useThemeState, useUserAuthState } from '@/States/States'
import { usePage } from '@inertiajs/react';
import React, { Suspense, useEffect, useState } from 'react'

const AppLayout = ({ children, auth }) => {
    const { theme, setTheme } = useThemeState();
    const { userAuth, setUserAuth } = useUserAuthState();
    const { showLoader, setShowLoader } = useLoaderState();
    const [showPageLoader, setShowPageLoader] = useState(true)
    const { auth:authPageProps } = usePage().props;
    useEffect(() => {
        setUserAuth(authPageProps)
        setTimeout(() => setShowLoader(false), 1000)
    }, []);
    useEffect(() => {
        document.querySelector('html').setAttribute('data-bs-theme', theme)
    }, [theme])

    return (
        <div className='app' data-bs-theme={theme}>
            <PageLoader show={showLoader} />
            {children}
        </div>
    )
}

export default AppLayout