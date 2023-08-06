import PanelLayout, { LayoutType } from '@/Layouts/PanelLayout'
import { Link } from '@inertiajs/react'
import { format } from 'date-fns'
import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Accordion, Button, Card, Container, useAccordionButton } from 'react-bootstrap'

const SubmissionBins = ({ auth, submission_bins }) => {

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            console.log('totally custom!'),
        );

        return (
            <div
                className='col-12 bg-transparent cursor-pointer border-0 text-left py-[1.2rem] px-2'
                onClick={decoratedOnClick}
            >
                {children}
            </div>
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
                {/* <DragDropContext>
                    <Droppable droppableId='submission-bins'>
                        {(provided) => (
                            <Accordion defaultActiveKey="0" {...provided.droppableProps} ref={provided.innerRef}>
                                {
                                    submission_bins && submission_bins.map((item, index) => (
                                        <Draggable key={item.id} draggableId={`submission-bin-${item.id}`} index={index}>
                                            {(provided, snapshot) => (
                                                <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <Card.Header>{item.title}</Card.Header>
                                                    <Card.Body>
                                                        <p className="text-sm text-secondary my-1">Created on {format(new Date(item.created_at),'MMM dd, yyy / hh:mm a')}</p>
                                                        <div className="text-end flex justify-end items-center">
                                                            <div className='text-center'>
                                                                <p className='fs-5'>{item.reports?.length}</p>
                                                                <p>Submitted</p>
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            )}
                                        </Draggable>
                                    ))
                                }
                            </Accordion>
                        )}
                    </Droppable>
                </DragDropContext> */}

                <Accordion defaultActiveKey="0">
                    {
                        submission_bins && submission_bins.map((item, index) => (
                            <Card className='border-0 mb-1 shadow-sm'>
                                <Card.Header className='bg-white'>
                                    <CustomToggle eventKey={index}>
                                        <div className="row">
                                            <div className="col">
                                                <div className="flex items-center gap-3 text-secondary">
                                                    <i className='fi fi-rr-box fs-5'></i>
                                                    <span className='fw-bold'>{item.title}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CustomToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={index}>
                                    <>
                                        <Card.Body className='p-4'>
                                            <p className='mt-0 mb-3 text-sm text-secondary'>
                                                <small>Created on {format(new Date(item.created_at), 'MMM dd, yyyy')}</small>
                                            </p>
                                            <p>{item.instruction}</p>
                                        </Card.Body>
                                        <Card.Footer className='bg-white py-3'>
                                            <div className="flex items-center justify-between">
                                                <Link className='rounded-1 text-sm btn btn-light'>
                                                    <small>View more details</small>
                                                </Link>
                                                <Link className='rounded-1 text-sm btn btn-primary'>
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