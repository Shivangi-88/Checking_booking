import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateAppointment = () => {
  const [doctor, setDoctor] = useState('');
  const [slot, setSlot] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const doctors = [
    { id: 1, name: 'Dr. Smith', availableSlot: '10:00 AM - 12:00 PM' },
    { id: 2, name: 'Dr. Johnson', availableSlot: '2:00 PM - 4:00 PM' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate API call to create appointment
    const newAppointment = {
      doctorName: doctor,
      slot: slot,
      patientName: name,
      appointmentDate: new Date().toLocaleString(),
    };

    // Redirect to the appointment details page
    navigate('/appointment-details', { state: { appointment: newAppointment } });
  };

  return (
    <div className="create-appointment">
      <h2 className="text-center my-4">Create Appointment</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Select Doctor</Form.Label>
              <Form.Control
                as="select"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                required
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.name}>
                    {doctor.name} - {doctor.availableSlot}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Select Slot</Form.Label>
              <Form.Control
                as="select"
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                required
              >
                <option value="">Select a time slot</option>
                {doctor && doctors.find((doc) => doc.name === doctor)?.availableSlot.split(" - ").map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="w-100">
          Create Appointment
        </Button>
      </Form>
    </div>
  );
};

export default CreateAppointment;

