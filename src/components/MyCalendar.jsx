import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarEvent from './CalendarEvent';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('.').map(Number);
    return new Date(year, month - 1, day);
  };

  const myEvents = events.map((event) => ({
    ...event,
    start: parseDate(event.date),
    end: parseDate(event.date),
  }));

  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {
      backgroundColor: event.status ? 'blue' : 'green',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style: style,
    };
  };

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        components={{
          event: CalendarEvent,
        }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default MyCalendar;
