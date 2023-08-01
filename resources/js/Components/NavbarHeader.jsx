import React from 'react'
import { Image } from 'react-bootstrap'

const NavbarHeader = ({isActive,setIsActive}) => {
    return (
        <>
            <div className={`navbar-header shadow-sm border-bottom ${isActive ? 'active' : ''}`}>
                <Image
                    src='/images/logo.png'
                    alt='Osa Logo'
                    className='navbar-logo'
                />

                <div className="nav-control ">
                    <div onClick={() => setIsActive(!isActive)} className={`hamburger ${isActive ? '' : 'is-active'}`}>
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavbarHeader