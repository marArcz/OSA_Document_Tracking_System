import PanelLayout from '@/Layouts/PanelLayout'
import React from 'react'
import { Accordion, Button, Card, Container, useAccordionButton } from 'react-bootstrap'
import { Link } from '@inertiajs/react'
import { format } from 'date-fns'

const UnitHeadReports = ({ submissionBins, auth }) => {
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
        <PanelLayout defaultActiveLink={"reports"} headerTitle={"Accomplishment Reports"}>
            <div className="py-3 px-[1.5rem]">
                <p className='fs-6 text-primary'>
                    {auth.user?.campus?.name} Campus
                </p>
                <hr />
                <Accordion defaultActiveKey="0">
                    {
                        submissionBins && submissionBins.map((item, index) => (
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
                                            <p className='text-sm'>{item.instruction || 'No instruction.'}</p>
                                        </Card.Body>
                                        <Card.Footer className='bg-white py-3'>
                                            <div className="flex items-center justify-between">
                                                <Link className='rounded-1 text-sm btn btn-light' href={route('unit_head.submission_bin',{id:item.id})}>
                                                    <small>Open Submission Bin</small>
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
                    (!submissionBins || submissionBins.length) < 0 && (
                        <p>Nothing to show</p>
                    )
                }
            </div>
        </PanelLayout >
    )
}

export default UnitHeadReports