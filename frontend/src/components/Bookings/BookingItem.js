import React from "react";

function BookingItem({ item, deleteBookingHandler }) {
  const { createdAt, _id } = item;
  const { title } = item.event;
  const { email } = item.user;
  return (
    <li>
      <div>
        <h4>{title}</h4>
        <small>
          {new Date(createdAt).toLocaleDateString("en-UK", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </small>
        <small>Created by: {email}</small>
      </div>
      <button onClick={() => deleteBookingHandler(_id)}>
        Cancel this booking
      </button>
    </li>
  );
}

export default BookingItem;
