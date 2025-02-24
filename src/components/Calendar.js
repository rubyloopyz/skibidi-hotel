import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = ({ onEventClick }) => {
  const [events, setEvents] = useState([
    { id: "1", title: "John Doe - Room 101", start: "2024-06-10", end: "2024-06-12" },
    { id: "2", title: "Jane Smith - Room 202", start: "2024-06-15", end: "2024-06-18" },
  ]);

  // Add New Booking
  const handleDateSelect = (selectInfo) => {
    let title = prompt("Enter Booking Title:");
    if (title) {
      let newEvent = {
        id: String(events.length + 1),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      };
      setEvents([...events, newEvent]);
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable={true}
      select={handleDateSelect}
      events={events}
      eventClick={onEventClick}
    />
  );
};

export default Calendar;