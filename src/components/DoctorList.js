import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // For navigation

const DoctorList = () => {
  const doctors = [
    { id: 1, name: 'Dr. Smith', availableSlot: '10:00 AM - 12:00 PM' },
    { id: 2, name: 'Dr. Johnson', availableSlot: '2:00 PM - 4:00 PM' },
  ];

  return (
    <div className="doctor-list">
      <h2 className="text-center my-4">Doctor Availability</h2>

      {/* Create Appointment Button */}
      <div className="text-center mb-4">
        <Link to="/create-appointment">
          <Button variant="primary" size="lg">
            Create Appointment
          </Button>
        </Link>
      </div>

      {/* Doctor List Table */}
      <Table striped bordered hover responsive className="shadow-lg rounded">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Doctor Name</th>
            <th>Available Slot</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={doctor.id}>
              <td>{index + 1}</td>
              <td>{doctor.name}</td>
              <td>{doctor.availableSlot}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DoctorList;
