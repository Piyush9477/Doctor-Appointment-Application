import React from 'react';

function Sidebar({ role }) {
  return (
    <div className="bg-light p-3 vh-100" style={{ width: '250px' }}>
      <h4 className="text-center mb-4">Dashboard</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link" href="#">Home</a>
        </li>
        {role === 'patient' && (
          <>
            <li className="nav-item">
              <a className="nav-link" href="#">My Appointments</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Book Appointment</a>
            </li>
          </>
        )}
        {role === 'doctor' && (
          <>
            <li className="nav-item">
              <a className="nav-link" href="#">Today's Appointments</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Patient Records</a>
            </li>
          </>
        )}
        <li className="nav-item">
          <a className="nav-link text-danger" href="/logout">Logout</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
