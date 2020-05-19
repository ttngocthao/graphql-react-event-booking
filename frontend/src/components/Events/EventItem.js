import React, { useState } from "react";
import Modal from "../Modal/Modal";
function EventItem({ item, userId }) {
  const [isEventDetailOpened, setisEventDetailOpened] = useState(false);
  return (
    <li>
      <h5>{item.title}</h5>
      <p>
        £{item.price} -{" "}
        {new Date(item.date).toLocaleDateString("en-UK", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
      {item.creator._id !== userId ? (
        <button onClick={() => setisEventDetailOpened(true)}>
          View Event Detail
        </button>
      ) : (
        <>
          <p>You are created this event</p>
          <div>{item.description}</div>
        </>
      )}
      {isEventDetailOpened && (
        <Modal
          title={item.title}
          canCanel={true}
          cancelText="Close"
          confirmText="Book this event"
          canConfirm={userId ? true : false}
          submitHandler={() => {
            console.log("book this please");
          }}
          cancelHandler={() => setisEventDetailOpened(false)}
        >
          <p>Price: £{item.price}</p>
          <p>
            Date:{" "}
            {new Date(item.date).toLocaleDateString("en-UK", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p>Event Details: {item.description}</p>
        </Modal>
      )}
    </li>
  );
}

export default EventItem;
