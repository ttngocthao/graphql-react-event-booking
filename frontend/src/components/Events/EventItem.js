import React, { useState, useContext } from "react";
import Modal from "../Modal/Modal";
import { AuthContext } from "../../App";

function EventItem({ item }) {
  const [isEventDetailOpened, setisEventDetailOpened] = useState(false);
  const authContext = useContext(AuthContext);
  const { userId, token } = authContext.state;
  const bookEventHandler = () => {
    const requestBody = {
      query: `mutation {
        bookEvent(eventId:"${item._id}"){
          _id
          createdAt
          updatedAt
       }
       } `,
    };
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log("successufully book this event", resData);
        setisEventDetailOpened(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log("book this", item._id, "token", token);
  };
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
          submitHandler={bookEventHandler}
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
