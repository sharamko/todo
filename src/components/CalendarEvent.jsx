import React from 'react';

const CalendarEvent = ({ event }) => {
  return (
    <a style={{ color: 'white', textDecoration: 'none' }} href={`#${event.id}`}>
      {event.text}
    </a>
  );
};

export default CalendarEvent;
