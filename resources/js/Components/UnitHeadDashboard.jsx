import axios from 'axios';
import { format } from 'date-fns';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { Badge, Card, Col, Image, ListGroup, ListGroupItem, Placeholder, Row } from 'react-bootstrap'
import ReactTimeAgo from 'react-time-ago';



const AnnouncementsCard = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    /* placeholders while fetching data */
    const PlaceHolders = () => (
        <ListGroupItem>
            <Row className='mb-3'>
                <div className='col col-auto'>
                    <Placeholder animation='wave'>
                        <div className='w-[50px] h-[50px] bg-light shadow-sm'></div>
                    </Placeholder>
                </div>
                <Col>
                    <Placeholder as="p" animation='wave' className="my-0 ">
                        <Placeholder xs={12} bg="light" />
                    </Placeholder>
                    <Placeholder as="p" animation='wave' className="my-0 ">
                        <Placeholder xs={12} bg="light" />
                    </Placeholder>
                </Col>
            </Row>
            <Row className='mb-3'>
                <div className='col col-auto'>
                    <Placeholder animation='wave'>
                        <div className='w-[50px] h-[50px] bg-light shadow-sm'></div>
                    </Placeholder>
                </div>
                <Col>
                    <Placeholder as="p" animation='wave' className="my-0 ">
                        <Placeholder xs={12} bg="light" />
                    </Placeholder>
                    <Placeholder as="p" animation='wave' className="my-0 ">
                        <Placeholder xs={12} bg="light" />
                    </Placeholder>
                </Col>
            </Row>
            <Row className='mb-3'>
                <div className='col col-auto'>
                    <Placeholder animation='wave'>
                        <div className='w-[50px] h-[50px] bg-light shadow-sm'></div>
                    </Placeholder>
                </div>
                <Col>
                    <Placeholder as="p" animation='wave' className="my-0 ">
                        <Placeholder xs={12} bg="light" />
                    </Placeholder>
                    <Placeholder as="p" animation='wave' className="my-0 ">
                        <Placeholder xs={12} bg="light" />
                    </Placeholder>
                </Col>
            </Row>
        </ListGroupItem>
    );

    /* fetch announcements */
    useEffect(() => {
        const fetchAnnouncements = () => {
            setFetching(true);
            axios.get('/announcements')
                .then((res) => {
                    setAnnouncements(res.data.announcements);
                    setTimeout(() => setFetching(false), 1000)
                    setIsLoaded(true)
                })
                .catch(err => {
                    console.log(err)
                    setTimeout(() => setFetching(false), 1000)
                    setIsLoaded(true)
                })
        }

        if (!isLoaded) fetchAnnouncements();
    }, [])

    const dateTimeLabel = (start, end) => {
        const startDate = moment(start);
        const timeEnd = moment(end);
        const diff = timeEnd.diff(startDate);
        const diffDuration = moment.duration(diff);
        if (diffDuration.days() <= 1) {
            return <ReactTimeAgo timeStyle="twitter" date={new Date(start)} locale='en-US' />
        }
        else if (diffDuration.weeks() <= 1) {
            return format(new Date(start), 'iiii, h:m aaa')
        } else {
            return format(new Date(start), 'MMM dd, yyy')
        }
    }

    return (
        <Card className='border-0 rounded-0 shadow-sm p-3'>
            <Card.Body>
                <p className="mt-0 mb-4 fw-bold position-relative">
                    Announcements
                    <div className="w-[10px] h-[10px] rounded-cirlce"></div>
                </p>
                {fetching ? (
                    <PlaceHolders />
                ) : (
                    announcements.length > 0 ? (
                        announcements.map((announcement, index) => (
                            <div className='mb-2 '>
                                <Row>
                                    <div className='col col-auto'>
                                        <Image
                                            src={announcement.image}
                                            className='shadow-sm'
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <Col>
                                        <p className="mt-0 mb-1 text-sm fw-bolder text-secondary">
                                            {announcement.title}
                                        </p>
                                        <div className="col-2 text-truncate">
                                            <p className="mt-0 mb-1 text-sm text-black-50">
                                                {announcement.content}
                                            </p>
                                        </div>
                                        <p className="mt-2 text-sm text-black-50">
                                            <small>{dateTimeLabel(new Date(announcement.updated_at || announcement.created_at), new Date())}</small>
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                        ))
                    ) : (
                        <p className='text-sm text-secondary'>Nothing to show.</p>
                    )
                )}
            </Card.Body>
        </Card>
    )
}

const UnitHeadDashboard = () => {

    return (
        <Row>
            <Col xs={12} lg={6}>
                <AnnouncementsCard />
            </Col>
            <Col>

            </Col>
        </Row>
    )
}

export default UnitHeadDashboard