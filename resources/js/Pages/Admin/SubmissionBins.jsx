import PanelLayout, { LayoutType } from '@/Layouts/PanelLayout'
import { Link } from '@inertiajs/react'
import { format } from 'date-fns'
import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Accordion, Button, Card, Container, Dropdown, useAccordionButton } from 'react-bootstrap'

const SubmissionBins = ({ auth, submission_bins }) => {

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            console.log('totally custom!'),
        );

        return (
            <button
                className='col-12 bg-transparent cursor-pointer border-0 text-left py-[1.2rem] px-2'
                onClick={decoratedOnClick}
            >
                {children}
            </button>
        );
    }

    return (
        <PanelLayout userAuth={auth} layout={LayoutType.SUPER_ADMIN} defaultActiveLink="submission_bin" headerTitle="Submission Bins">
            <div className='py-3 px-[1.5rem]'>
                <Link href={route('admin.create_submission_bin')} variant='primary' className='btn btn-primary rounded-pill py-2 px-3 mt-3'>
                    <i className='bx bx-plus'></i> Create
                </Link>
                <p className="text-sm mt-3 text-secondary">This is where you can create submission bins for the accomplishment reports of unit heads.</p>
                <hr />
                <Accordion defaultActiveKey="0">
                    {
                        submission_bins && submission_bins.map((item, index) => (
                            <Card className='border-0 mb-1 shadow-sm'>
                                <Card.Header className='bg-white'>
                                    <CustomToggle eventKey={index}>
                                        <div className="row items-center">
                                            <div className="col">
                                                <div className="flex items-center gap-x-3 text-secondary">
                                                    <i className='fi fi-rr-box fs-5'></i>
                                                    <span className='fw-bold'>{item.title}</span>
                                                </div>
                                            </div>
                                            <div className="col-auto text-end">
                                                <div className="flex justify-end items-center gap-2">
                                                    {
                                                        item.deadline_date && (
                                                            <p className='my-0 text-sm text-secondary'>Due {format(new Date(item.deadline_date), 'MMM dd, yyyy')}</p>
                                                        )
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </CustomToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={index}>
                                    <>
                                        <Card.Body className='p-4'>
                                            <div className="flex justify-between">
                                                <div>
                                                    <p className='mt-0 mb-3 text-sm text-secondary'>
                                                        <small>Created on {format(new Date(item.created_at), 'MMM dd, yyyy')}</small>
                                                    </p>
                                                    <p className='text-sm'>{item.instruction || 'No instruction.'}</p>
                                                </div>
                                                <Dropdown>
                                                    <Dropdown.Toggle bsPrefix='toggler' className=' btn-link bg-transparent text-decoration-none'>
                                                        <i className=' fi fi-br-menu-dots-vertical'></i>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu align="end">
                                                        <Dropdown.Item href={route('admin.edit_submission_bin', { id: item.id })}>Edit</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => deleteRow(item.id)}>Delete</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <div className="flex justify-end items-center gap-4">
                                                <div className='text-center'>
                                                    <p className='fs-3 fw-bold text-primary'>{item.reports?.length ?? 0} </p>
                                                    <p className='text-sm mb-0'>Submitted</p>
                                                </div>
                                            </div>
                                        </Card.Body>
                                        <Card.Footer className='bg-white py-3'>
                                            <div className="flex items-center justify-between">
                                                <Link className='rounded-1 text-sm btn btn-light'>
                                                    <small>View more details</small>
                                                </Link>
                                                <Link href={route('admin.reports.view', { submission_bin_id: item.id })} className='rounded-1 text-sm btn btn-primary'>
                                                    <small>View Reports</small>
                                                </Link>
                                            </div>
                                        </Card.Footer>
                                    </>
                                </Accordion.Collapse>
                            </Card>
                        ))
                    }
                </Accordion>
                {
                    (!submission_bins || submission_bins.length) < 0 && (
                        <p></p>
                    )
                }
            </div>
        </PanelLayout>
    )
}

export default SubmissionBins