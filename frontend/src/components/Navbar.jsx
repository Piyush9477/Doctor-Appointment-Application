import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Doctor Appointment</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/appointments">Appointments</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/wallet">Wallet</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reports">Reports</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
