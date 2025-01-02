import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAppointment from './components/CreateAppointment';
import AppointmentDetails from './components/AppointmentDetails';
import DoctorList from './components/DoctorList';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <Router>
      <Container fluid className="p-5">
        <h1 className="display-4 text-center mb-4">Appointment Management System</h1>

        <Routes>
          <Route path="/" element={<DoctorList />} />
          <Route path="/create-appointment" element={<CreateAppointment />} />
          <Route path="/appointment-details" element={<AppointmentDetails />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

