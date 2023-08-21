import CommentsView from '@/Components/CommentsView';
import FileIcon from '@/Components/FileIcon';
import HeaderTitle from '@/Components/HeaderTitle';
import ModalComponent from '@/Components/ModalComponent';
import PanelLayout from '@/Layouts/PanelLayout'
import { Head, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

const ViewReport = ({ report }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const { prevPage, auth } = usePage().props
    const [showFileModal, setShowFileModal] = useState(false)
    console.log(report)

    useEffect(() => {
        setSelectedFile(report.attachments[0]);
    }, [])

    return (
        <PanelLayout
            headerTitle={(
                <HeaderTitle
                    text='Unit Head Report'
                    backButton
                    backButtonLink={route('admin.reports.view',{submission_bin_id:report.submission_bin.id})}
                />
            )}
            defaultActiveLink="submission-bins"
        >
            <ModalComponent
                className={"rounded-0 bg-transparent"}
                show={showFileModal}
                handleClose={() => {
                    setShowFileModal(s => !s)
                }}
                closeButton
                title={report.submission_bin.title}
                size='fullscreen'
            >
                {
                    report.attachments.length > 0 && (
                        <div className="overflow-x-auto custom-scroll">
                            <div className="flex gap-x-3 flex-nowrap">
                                {
                                    report.attachments.map((att, index) => (
                                        // <ListGroupItem key={index} className={` cursor-pointer ${att.id === selectedFile.id ? 'bg-light-primary rounded-1' : ''}`} onClick={() => setSelectedFile(att)}>
                                        //     {att.name}
                                        // </ListGroupItem>
                                        <div onClick={() => setSelectedFile(att)} className={`text-center rounded p-3 cursor-pointer ${selectedFile?.id === att.id ? 'bg-light' : ''}`} title={att.name}>
                                            <FileIcon
                                                file={att}
                                                className={"mx-auto"}
                                                size='xs'
                                            />
                                            <p className="text-center text-xs mt-3 mb-0 col-11 text-truncate">
                                                <small>{att.name}</small>
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
                <hr className='my-1' />
                {
                    selectedFile && (
                        <DocViewer
                            pluginRenderers={DocViewerRenderers}
                            documents={[
                                { uri: selectedFile.uri }
                            ]}
                            config={
                                {
                                    zoom: 1
                                }
                            }
                        />
                        // <>
                        // <iframe className='w-100 h-[90vh]' src={viewFile.uri}/>
                        // </>
                    )
                }
            </ModalComponent>
            <Head title={report.unit_head.firstname + " " + report.unit_head.lastname + ' | ' + report.submission_bin.title} />
            <div className="p-3">
                <Row className='gy-3 gx-2 h-100'>
                    <Col className='h-100'>
                        {
                            report.attachments.length > 1 && (
                                <Card className='border-0 shadow-sm rounded-0 p-2 h-100 mb-2'>
                                    <Card.Body className='h-100'>
                                        <p className='text-sm fw-bold'>Attachments</p>
                                        <hr />
                                        <div className="overflow-x-auto custom-scroll">
                                            <div className="flex gap-x-3 flex-nowrap">
                                                {
                                                    report.attachments.map((att, index) => (
                                                        // <ListGroupItem key={index} className={` cursor-pointer ${att.id === selectedFile.id ? 'bg-light-primary rounded-1' : ''}`} onClick={() => setSelectedFile(att)}>
                                                        //     {att.name}
                                                        // </ListGroupItem>
                                                        <div onClick={() => setSelectedFile(att)} className={`text-center rounded p-3 cursor-pointer ${selectedFile?.id === att.id ? 'bg-light' : ''}`} title={att.name}>
                                                            <FileIcon
                                                                file={att}
                                                                className={"mx-auto"}
                                                                size='sm'
                                                            />
                                                            <p className="text-center mt-3 mb-0 col-11 text-sm text-truncate">
                                                                <small>{att.name}</small>
                                                            </p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        }
                        {
                            selectedFile && (
                                <Card className='rounded-0 border-0 shadow-sm '>
                                    <Card.Header className="bg-white py-3">
                                        <div className="flex items-center">
                                            <p className="my-0 text-sm fw-bold">{selectedFile.name}</p>
                                            <div className='ms-auto'>
                                                <Button variant='light' onClick={() => setShowFileModal(true)} className='d-flex align-items-center text-dark'>
                                                    <i className=' bx bx-fullscreen'></i>
                                                    <span className='ms-2 text-sm'>Fullscreen</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        {
                                            !showFileModal && (

                                                <DocViewer
                                                    documents={[selectedFile]}
                                                    pluginRenderers={DocViewerRenderers}
                                                    theme="tertiary"
                                                    config={{
                                                        header: {
                                                            disableHeader: true
                                                        },
                                                    }}
                                                />
                                            )
                                        }
                                    </Card.Body>
                                </Card>
                            )
                        }
                    </Col>
                    <Col xl={3} lg={4} className='h-100'>

                        <Card className='border-0 shadow-sm rounded-0 p-2 h-100 mb-2'>
                            <Card.Body className='h-100'>
                                <p className='text-sm fw-bolder'>Submitted By</p>
                                <hr />
                                <div className='flex gap-2 w-100'>
                                    <div>
                                        <Image
                                            src={report.unit_head.image}
                                            width={50}
                                            height={50}
                                            roundedCircle
                                        />
                                    </div>
                                    <div className='w-100 '>
                                        <p className="my-0">{report.unit_head.firstname + ' ' + report.unit_head.lastname}</p>
                                        <p className="my-0 text-secondary text-sm">
                                            <small>Unit Head</small>
                                        </p>
                                        {/* <hr className='my-1' /> */}
                                        <p className=' mt-2 mb-0 text-sm text-dark'>
                                            {report.unit_head.campus.name} Campus
                                        </p>
                                    </div>
                                </div>

                            </Card.Body>
                        </Card>
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