import React from 'react';
import AppointmentList from './AppointmentList';
import DoctorList from './DoctorList';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1 className="text-center">Admin Dashboard</h1>
            <div className="content">
                <AppointmentList />
                <DoctorList />
            </div>
        </div>
    );
};

export default Dashboard;
