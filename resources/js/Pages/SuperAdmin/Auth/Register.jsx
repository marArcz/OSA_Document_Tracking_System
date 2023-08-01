import ElegantNav from '@/Components/ElegantNav';
import FormInput from '@/Components/FormInput';
import AuthLayout from '@/Layouts/AuthLayout'
import { Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Image, Spinner, Row, Container, Col, Alert } from 'react-bootstrap'

const Register = () => {
    const navList = ['Basic Info', 'Password'];
    const [activeNavKey, setActiveNavKey] = useState(0);
    const [basicInfoError, setBasicInfoError] = useState("")
    const [isChecking, setIsChecking] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [formErrors, setFormErrors] = useState({
        email: [''],
        phone: [''],
    })
    const [passwordRules, setPasswordRules] = useState([
        {
            rule: 'Your password should be at least eight characters.',
            validate: (password) => password.length > 8,
            status: 0 // 0-null,1-unmet,2-met
        },
        {
            rule: 'Your password should have at least one capital letter.',
            validate: (password) => {
                let regex = new RegExp('[A-Z]');
                return regex.test(password);
            },
            status: 0 // 0-null,1-unmet,2-met
        },
        {
            rule: 'Your password should have at least one number.',
            validate: (password) => {
                let regex = new RegExp('[0-9]');
                return regex.test(password);
            },
            status: 0 // 0-null,1-unmet,2-met
        },
    ])

    const testPassword = (password) => {
        if (password === '' || password.length <= 0) {
            resetPasswordRule()
            return;
        }
        let rules = []
        for (let r of passwordRules) {
            let rule = { ...r };
            rule.status = rule.validate(password) ? 2 : 1;
            rules.push(rule);
        }

        setPasswordRules(rules);
    }

    const resetPasswordRule = () => {
        let newRules = passwordRules.map((rule, i) => ({ ...rule, status: 0 }));
        setPasswordRules([...newRules]);
    }

    const isPasswordValid = () => {
        for (let p of passwordRules) {
            if (p.status != 2) return false;
        }

        return true && data.password == data.password_confirmation;
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        type: 'super_admin'
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (activeNavKey === 0) {
            checkBasicInfo();
        } else {
            post(route('register'));
        }
    }

    useEffect(() => {
        console.log('form errors: ', errors)
    }, [errors])
    

    const checkBasicInfo = () => {
        if (data.firstname === '' || data.middlename === '' || data.lastname === '' || data.email === '' || data.phone === '') {
            setBasicInfoError('You need to fill everything up.')
            return;
        }
        setBasicInfoError('');
        setIsChecking(true);
        axios.post('/super-admin/check', {
            email: data.email,
            phone: data.phone,
        })
            .then(res => {
                console.log('res: ', res);
                setIsChecking(false);
                setFormErrors({ email: [''], phone: [''] })
                setActiveNavKey(data => data + 1)
            })
            .catch(err => {
                console.log('error: ', err);
                setFormErrors(data => ({ ...data, ...err.response.data.errors }))
                setIsChecking(false);
            })
    }

    return (
        <div className="bg-[#F3F4F6] min-h-screen">
            <Container>
                <Row className='pt-lg-5 pt-3 gy-4'>
                    <Col lg={2}>
                        <Image
                            src='/images/logo.png'
                            alt='OSA Logo'
                            className='img-fluid w-[110px] h-[110px] mx-auto mb-3'
                        />
                        {/* <div className=' text-center'>Create an account to manage system.</div> */}
                        <div variant='primary' className='text-center'>
                            <i className='bx bx-info-circle'></i><br />
                            <span className="text-">Create an account to manage system.</span>
                        </div>
                    </Col>
                    <Col>
                        <div className="card mb-5 border-0 shadow-md md:min-h-max min-h-full rounded-3">
                            <div className="card-header md:p-20 p-4 bg-white">
                                <div className="text-start">

                                    <p className='my-1 text-uppercase fw-bolder'>
                                        <span className=' text-primary'>Create an Account</span>
                                    </p>
                                    <p className='my-1 text-capitalize fw-bold'>
                                        <span className=' text-secondary'>Super Admin</span>
                                    </p>
                                </div>
                            </div>
                            <div className="card-body md:p-20 p-4">
                                <ElegantNav disableClick className="mb-4" list={navList} activeKey={activeNavKey} />
                                <Form onSubmit={onSubmit}>
                                    {
                                        activeNavKey === 0 ? (
                                            <>
                                                <p className={`form-text text-${basicInfoError === '' ? 'secondary' : 'danger'}`}>
                                                    {basicInfoError === '' ? 'Please enter your basic information below.' : basicInfoError}
                                                </p>
                                                <Row className='g-3'>
                                                    <Col lg={4}>
                                                        <Form.Label>Firstname</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type='text'
                                                            name='firstname'
                                                            value={data.firstname}
                                                            onChange={e => setData('firstname', e.target.value)}
                                                        />
                                                    </Col>
                                                    <Col lg={4}>
                                                        <Form.Label>Middlename</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type='text'
                                                            name='middlename'
                                                            value={data.middlename}
                                                            onChange={e => setData('middlename', e.target.value)}
                                                        />
                                                    </Col>
                                                    <Col lg={4}>
                                                        <Form.Label>Lastname</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type='text'
                                                            name='lastname'
                                                            value={data.lastname}
                                                            onChange={e => setData('lastname', e.target.value)}
                                                        />
                                                    </Col>
                                                    <Col lg={4}>
                                                        <FormInput
                                                            label="Email Address"
                                                            controlId="email-input"
                                                            feedback={formErrors.email[0]}
                                                            invalid={formErrors.email[0] != ''}
                                                            required
                                                            type='email'
                                                            name='email'
                                                            value={data.email}
                                                            onChange={e => setData('email', e.target.value)}
                                                        />
                                                    </Col>
                                                    <Col lg={4}>
                                                        <FormInput
                                                            label="Phone"
                                                            controlId="phone-input"
                                                            feedback={formErrors.phone[0]}
                                                            invalid={formErrors.phone[0] != ''}
                                                            required
                                                            type='text'
                                                            name='phone'
                                                            value={data.phone}
                                                            onChange={e => setData('phone', e.target.value)}
                                                        />
                                                        {/* <Form.Label>Phone</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type='text'
                                                            name='phone'
                                                            value={data.phone}
                                                            onChange={e => setData('phone', e.target.value)}
                                                        />
                                                        <p className="text-danger text-sm mb-0 mt-3">{formErrors.phone[0]}</p> */}
                                                    </Col>
                                                </Row>
                                                <div className="mt-4 text-end">
                                                    <Button onClick={() => reset()} type='button' className='btn-link text-decoration-none me-3' variant='white'>Reset</Button>
                                                    <Button disabled={isChecking} variant='primary' onClick={checkBasicInfo} type='submit'>Next</Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {/* <div className='flex gap-2 bg-primary shadow-sm p-3 w-max rounded'>
                                                    <span className='text-secondary text-'>Almost Done!</span>
                                                    <span className='text-primary fw-bold text-'>Create a password for your account.</span>
                                                </div> */}
                                                <Alert variant='info' className=' w-max py-2' >
                                                    <small>Almost Done! <strong>Create a password for your account</strong></small>
                                                </Alert>
                                                <div className="row mt-4 gy-3">
                                                    <div className="col-lg-7">
                                                        <div className="mb-4">
                                                            <Form.Label className='fw-bold'>New Password</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type={showPassword ? 'text' : 'password'}
                                                                name='password'
                                                                value={data.password}
                                                                onChange={e => {
                                                                    setData('password', e.target.value)
                                                                    testPassword(e.target.value)
                                                                }}
                                                            />

                                                        </div>
                                                        <div className="mb-4">
                                                            <Form.Label className='fw-bold'>Confirm Password</Form.Label>
                                                            <Form.Control
                                                                type={showPassword ? 'text' : 'password'}
                                                                name='confirm_password'
                                                                required
                                                                value={data.password_confirmation}
                                                                onChange={e => setData('password_confirmation', e.target.value)}
                                                            />
                                                            {
                                                                data.password_confirmation.length > 0 && (
                                                                    <p className={`text-${data.password !== data.password_confirmation ? 'danger' : 'success'} text-sm mb-0 mt-2`}>
                                                                        {
                                                                            data.password !== data.password_confirmation ?
                                                                                ('Your passwords does not match!') :
                                                                                (
                                                                                    <>
                                                                                        <i className='bx bx-check'></i>
                                                                                        <span className="ms-1">Matched</span>
                                                                                    </>
                                                                                )

                                                                        }
                                                                    </p>
                                                                )
                                                            }
                                                        </div>
                                                        <Form.Check
                                                            type="checkbox"
                                                            id='show-password'
                                                            checked={showPassword}
                                                            onChange={e => setShowPassword(e.target.checked)}
                                                            label="Show Password"
                                                        />
                                                    </div>
                                                    <div className="col-lg">
                                                        <hr className='lg:hidden'/>
                                                        <ul className='mt-2 nav'>
                                                            {
                                                                passwordRules.map((item, index) => {
                                                                    let textColors = ['secondary', 'danger', 'success'];
                                                                    let icons = ['minus', 'x', 'check']
                                                                    return (
                                                                        <li className={`text-${textColors[item.status]} mb-3 flex items-center gap-2`}>
                                                                            <i className={`bx bx-${icons[item.status]} bx-sm`}></i>
                                                                            <span>{item.rule}</span>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex items-center justify-end text-end gap-3">
                                                    <Button onClick={() => setActiveNavKey(data => data - 1)} className='btn-link text-decoration-none' variant='white'>Back</Button>
                                                    <Button disabled={!isPasswordValid()} variant='primary' onClick={onSubmit} type='submit'>
                                                        Create Account
                                                    </Button>
                                                </div>
                                            </>
                                        )
                                    }
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register