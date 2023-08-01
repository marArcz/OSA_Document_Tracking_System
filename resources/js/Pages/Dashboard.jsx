import NavbarComponent from '@/Components/Navbar';
import AppLayout from '@/Layouts/AppLayout';
import PanelLayout, { LayoutType } from '@/Layouts/PanelLayout';
import { useThemeState } from '@/States/States';
import { Link, Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Alert, Card } from 'react-bootstrap';

export default function Dashboard({ auth }) {
    return (
        <PanelLayout userAuth={auth} layout={LayoutType.SUPER_ADMIN} defaultActiveLink="dashboard">
            <Head title='Welcome' />
            <div className='py-3'>
                <div className="container-fluid">
                    <Card className='border-0 shadow-sm'>
                        <Card.Body>
                            <p className='my-2 text-gray-900'>Welcome</p>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </PanelLayout>
    );
}
