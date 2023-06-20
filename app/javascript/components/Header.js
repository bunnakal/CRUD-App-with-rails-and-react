import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const Header = ({ currUser, setCurrUser }) => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/events" className="navbar-brand d-flex w-50 me-auto">Hello, {currUser.email}</Link>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="btn btn-success" to="/events/new">New Event</Link>
          </li>
          <li>&nbsp; &nbsp;</li>
          <li>
          <Logout setCurrUser={setCurrUser} />
          </li>
        </ul>
      </div>
  </nav>
)

};

export default Header;