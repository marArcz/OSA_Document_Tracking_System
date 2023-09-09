import React from 'react'
import ModalComponent from './ModalComponent'
import { useState } from 'react'
import { Button, Modal, Placeholder } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';
import { TextButton } from './CustomBtn';
import { createElement } from 'react';

const PolicyModal = ({ show, handleClose }) => {
    const [privacyPolicy, setPrivacyPolicy] = useState('');
    const [processing, setProcessing] = useState(true);

    useEffect(() => {
        const fetchPolicy = () => {
            axios.get('/policy')
                .then((res) => {
                    setPrivacyPolicy(res.data.policy)
                    setProcessing(false)
                })
        }
        fetchPolicy();
    }, [])

    const parseQuill = (jsxString) => {
        // let element = createElement('div');
        // element.innerHTML = jsxString;
        return <div dangerouslySetInnerHTML={{__html: jsxString}} />;
    }
    return (
        <>
            <Modal
                className=''
                handleClose={handleClose}
                show={show}
                size='xl'
                onHide={handleClose}
            // backdrop={processing}
            >
                <Modal.Header closeVariant='white' closeButton className='bg-primary text-light fw-bold fs-6 rounded-1 py-3 px-4'>
                    Privacy Policy
                </Modal.Header>
                <Modal.Body className='p-3 p-lg-4  bg-light'>
                    {
                        processing ? (
                            <div className=''>
                                <div className="mb-3">
                                    <Placeholder animation='wave'>
                                        <Placeholder bg='secondary' xs={12} />
                                        <Placeholder bg='secondary' xs={11} />
                                        <Placeholder bg='secondary' xs={12} />
                                    </Placeholder>
                                </div>
                                <div className="mb-3">
                                    <Placeholder animation='wave'>
                                        <Placeholder bg='secondary' xs={11} />
                                        <Placeholder bg='secondary' xs={12} />
                                        <Placeholder bg='secondary' xs={12} />
                                    </Placeholder>
                                </div>
                                <div className="mb-3">
                                    <Placeholder animation='wave'>
                                        <Placeholder bg='secondary' xs={11} />
                                        <Placeholder bg='secondary' xs={12} />
                                        <Placeholder bg='secondary' xs={12} />
                                    </Placeholder>
                                </div>
                                <div className="mb-3">
                                    <Placeholder animation='wave'>
                                        <Placeholder bg='secondary' xs={12} />
                                        <Placeholder bg='secondary' xs={11} />
                                        <Placeholder bg='secondary' xs={12} />
                                    </Placeholder>
                                </div>
                                <div className="mb-3">
                                    <Placeholder animation='wave'>
                                        <Placeholder bg='secondary' xs={12} />
                                        <Placeholder bg='secondary' xs={11} />
                                        <Placeholder bg='secondary' xs={12} />
                                    </Placeholder>
                                </div>
                            </div>
                        ) : (
                            <div className='ql-editor'>
                                {parseQuill(privacyPolicy)}
                            </div>
                        )
                    }
                </Modal.Body>
                <Modal.Footer className='px-4'>
                    {/* <Button type='button' onClick={handleClose} className='px-4 btn-sm rounded-1 '>
                        <span className="text-sm">Okay</span>
                    </Button> */}
                    <TextButton onClick={handleClose} allCaps={false}>
                        Okay
                    </TextButton>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PolicyModal
