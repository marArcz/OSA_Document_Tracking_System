import CardComponent from '@/Components/CardComponent'
import PanelLayout from '@/Layouts/PanelLayout'
import { Link } from '@inertiajs/react'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Card, Form, Nav, Spinner, Table } from 'react-bootstrap'
import DataTable from 'react-data-table-component'

const Admins = () => {
    const [rows, setRows] = useState([])
    const [fetching, setFetching] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])

    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    useEffect(() => {
        const fetchAllAdmins = () => {
            axios.get('/admins')
                .then((res) => {
                    console.log(res);
                    setRows(res.data.admins);
                    setFetching(false)
                })
        }

        setFetching(true);
        fetchAllAdmins();
    }, []);

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
            name: 'Email',
            selector: row => row.email
        },
        {
            name: 'Campus',
            selector: row => row.campus.name
        },{
            name:'',
            button:true,
            cell: row => (
                <Link href={route('admin.campus_admin.edit',{id:row.id})} className='fs-5 link-success nav-link'>
                    <i className='fi fi-rr-pen-square'></i>
                </Link>
            ),
            grow:0
        }
    ]

    return (
        <PanelLayout headerTitle="Campus Admins" defaultActiveLink='admins'>
            <div className="py-3 px-[1.5rem]">
                <CardComponent>
                    <Card.Body>
                        <div className=' flex align-items-center gap-4'>
                            <div>
                                <Link className='link-primary nav-link' href={route('admin.admins.create')}>
                                    <div className="flex gap-2 items-center fw-medium text-sm">
                                        <i className='fi fi-rr-square-plus'></i>
                                        <span>Create New</span>
                                    </div>
                                </Link>
                            </div>
                            <div className='cursor-pointer'>
                                <div className="flex gap-2 items-center text-primary fw-medium text-sm">
                                    <i className='fi fi-rr-refresh'></i>
                                    <span>Refresh</span>
                                </div>
                            </div>
                            <div className='cursor-pointer'>
                                <button disabled={selectedRows.length == 0} type='button' className="d-flex align-items-center text-decoration-none gap-2 items-center btn btn-link link-danger btn-sm fw-medium text-sm">
                                    <i className='fi fi-rr-trash'></i>
                                    <span>Delete Selected</span>
                                </button>
                            </div>
                        </div>
                        <hr />
                        {/* <Table className='' responsive>
                            <thead>
                                <tr>
                                    <th scope='col' className=''>
                                        <Form.Check
                                            type="checkbox"
                                            title='Select All'
                                        />
                                    </th>
                                    <th>Lastname</th>
                                    <th>Firstname</th>
                                    <th>Middlename</th>
                                    <th>Campus</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    fetching ? (
                                        <tr>
                                            <td colSpan={6} className='text-center'>
                                                <Spinner variant='secondary' className='mt-3' size='sm' />
                                            </td>
                                        </tr>
                                    ) : (
                                        rows && rows.map((row, index) => (
                                            <tr>
                                                <td className=''>
                                                    <Form.Check
                                                        type="checkbox"
                                                        title='Select All'
                                                    />
                                                </td>
                                                <td>{row.lastname}</td>
                                                <td>{row.firstname}</td>
                                                <td>{row.middlename}</td>
                                                <td>{row.campus.name}</td>
                                                <td>
                                                    <Link className='link-success nav-link'>
                                                        <i className='fi fi-rr-pen-square fs-5'></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </Table> */}
                        <DataTable
                            expandableRows
                            expandableRowsComponent={ExpandedComponent} 
                            columns={columns} 
                            data={rows} 
                            selectableRows 
                            onSelectedRowsChange={(s => setSelectedRows(s.selectedRows))} 
                            pagination
                            progressPending={fetching}
                            progressComponent={<Spinner size='sm'/>}
                            />
                    </Card.Body>
                </CardComponent>
            </div>
        </PanelLayout>
    )
}

export default Admins