import AppLayout from '@/Layouts/AppLayout'
import { Container } from 'react-bootstrap'
import React from 'react'
import { Link } from '@inertiajs/react'

const Welcome = () => {
    return (
        <AppLayout>
            <Container>
                <div className="mt-3">
                    <h1>Welcome</h1>
                    <div className="mt-3">
                        <Link href={route('super-admin.index')}>Continue as Admin</Link>
                    </div>
                </div>
            </Container>
        </AppLayout>
    )
}

export default Welcome