import CardComponent from '@/Components/CardComponent'
import ElegantNav from '@/Components/ElegantNav'
import HorizontalScrollingList from '@/Components/HorizontalScrollingList'
import ModalComponent from '@/Components/ModalComponent'
import PanelLayout from '@/Layouts/PanelLayout'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Breadcrumb, BreadcrumbItem, Button, Card, Col, Form, ListGroup, ListGroupItem, Nav, Row } from 'react-bootstrap'

const UnitHeads = ({ campuses, classifications }) => {
    const [tab, setTab] = useState(0)
    const [showAddModal, setShowAddModal] = useState(false)
    const [designations, setDesignations] = useState([]);
    const [fetching, setFetching] = useState(false)
    const [selectedCampusIndex, setSelectedCampusIndex] = useState(0)
    const [selectedClassificationIndex, setSelectedClassificationIndex] = useState(0)

    useEffect(() => {
        const fetchUnitHeads = () => {
            axios.post('/unit-heads/designations', {
                campus_id: campuses[selectedCampusIndex].id,
                classification_id: classifications[selectedClassificationIndex].id
            })
                .then(res => {
                    console.log(res)
                    setFetching(false)
                    setDesignations(res.data.designations);
                })
                .catch(err => console.log(err))
        }
        setFetching(true);
        fetchUnitHeads();
    }, [selectedCampusIndex, selectedClassificationIndex]);

    return (
        <PanelLayout headerTitle="Unit Heads" defaultActiveLink="unit-heads/profile">
            <ModalComponent title='Add New Unit Head' show={showAddModal} centered size="xl">

            </ModalComponent>
            <div className='py-3 px-3'>
                <Row>
                    <Col xl={2} lg={3} md={3}>
                        <ListGroup variant="flush" className=' shadow-sm rounded-0'>
                            <ListGroup.Item className='bg-white'>
                                <p className='my-1 text-uppercase fw-bold text-sm'>Campuses</p>
                            </ListGroup.Item>
                            {
                                campuses && campuses.map((campus, index) => (
                                    <ListGroup.Item onClick={() => setSelectedCampusIndex(index)} key={index} className={`cursor-pointer ${index == selectedCampusIndex ? ' text-primary list-group-item-primary' : 'hover:bg-gray-50 text-secondary'}`}>
                                        <p className="my-1 flex justify-between items-center">
                                            <span>{campus.name}</span>
                                            <i className='bx bx-chevron-right'></i>
                                        </p>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                        <ListGroup variant="flush" className=' shadow-sm rounded-0 mt-3'>
                            <ListGroupItem className='bg-white'>
                                <p className='my-1 text-uppercase fw-bold text-sm'>Classification</p>
                            </ListGroupItem>
                            {
                                classifications && classifications.map((item, index) => (
                                    <ListGroupItem onClick={() => setSelectedClassificationIndex(index)} key={index} className={`cursor-pointer ${index == selectedClassificationIndex ? ' text-primary list-group-item-primary' : 'hover:bg-gray-50 text-secondary'}`}>
                                        <p className="my-1 flex justify-between items-center">
                                            <span>{item.name}</span>
                                            <i className='bx bx-chevron-right'></i>
                                        </p>
                                    </ListGroupItem>
                                ))
                            }
                        </ListGroup>
                    </Col>
                    <Col>
                        <Card className='shadow-sm border-0'>
                            <Card.Header className='px-4 py-3 bg-white'>
                                <div className="flex items-center">
                                    <div className="flex gap-2 fs-6 fw-bold text-purple me-auto">
                                        <span>{campuses[selectedCampusIndex].name}</span>
                                        <span>/</span>
                                        <span>{classifications[selectedClassificationIndex].name}</span>
                                    </div>
                                    <Button variant='light-secondary' size='sm' className='d-flex justify-content-center align-items-center gx-3'>
                                        <i className='fi fi-rr-search me-2'></i>
                                        <span>Search for a unit head</span>
                                    </Button>
                                </div>
                            </Card.Header>
                            <Card.Body className='px-4 py-3'>
                                <div className="">
                                    {
                                        designations && designations.map((designation, index) => (
                                            <>
                                                <div className="flex items-center gap-2">
                                                    <p className="my-1 fs-6 flex items-center gap-3 text-secondary"><i className='fi fi-rr-minus'></i> {designation.name}</p>
                                                    {/* <Button variant='white' size='sm' className='border text-sm py-1 shadow-sm'>
                                                        <small><i className='bx bx-plus leading-none'></i></small>
                                                    </Button> */}
                                                </div>
                                                <HorizontalScrollingList loading={fetching} list={designation.unit_heads} />
                                            </>
                                        ))
                                    }
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </PanelLayout>
    )
}

export default UnitHeads