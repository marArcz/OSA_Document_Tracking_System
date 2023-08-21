import ElegantNav from '@/Components/ElegantNav'
import HeaderTitle from '@/Components/HeaderTitle'
import UnitHeadReportCard from '@/Components/UnitHeadReportCard'
import PanelLayout from '@/Layouts/PanelLayout'
import { router, usePage } from '@inertiajs/react'
import axios from 'axios'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Placeholder, Row, Spinner } from 'react-bootstrap'
import DataTable from 'react-data-table-component'

const ViewReports = ({ submissionBin, campuses }) => {
    const {auth, role} = usePage().props;
    const [selectedCampus, setSelectedCampus] = useState(campuses[0])
    const [reports, setReports] = useState([]);
    const [fetching, setFetching] = useState(false)
    const [unitHeads, setUnitHeads] = useState([])
    const tableColumns = [
        {
            name: "Unit Head",
            selector: row => row.unit_head.firstname + " " + row.unit_head.lastname,
        },
        // {
        //     name: "Report",
        //     selector: row => row.attachments[0].name
        // },
        // {
        //     name: "Classification",
        //     selector: row => row.unit_head.designation.classification.name
        // },
        // {
        //     name: "Designation",
        //     selector: row => row.unit_head.designation.name
        // },
    ];
    const fetchReports = async () => {
        setFetching(true)
        var reports = {};
        
        if(role === 'admin'){
             reports = await axios.get(`/reports/${selectedCampus.id}/${submissionBin.id}/all`);
        }else{
            // if superadmin only get reports that were approved
             reports = await axios.get(`/reports/${selectedCampus.id}/${submissionBin.id}/approved`);
        }
        console.log('reports: ', reports)
        let unitHeads = await axios.get(`/reports/${selectedCampus.id}/unit_heads`);

        setReports(reports?.data?.reports || [])
        setUnitHeads(unitHeads.data.unitHeads)
        setFetching(false)
    }

    useEffect(() => {
        fetchReports();
    }, []);

    useEffect(() => {
        fetchReports();
    }, [selectedCampus]);

    const openReport = (report) => {
        router.visit(route('admin.report.open', { report_id: report.id }))
    }

    return (
        <PanelLayout
            pageTitle='View Reports'
            defaultActiveLink="submission-bins"
            headerTitle={(
                // <p className='my-0 d-flex align-items-center fs-6'>
                //     <i className='fi fi-rr-box me-2'></i>
                //     {/* {submissionBin?.title} */}
                //     Unit Head Report
                // </p>
                <HeaderTitle backButton text='Unit Head Report'/>
            )}>

            <div className="px-[1.5rem] py-3">
                <Card className='mb-3 border-0 shadow-sm rounded-0'>
                    <Card.Body>
                        <p className='flex items-center text-lg my-0'>
                            <i className='fi fi-rr-box me-2'></i>
                            {submissionBin.title}
                        </p>
                        <div className="text-secondary">
                            {
                                submissionBin.deadline_date ? (
                                    <p className="text-sm mt-3 mb-0">
                                        Due {format(new Date(submissionBin.deadline_date), 'MMM d, Y / hh:mm aaa')}
                                    </p>
                                ) : (
                                    <p className='mt-3 mb-0 text-sm'>
                                        No deadline.
                                    </p>
                                )
                            }
                        </div>
                        <hr />

                        {
                            submissionBin.instruction ? (
                                <>
                                    <p className='text-sm text-secondary my-1'>
                                        {submissionBin.instruction}
                                    </p>
                                </>
                            ) : (
                                <p className='text-sm text-black-50 my-1'>
                                    No instruction.
                                </p>
                            )
                        }
                    </Card.Body>
                </Card>
                <Card className='border-0 shadow-sm rounded-0'>
                    <Card.Body className='p-lg-4'>
                        <p className="form-text mb-2 text-secondary">Campus</p>
                        <div className="w-100 border shadow-sm custom-scroll bg-white overflow-auto">
                            <ElegantNav
                                list={campuses}
                                selector={item => item.name}
                                selectedItem={selectedCampus}
                                handleSelect={(campus) => setSelectedCampus(campus)}
                            />
                        </div>
                        <div className=" mt-3">
                            <Row className='gy-3'>
                                <Col className='order-1 order-lg-0'>
                                    <p className='fw-bold mb-0'>
                                        {selectedCampus.name} Campus
                                    </p>
                                    <p className='mt-0 text-sm'>
                                        <small>Unit Head Reports / All</small>
                                    </p>
                                    <Row>
                                        {
                                            fetching ? (
                                                <>
                                                    <Col lg={3}>
                                                        <Placeholder animation='wave'>
                                                            <div className='bg-light w-100 h-[180px]'></div>
                                                        </Placeholder>
                                                    </Col>
                                                    <Col lg={3}>
                                                        <Placeholder animation='wave'>
                                                            <div className='bg-light w-100 h-[180px]'></div>
                                                        </Placeholder>
                                                    </Col>

                                                </>
                                            ) : (
                                                reports.length > 0 ? (
                                                    reports.map((report, index) => (
                                                        <Col lg={3} key={index}>
                                                            <UnitHeadReportCard handleClick={() => openReport(report)} data={report} />
                                                        </Col>
                                                    ))
                                                ) : (
                                                    <p className='text-sm text-secondary'>Nothing to show.</p>
                                                )
                                            )
                                        }
                                    </Row>
                                </Col>
                                <Col lg={3} className='order-0 order-lg-1'>
                                    <p className='text-sm fw-bold'>Unit Heads</p>
                                    <p className='mt-0 text-sm mb-0'></p>
                                    {
                                        fetching ? (
                                            <>
                                                <Placeholder animation='wave'>
                                                    <Placeholder bg='light' xs={12} />
                                                </Placeholder>
                                                <Placeholder animation='wave'>
                                                    <Placeholder bg='light' xs={12} />
                                                </Placeholder>
                                                <Placeholder animation='wave'>
                                                    <Placeholder bg='light' xs={12} />
                                                </Placeholder>
                                            </>

                                        ) : (
                                            reports.length > 0 ? (
                                                <ListGroup variant='flush'>
                                                    {
                                                        unitHeads.map((unitHead, index) => (
                                                            <ListGroupItem className='text-sm px-0'>
                                                                <div className='flex gap-3 items-center cursor-pointer'>
                                                                    <Image
                                                                        src={unitHead.image}
                                                                        width={30}
                                                                        height={30}
                                                                        roundedCircle
                                                                    />
                                                                    <p className="my-0">
                                                                        {unitHead.firstname} {unitHead.lastname}
                                                                    </p>
                                                                    <div>
                                                                        <Form.Check
                                                                            type="checkbox"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </ListGroupItem>
                                                        ))
                                                    }

                                                </ListGroup>
                                            ) : (
                                                <p className='text-sm text-secondary'>Nothing to show.</p>
                                            )
                                        )
                                    }
                                </Col>
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </PanelLayout >
    )
}

export default ViewReports