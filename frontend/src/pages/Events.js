import React, { useState } from "react";
import Modal from "../components/Modal/Modal";

function Events() {
  const [isModalOpened, setModalOpened] = useState(false);
  // console.log("isModalOpened", isModalOpened);
  const cancelHandler = () => {
    setModalOpened(false);
  };
  const submitHandler = () => {
    console.log("submit form here");
  };
  return (
    <div>
      <h1>This is Events page</h1>
      {isModalOpened ? (
        <Modal
          title="Add event"
          canCanel
          canConfirm
          cancelHandler={cancelHandler}
          submitHandler={submitHandler}
        >
          <h2>Form will be here</h2>
        </Modal>
      ) : (
        <button
          onClick={() => {
            setModalOpened(true);
          }}
        >
          Create an event +
        </button>
      )}
    </div>
  );
}

export default Events;
