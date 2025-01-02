import React, { useState } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';

const AvailableSlots = ({ slots, onSelect }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                View Available Slots
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Available Slots</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {slots.map((slot, index) => (
                            <ListGroup.Item action onClick={() => onSelect(slot)} key={index}>
                                {slot.date} - {slot.time}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AvailableSlots;
