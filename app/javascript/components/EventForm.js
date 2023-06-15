import React, { useState, useRef, useEffect } from 'react';
import { isEmptyObject, validateEvent, formatDate} from '../helpers/helpers';
import Pikaday from 'pikaday';
import propTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';

const EventForm = ({ events, onSave })=> {

  const [formErrors, setFormErrors] = useState({});

  const { id } = useParams();

  const defaults = {
    event_type: '',
    event_date: '',
    title: '',
    speaker: '',
    host: '',
    published: false
  }

  const currEvent =  id? events.find((e) => e.id == Number(id)) : {};
  const initialEventState = { ...defaults, ...currEvent};
  const [event, setEvent] = useState(initialEventState);

  const dateInput = useRef(null);

  const updateEvent = (key, value) => {
    setEvent((prevEvent) => ({ ...prevEvent, [key]: value }));
  };

  useEffect(() => {
    const p = new Pikaday({
      field: dateInput.current,
      toString: date => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        dateInput.current.value = formattedDate;
        updateEvent('event_date', formattedDate);
      },
    });

    // Return a cleanup function
    // React will call this prior to unmounting.
    return () => p.destroy();

  }, []);

  useEffect(() => {
    setEvent(initialEventState);
  }, [events]);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    // setEvent({...event, [name]: value});
    updateEvent(name, value)

  };

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) {
      return null;
    }

    return(
      <div className='errors'>
        <h3>The following errors prohibited the event from being saved:</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key = {formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateEvent(event);

    if (!isEmptyObject(errors)){
      setFormErrors(errors);
    }else{
      onSave(event);
      console.log(event);
    }
  };

  const cancelURL = event.id ? `/events/${event.id}` : '/events';
  const title = event.id ? `${event.event_date} - ${event.event_type}` : 'New Event';


  return(
    <section>
      { renderErrors() }
      <h2 className='h4'> { title }</h2>
      <form onSubmit={ handleSubmit }> 
        <div className="mb-2">
          <label htmlFor="event_type" className="form-label">Event type</label>
          <input 
            type="text" 
            className="form-control" 
            id="event_type" 
            name = "event_type" 
            value = {event.event_type}
            onChange={ handleInputChange }
          />
        </div>
        <div className="mb-2">
          <label htmlFor='event_date'>Event date</label>
          <input 
            type="text" 
            className = "form-control" 
            id='event_date' name='event_date' 
            ref = { dateInput }
            autoComplete="off"
            value={ event.event_date }
            onChange = { handleInputChange }
          />
        </div>
        <div className="mb-2">
          <label htmlFor='title'>Event title</label>
          <textarea 
            className='form-control' 
            rows="3" id='title' 
            name='title' 
            value={ event.title }
            onChange={handleInputChange}>
          </textarea>
        </div>
        <div className="mb-2">
          <label htmlFor='speaker'>Event Speaker</label>
          <input 
            className='form-control' 
            type="text" id='speaker' 
            name='speaker' 
            value={ event.speaker }
            onChange={ handleInputChange }>
          </input>
        </div>
        <div className="mb-2">
          <label htmlFor='host'>Event host</label>
          <input 
            className='form-control' 
            type="text" 
            id='host' 
            name='host' 
            value={ event.host }
            onChange={ handleInputChange }>
          </input>
        </div>
        <div className="form-check mb-2">
          <input 
            className="form-check-input" 
            type="checkbox" 
            value="" 
            id="published" 
            name='published' 
            checked = { event.published }
            onChange={ handleInputChange }
          />
          <label className="form-check-label" htmlFor="published">
            Published
          </label>
        </div>
        <div className='form-actions mb-2'>
          <button className='btn btn-primary' type = "submit">Save</button>
          &nbsp; &nbsp;
          <Link to= { cancelURL } className = "btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </section>
  );

};

export default EventForm;

EventForm.propTypes = {
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
  ),
  onSave: propTypes.func.isRequired,
};

EventForm.defaultProps = {
  events: []
};