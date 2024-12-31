import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from '../utils/axios';

const RebookingForm = () => {
    const [formData, setFormData] = useState({ appointmentId: '', newDate: '', newTime: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/appointments/reschedule', formData);
            alert('Appointment rescheduled successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to reschedule appointment');
        }
    };
      

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Appointment ID</Form.Label>
                <Form.Control type="text" name="appointmentId" onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>New Date</Form.Label>
                <Form.Control type="date" name="newDate" onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>New Time</Form.Label>
                <Form.Control type="time" name="newTime" onChange={handleChange} required />
            </Form.Group>
            <Button type="submit">Reschedule</Button>
        </Form>
    );
};

export default RebookingForm;
