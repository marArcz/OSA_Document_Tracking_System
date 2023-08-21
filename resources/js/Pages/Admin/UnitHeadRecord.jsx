import PanelLayout from '@/Layouts/PanelLayout'
import { Link } from '@inertiajs/react'
import React from 'react'
import { useState } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import DataTable from 'react-data-table-component'

const UnitHeadRecord = ({ unitHeads }) => {
    const [rows, setRows] = useState([...unitHeads])
    const columns = [
        {
            name: 'Lastname',
            selector: row => row.lastname
        },
        {
            name: 'Firstname',
            selector: row => row.firstname
        },
        {
            name: 'Middlename',
            selector: row => row.middlename
        },
        {
            name: 'Classification',
            selector: row => row.designation.classification.name
        },
        {
            name: 'Designation',
            selector: row => row.designation.name,
            title: row => row.designation.name
        },
        {
            name: '',
            button: true,
            cell: row => (
                <Link href={route('admin.unit_heads.edit', { id: row.id })} className='fs-5 link-success nav-link'>
                    <i className='fi fi-rr-pen-square'></i>
                </Link>
            ),
            grow: 0
        }
    ]
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
                            <div className=' flex align-items-center gap-4'>
                                <div>
                                    <Link className='link-primary nav-link' href={route('admin.unit_heads.create')}>
                                        <div className="flex gap-2 items-center fw-medium text-sm">
                                            <i className='fi fi-rr-square-plus'></i>
                                            <span>Create New</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className='cursor-pointer'>
                                    <button className="d-flex gap-2 align-items-center text-decoration-none fw-medium text-sm btn btn-link btn-sm link-primary">
                                        <i className='fi fi-rr-refresh'></i>
                                        <span>Refresh</span>
                                    </button>
                                </div>
                                <div className='cursor-pointer'>
                                    <button type='button' className="d-flex align-items-center text-decoration-none gap-2 items-center btn btn-link link-danger btn-sm fw-medium text-sm">
                                        <i className='fi fi-rr-trash'></i>
                                        <span>Delete Selected</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <hr /> */}
                        <DataTable selectableRows columns={columns} data={rows}/>
                    </Card.Body>
                </Card>
            </div>
        </PanelLayout>
    )
}

export default UnitHeadRecord