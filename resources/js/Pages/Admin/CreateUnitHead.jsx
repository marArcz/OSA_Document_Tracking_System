import CardComponent from '@/Components/CardComponent'
import PanelLayout from '@/Layouts/PanelLayout'
import React from 'react'
import { Form } from 'react-bootstrap'

const CreateUnitHead = () => {
    return (
        <PanelLayout headerTitle="Create Unit Head" defaultActiveLink="unit-heads/records">
            <CardComponent>
                <Card.Body>
                    <Form>
                        <Form.Label>Firstname:</Form.Label>
                        <Form.Control/>
                    </Form>
                </Card.Body>
            </CardComponent>
        </PanelLayout>
    )
}

export default CreateUnitHead