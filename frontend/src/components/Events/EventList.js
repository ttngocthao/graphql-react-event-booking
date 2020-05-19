import React from "react";
import EventItem from "./EventItem";

function EventList({ eventsData, userId }) {
  return (
    <ul>
      {eventsData &&
        eventsData.map((item, index) => {
          return <EventItem key={index} item={item} userId={userId} />;
        })}
    </ul>
  );
}

export default EventList;
