import React, { useState, useRef } from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const EventList = ({ events }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchInput = useRef(null);

  const updateSearchTerm = () => {
    setSearchTerm(searchInput.current.value);
    console.log(searchInput.current.value);
  };

  const matchSearchTerm = (obj) => {
    const { id, published, created_at, ...rest } = obj;
    return Object.values(rest).some(
      (value) => value.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1
    );
  };

  const renderEvents = (eventArray) => {
    return eventArray
    .filter((el) => matchSearchTerm(el))
    .sort((a, b) => new Date(b.event_date) - new Date(a.event_date))
    .map((event) => (
      <li key={event.id} className="list-group-item">
        <NavLink to={`/events/${event.id}`} className = "nav-link">
          {event.event_date}
          {' - '}
          {event.event_type}
        </NavLink>
      </li>
    ));

  };

  return(
    <section>
      <input
        className='form-control'
        placeholder='Search'
        type="search"
        ref={searchInput}
        onKeyUp={updateSearchTerm}
      />
      <ul className="list-group mt-2">{renderEvents(events)}</ul>
    </section>
  );
};

EventList.propTypes = {
  events: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number,
    event_type: propTypes.string,
    event_date: propTypes.string,
    title: propTypes.string,
    speaker: propTypes.string,
    host: propTypes.string,
    published: propTypes.bool,
  })).isRequired,

};

export default EventList;