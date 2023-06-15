import React from 'react';
import propTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Event = ( { events, onDelete }) => {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));

  return(
    <div className="card">
      <h5 className="card-header">
        {event.event_date}
        {' - '}
        {event.event_type}
      </h5>
      <div className="card-body">
        <ul>
          <li>
            <strong>Type:</strong>
            {event.event_type}
          </li>
          <li>
            <strong>Date:</strong>
            {event.event_date}
          </li>
          <li>
            <strong>Title:</strong>
            {event.title}
          </li>
          <li>
            <strong>Speaker:</strong>
            {event.speaker}
          </li>
          <li>
            <strong>Host:</strong>
            {event.host}
          </li>
          <li>
            <strong>published:</strong>
            {event.published}
          </li>
        </ul>
        <Link to = {`/events/${event.id}/edit`} className = "btn btn-warning">Edit</Link>
        &nbsp; &nbsp;
        <button 
          className='btn btn-danger'
          type='button'
          onClick={ () => onDelete(event.id) }>
          Delete 
        </button>
      </div>
    </div>
  );
};

Event.propTypes = {
  events: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      event_type: propTypes.string.isRequired,
      event_date: propTypes.string.isRequired,
      title: propTypes.string.isRequired,
      speaker: propTypes.string.isRequired,
      host: propTypes.string.isRequired,
      published: propTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: propTypes.func.isRequired,
};

export default Event;

