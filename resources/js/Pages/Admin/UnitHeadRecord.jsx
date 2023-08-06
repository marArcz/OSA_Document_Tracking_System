import PanelLayout from '@/Layouts/PanelLayout'
import { Link } from '@inertiajs/react'
import React from 'react'
import { Button, Card, Table } from 'react-bootstrap'

const UnitHeadRecord = () => {
    return (
        <PanelLayout headerTitle="Unit Heads" defaultActiveLink="unit-heads/records">
            <div className="py-3 px-[1.5rem]">
                <Card className='border-0 shadow-sm py-2 px-3'>
                    <Card.Body>
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <p className="my-0 fw-bold">List of Unit Heads</p>
                            </div>
                        </div>
                        <div className="mb-2">
                            <Button as={Link} variant='light-primary' size='sm' className='rounded-1' href={route('admin.unit_heads.create')}>
                                <i className="bx bx-plus"></i>
                                <span>Add New</span>
                            </Button>
                        </div>
                        {/* <hr /> */}
                        <Table>
                            <thead className='bg-secondary'>
                                <tr>
                                    <th>Lastname</th>
                                    <th>Firstname</th>
                                    <th>Classification</th>
                                    <th>Designation</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        </PanelLayout>
    )
}

export default UnitHeadRecord