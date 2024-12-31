import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';

const AppointmentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointment } = location.state || {};

  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [isRescheduling, setIsRescheduling] = useState(false);

  if (!appointment) {
    return <h4>No appointment details found</h4>;
  }

  const handleReschedule = () => {
    if (newDate && newTime) {
      // Simulate rescheduling the appointment
      appointment.appointmentDate = newDate;
      appointment.slot = newTime;
      alert(`Appointment rescheduled to ${newDate} at ${newTime}`);
      setIsRescheduling(false); // Hide reschedule form
    } else {
      alert("Please select a new date and time.");
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (confirmDelete) {
      // Simulate deleting the appointment
      alert("Appointment deleted.");
      navigate("/"); // Redirect to home or another page
    }
  };

  return (
    <div className="appointment-details">
      <h2 className="text-center my-4">Appointment Details</h2>
      <Card className="shadow-lg p-4 mb-4">
        <Card.Body>
          <h4 className="mb-3">Patient Information</h4>
          <p><strong>Patient Name:</strong> {appointment.patientName}</p>
          <p><strong>Doctor:</strong> {appointment.doctorName}</p>
          <p><strong>Slot:</strong> {appointment.slot}</p>
          <p><strong>Appointment Date:</strong> {appointment.appointmentDate}</p>

          {/* Reschedule Button and Form */}
          {isRescheduling ? (
            <div>
              <Form.Group className="mb-3">
                <Form.Label>New Date</Form.Label>
                <Form.Control
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Time</Form.Label>
                <Form.Control
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="success" onClick={handleReschedule}>
                Reschedule Appointment
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant="primary"
                onClick={() => setIsRescheduling(true)}
                className="me-2"
              >
                Reschedule Appointment
              </Button>
            </div>
          )}

          <div className="mt-3">
            <Button variant="danger" onClick={handleDelete}>
              Delete Appointment
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AppointmentDetails;

