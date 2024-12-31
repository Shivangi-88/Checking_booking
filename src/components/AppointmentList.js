import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const AppointmentList = ({ handleRebook }) => {
  const [appointments, setAppointments] = useState([]); // State to store appointments

  // Fetch appointments when the component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/appointments");
        setAppointments(response.data); // Assuming the response is an array of appointments
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <ul className="list-group">
      {appointments.map((appointment) => (
        <li className="list-group-item" key={appointmentId}>
          <strong>{appointment.doctorName}</strong> - Available Slot: {appointment.time}
          <Button
            variant="success"
            className="float-end"
            onClick={() => handleRebook(appointmentId)}
          >
            Rebook
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default AppointmentList;

