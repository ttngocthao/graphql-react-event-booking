import React from "react";
import BookingItem from "./BookingItem";

function BookingList({ bookingsData, deleteBookingHandler }) {
  return (
    <ul>
      {bookingsData &&
        bookingsData.map((item, indx) => {
          return (
            <BookingItem
              item={item}
              key={indx}
              deleteBookingHandler={deleteBookingHandler}
            />
          );
        })}
    </ul>
  );
}

export default BookingList;
