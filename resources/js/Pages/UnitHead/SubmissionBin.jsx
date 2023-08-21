import AddFileButton from '@/Components/AddFileButton'
import CardComponent from '@/Components/CardComponent'
import CommentsView from '@/Components/CommentsView'
import ModalComponent from '@/Components/ModalComponent'
import PanelLayout from '@/Layouts/PanelLayout'
import { Link } from '@inertiajs/react'
import axios from 'axios'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Placeholder, Row } from 'react-bootstrap'
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'
import ReactTimeAgo from 'react-time-ago'

const SubmissionBin = ({ submissionBin, auth, report }) => {
    const [showFileModal, setShowFileModal] = useState(false);
    const [viewFile, setViewFile] = useState(null)
    const [isFetchingComments, setIsFetchingComments] = useState(true)
    const [comments, setComments] = useState([]);
    const [files, setFiles] = useState(
        report?.attachments.map((a, i) => ({ ...a, uploaded: true })) || []
    );

    const showFile = (file) => {
        setViewFile(file)
        setShowFileModal(true)
    }

    const submitReports = () => {

    }

    return (
        <PanelLayout
            defaultActiveLink="reports"
            headerTitle={"Accomplishment Report"}
        >
            <ModalComponent
                className={"rounded-0 bg-transparent"}
                show={showFileModal}
                handleClose={() => {
                    setShowFileModal(s => !s)
                    setViewFile(null)
                }}
                closeButton
                title={submissionBin.title}
                size='xl'
            >
                {
                    viewFile && (
                        <DocViewer
                            pluginRenderers={DocViewerRenderers}
                            documents={[
                                { uri: viewFile.uri }
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
            <div className="px-[1.5rem] py-3">
                <p className='fs-6 text-primary'>
                    {auth.user?.campus?.name} Campus
                </p>
                <hr />
                <Card className='rounded-3 border-0 shadow-sm '>
                    <Card.Body className='p-4'>
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
                                    <p className='my-1'>
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
                {/* report comments */}
                <Row className='mt-3 gy-2'>
                    <Col className=''>
                        <Card className='rounded-3 border-0 bg-white shadow-sm'>
                            <Card.Body>
                                <p className="my-1">
                                    Private Comments
                                </p>
                                <div className="mt-4">
                                    <CommentsView unitHead={auth.user} user={auth.user} submissionBin={submissionBin} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} className=''>
                        <Card className='rounded-3 border-0 shadow-sm border-bottom border-2 border-primary'>
                            <Card.Body>
                                <p className="my-1 text-primary">
                                    Your Report
                                </p>
                                {
                                    report?.is_submitted ? (
                                        <p className='my-0 text-sm text-success text-end fw-bold'>
                                            <span className="me-1">{report.status}</span>
                                            {/* <i className='bx bxs-check-circle '></i> */}
                                        </p>
                                    ) : (
                                        files.length <= 0 && (
                                            <p className="my-0 text-sm fw-bold">No submission yet.</p>
                                        )
                                    )
                                }
                                <div className="mt-3 mb-2">
                                    <AddFileButton removable={!report?.is_submitted} disableAddingFile={report?.is_submitted} accept='application/pdf' handleViewFile={showFile} submissionBinId={submissionBin.id} userId={auth.user.id} files={files} setFiles={setFiles} />
                                    {
                                        files && files.length > 0 && (
                                            report?.is_submitted ? (
                                                <Button variant='secondary' as={Link} method='patch' href={route('reports.unsubmit', { id: submissionBin.id })} className='col-12 rounded-1 mt-2'>
                                                    <small>Unsubmit</small>
                                                </Button>
                                            ) : (
                                                <Button variant='primary' as={Link} method='patch' href={route('reports.submit', { id: submissionBin.id })} className='col-12 rounded-1 mt-2'>
                                                    <small>Submit Report</small>
                                                </Button>
                                            )
                                        )
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

export default SubmissionBin