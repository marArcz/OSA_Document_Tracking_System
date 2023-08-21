import CommentsView from '@/Components/CommentsView';
import HeaderTitle from '@/Components/HeaderTitle';
import PanelLayout from '@/Layouts/PanelLayout'
import { usePage } from '@inertiajs/react';
import React, { useState } from 'react'
import { Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

const ViewReport = ({ report }) => {
    const [selectedFile, setSelectedFile] = useState(report.attachments[0]);
    const { prevPage, auth } = usePage().props
    console.log(report)
    return (
        <PanelLayout
            headerTitle={(
                <HeaderTitle
                    text='Unit Head Report'
                    backButton
                    backButtonLink={prevPage}
                />
            )}
            defaultActiveLink="submission-bins"
        >
            <div className="p-3">
                <Row className='gy-3 gx-1 h-100'>
                    <Col className='h-100'>
                        <DocViewer documents={[selectedFile]} pluginRenderers={DocViewerRenderers} />
                    </Col>
                    <Col xl={3} lg={4} className='h-100'>
                        {
                            report.attachments.length > 1 && (
                                <Card className='border-0 shadow-sm rounded-0 p-2 h-100 mb-3'>
                                    <Card.Body className='h-100'>
                                        <p className='text-sm fw-bold'>Attachments</p>
                                        <hr />
                                        <ListGroup variant='flush'>
                                            {
                                                report.attachments.map((att, index) => (
                                                    <ListGroupItem className={` cursor-pointer ${att.id === selectedFile.id ? 'bg-light-primary rounded-1' : ''}`} onClick={() => setSelectedFile(att)}>
                                                        {att.name}
                                                    </ListGroupItem>
                                                ))
                                            }
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            )
                        }
                        <Card className='border-0 shadow-sm rounded-0 p-2 h-100 mb-3'>
                            <Card.Body className='h-100'>
                                <p className='text-sm fw-bold'>Private Comments</p>
                                <hr />
                                <CommentsView user={auth.user} submissionBin={report.submission_bin} unitHead={report.unit_head} />
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </div>
        </PanelLayout>
    )
}

export default ViewReport