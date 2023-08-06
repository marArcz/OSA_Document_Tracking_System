import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalComponent = ({ backdrop = true, centered = false, show = false, handleClose, title = "", children, size = "md" }) => {
    return (
        <Modal backdrop={backdrop} show={show} centered={centered} onHide={handleClose} size={size}>
            {title !== '' && (
                <Modal.Header>{title}</Modal.Header>
            )}
            <Modal.Body className='p-4'>
                {children}
            </Modal.Body>
        </Modal>
    )
}

export default ModalComponent