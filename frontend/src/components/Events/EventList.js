import React from "react";
import EventItem from "./EventItem";

function EventList({ eventsData, userId, token }) {
  return (
    <ul>
      {eventsData &&
        eventsData.map((item, index) => {
          return <EventItem key={index} item={item} />;
        })}
    </ul>
  );
}

export default EventList;
