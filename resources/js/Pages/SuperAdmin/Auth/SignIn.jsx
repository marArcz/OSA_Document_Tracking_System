import AuthLayout from '@/Layouts/AuthLayout'
import { Link, useForm } from '@inertiajs/react';
import React, { useEffect } from 'react'
import { Button, Form, Image, Spinner } from 'react-bootstrap'

const SignIn = () => {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        type: 'super_admin'
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('login'));
    }


    return (
        <AuthLayout title="Super admin">
            <Form onSubmit={onSubmit}>
                <div className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter your email address...'
                        name='email'
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                    />
                    <p className="text-danger mb-0 mt-2 text-sm">{errors.email}</p>
                </div>
                <div className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter your password...'
                        name='password'
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                    />
                    <p className="text-danger mb-0 mt-3">{errors.password}</p>
                </div>
                <Form.Check
                    type="checkbox"
                    id='remember-me'
                    label="Remember Me"
                    onChange={(e) => setData("remember", e.target.checked)}
                    checked={data.remember}
                />
                <div className="flex items-center justify-end mt-5 gap-3">
                    <Link href="" className='link-secondary text-sm'>Forgot Password?</Link>
                    <Button
                        variant='primary'
                        type='submit'
                        className=' px-4 rouned-2 fw-bold'
                        disabled={processing}
                    >
                        <span className='text-sm'>SIGN IN</span>
                        {processing && (
                            <Spinner
                                variant='light'
                                animation="border"
                                size='sm'
                            />
                        )}
                    </Button>
                </div>
            </Form>
        </AuthLayout>
    )
}

export default SignIn