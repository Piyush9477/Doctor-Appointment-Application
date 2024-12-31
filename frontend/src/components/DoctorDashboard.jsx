import React from 'react';

function DoctorDashboard() {
  return (
    <div>
      <h3>Doctor Dashboard</h3>
      <div className="card p-3 mb-3">
        <h5>Today's Appointments</h5>
        <ul>
          <li>John Doe - 10:00 AM</li>
          <li>Jane Smith - 11:30 AM</li>
        </ul>
      </div>
      <button className="btn btn-success">View Patient Records</button>
    </div>
  );
}

export default DoctorDashboard;
