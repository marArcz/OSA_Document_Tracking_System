import ConfirmModal from '@/Components/ConfirmModal'
import ModalComponent from '@/Components/ModalComponent'
import PanelLayout, { LayoutType } from '@/Layouts/PanelLayout'
import { Head, Link } from '@inertiajs/react'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { Badge, Button, Card, Col, Dropdown, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'

const Announcements = ({ auth, announcements }) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [announcement, setAnnouncement] = useState(null)
    const [announcementId, setAnnouncementId] = useState(null)
    const [showViewModal, setShowViewModal] = useState(false)

    const confirmAction = (id) => {
        setAnnouncementId(id)
        setShowConfirmModal(true)
    }

    const viewAnnouncement = (a) => {
        setAnnouncement(a)
        setShowViewModal(true);
    }

    const closeViewModal = () => {
        setShowViewModal(false)
        setTimeout(() => setAnnouncement(null), 500)
    }

    return (
        <PanelLayout userAuth={auth} layout={LayoutType.SUPER_ADMIN} defaultActiveLink="announcements">
            <ModalComponent centered size="lg" show={showViewModal} handleClose={closeViewModal}>
                {
                    announcement && (
                        <div className="my-3">
                            <p className="fs-4 mb-0 fw-bold">{announcement.title}</p>
                            <p className="mt-0 mb-2 text-sm text-secondary">
                                <small>{format(new Date(announcement.created_at), 'MMM dd, yyy / hh:mm a')}</small>
                            </p>
                            <p className="fs-6 mt-3">{announcement.content}</p>
                            {
                                announcement.image != '' && announcement.image != null && (
                                    <div className="">
                                        <Image
                                            fluid
                                            thumbnail
                                            className='rounded-0 shadow-sm'
                                            src={announcement.image}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </ModalComponent>
            <ConfirmModal show={showConfirmModal} handleClose={() => setShowConfirmModal(false)} onConfirm={() => { }} onCancel={() => setShowConfirmModal(false)} />
            <Head title='Welcome' />
            <div className='py-3'>
                <div className="px-[1.5rem]">
                    {/* <div className="text-end mb-2">
                    </div> */}
                    <Card className='border-0 shadow-sm mt-3 p-lg-3 p-3'>
                        <Card.Header className='bg-white bg-opacity-80 lg:flex justify-content-between items-center pb-3'>
                            <div className='my-1'>
                                <p className="text-dark my-0 fw-bold fs-5 flex justify-center items-center gap-2">
                                    Post Announcements
                                    <i className="fi fi-rr-bullhorn text-primary"></i>
                                </p>
                                <p className='my-0 text-secondary'>
                                    <small>Edit / Remove</small>
                                </p>
                            </div>
                            <Link href={route('super-admin.create_announcement')} className='btn btn-light-primary rounded-1 my-1 font-semibold'><i className='bx bx-plus'></i> Create new</Link>

                        </Card.Header>
                        <Card.Body className=' position-relative '>
                            <ListGroup variant="flushed" className=' list-group-flush'>
                                {
                                    announcements && announcements.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row key={index} className='mt-1 align-items-center gy-3'>
                                                <Col lg={6} md={6}>
                                                    <p className=' fw-bold fs-5 mb-0'>{item.title}</p>
                                                    <p className="mt-0 mb-2 text-sm text-secondary">
                                                        <small>{format(new Date(item.created_at), 'MMM dd, yyy / hh:mm a')}</small>
                                                    </p>
                                                    <p className=' text-secondary'>{item.content.substr(0, 250)}...</p>
                                                </Col>
                                                <Col lg={5}>
                                                    {
                                                        item.image !== '' && item.image !== null && (
                                                            <div className="col-lg-4 col-md-7 col-10 h-[150px] overflow-hidden p-3 border hover:shadow-inner position-relative">
                                                                <div className="cursor-pointer bg-gray-400 opacity-30 position-absolute w-full h-full top-0 left-0 hover:opacity-10 hover:shadow transition-all"></div>
                                                                <Image
                                                                    src={item.image}
                                                                    fluid
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                </Col>
                                                <Col lg={1}>
                                                    <div className="flex ">
                                                        <button className='btn btn-link hover:bg-gray-200 text-decoration-none' type='button' onClick={() => viewAnnouncement(item)}>
                                                            <i className='fi fi-br-expand '></i>
                                                        </button>
                                                        <Dropdown>
                                                            <Dropdown.Toggle bsPrefix='toggler' className=' btn-link bg-transparent text-decoration-none'>
                                                                <i className=' fi fi-br-menu-dots-vertical'></i>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu align="end">
                                                                <Dropdown.Item href={route('super-admin.edit_announcement', { id: item.id })}>Edit</Dropdown.Item>
                                                                <Dropdown.Item as={Link} href={route('announcements.delete', { id: item.id })} method='delete'>Delete</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))
                                }

                            </ListGroup>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </PanelLayout>
    )
}

export default Announcements