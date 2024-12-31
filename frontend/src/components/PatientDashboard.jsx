import React from 'react';

function PatientDashboard() {
  return (
    <div>
      <h3>Patient Dashboard</h3>
      <div className="card p-3 mb-3">
        <h5>Upcoming Appointments</h5>
        <ul>
          <li>Dr. Smith - June 25, 10:00 AM</li>
          <li>Dr. Jane - June 28, 2:00 PM</li>
        </ul>
      </div>
      <button className="btn btn-primary">Book New Appointment</button>
    </div>
  );
}

export default PatientDashboard;
