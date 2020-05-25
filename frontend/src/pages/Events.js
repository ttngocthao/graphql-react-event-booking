import React, { useState, useContext, useEffect } from "react";

import Modal from "../components/Modal/Modal";

//import { AuthContext } from "../context/auth-context";
import EventList from "../components/Events/EventList";
import Spinner from "../components/Spinner/Spinner";
import { AuthContext } from "../App";
import AddEventForm from "../components/Events/AddEventForm";
function Events() {
  const [eventsData, setEventsData] = useState(null);
  const [isModalOpened, setModalOpened] = useState(false);
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext.state;
  // console.log("state from events page", AuthContext.state);
  const getAllEvents = () => {
    const requestBody = {
      query: `query{
              events{                  
                _id
                date
                title
                price 
                description
                creator{
                  email
                  _id
                } 
              }
            }`,
    };
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        // console.log("successufully get all events", resData);
        setEventsData(resData.data.events);
      })
      .catch((err) => {
        console.log("Errors: ", err);
      });
  };
  useEffect(() => {
    getAllEvents();
  }, []);
  return (
    <div>
      <h1>This is Events page</h1>
      {isAuthenticated && (
        <button
          onClick={() => {
            setModalOpened(true);
          }}
        >
          Create an event +
        </button>
      )}
      {isModalOpened && (
        <Modal
          canCanel={true}
          cancelHandler={() => setModalOpened(false)}
          cancelText={`Close`}
        >
          <AddEventForm
            closeModal={() => setModalOpened(false)}
            updateEvents={getAllEvents}
          />
        </Modal>
      )}
      {eventsData ? <EventList eventsData={eventsData} /> : <Spinner />}
    </div>
  );
}

export default Events;
