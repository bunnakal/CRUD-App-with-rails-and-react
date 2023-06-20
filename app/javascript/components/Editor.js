import React, { useState, useEffect } from 'react';
import Header from './Header';
import EventList from './EventList';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Event from './Event';
import EventForm from './EventForm';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

const Editor = ({currUser, setCurrUser}) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await window.fetch('/api/events');
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        // console.error(error);
        handleAjaxError(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const addEvent = async (newEvent) => {
    try {
      const response = await window.fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(newEvent),
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);

      const savedEvent = await response.json();
      const newEvents = [...events, savedEvent];
      setEvents(newEvents);
      // window.alert('Event Added!');
      success('Event Added!');
      navigate(`/events/${savedEvent.id}`);

    } catch (error){
      // console.error(error);
      handleAjaxError(error);
    }
  };

  const deleteEvent = async (eventId) => {
    const sure = window.confirm('Are you sure?');

    if (sure) {
      try {
        const response = await window.fetch(`/api/events/${eventId}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw Error(response.statusText);
        // window.alert('Event Deleted!');
        success('Event Deleted!')
        navigate('/events');
        setEvents(events.filter(event => event.id !== eventId))
      }catch (error){
        // console.error(error);
        handleAjaxError(error);
      }
    }
  };

  const updateEvent = async (updateEvent) => {
    try{
      const response = await window.fetch(`/api/events/${updateEvent.id}`, 
        {
          method: 'PUT',
          body: JSON.stringify(updateEvent),
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw Error(response.statusText);

      const newEvents = events;
      const idx = newEvents.findIndex((event) => event.id === updateEvent.id);
      newEvents[idx] = updateEvent;
      setEvents(newEvents);

      success('Event Updated!');
      navigate(`/events/${updateEvent.id}`);

    }catch (error){
      handleAjaxError(error);
    }
  };

  return(
    <>
      <Header currUser={currUser} setCurrUser={setCurrUser} />
      {isLoading ? <p>Loading...</p> : (
        <div className='container mt-4'>
          <div className='row'>
            <div className='col-md-4'>
              <EventList events = {events} />
            </div>
            <div className='col-md-8'>
              <Routes>
                <Route 
                  path="new" 
                  element={ <EventForm onSave = { addEvent } /> } 
                />
                <Route 
                  path=":id" 
                  element={ <Event events= { events } onDelete = { deleteEvent } /> } 
                />
                <Route
                  path=":id/edit"
                  element = { <EventForm events = { events }n onSave={ updateEvent } />}
                >
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );

};

export default Editor;