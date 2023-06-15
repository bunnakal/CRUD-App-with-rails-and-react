import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
        <Link to="/events" className="navbar-brand d-flex w-50 me-auto">
          <h3>Event Manager</h3>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsingNavbar3">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse w-100" id="collapsingNavbar3">
          <input className="form-control w-100 justify-content-end" type="search" placeholder="Search" aria-label="Search"/>
          <ul className="nav navbar-nav ms-auto w-100 justify-content-end">
            <li className="nav-item">
                <Link className="btn btn-success" to="/events/new">New Event</Link>
            </li>
          </ul>
        </div>
    </div>
</nav>

);

export default Header;