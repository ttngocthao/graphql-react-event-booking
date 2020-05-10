import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "../components/Modal/Modal";

import { AuthContext } from "../context/auth-context";

function Events() {
  const [isModalOpened, setModalOpened] = useState(false);
  const { state } = useContext(AuthContext);
  const { token, isAuthenticated } = state;
  const cancelHandler = () => {
    setModalOpened(false);
  };
  //console.log("token", token, "isAuthenticated", isAuthenticated);
  return (
    <div>
      <h1>This is Events page</h1>
      {isModalOpened ? (
        <Modal title="Add event">
          <h2>Form will be here</h2>
          <Formik
            initialValues={{
              title: "",
              description: "",
              price: "",
              date: "",
            }}
            validate={(vals) => {
              const errors = {};
              if (!vals.title) {
                errors.title = "Event title cannot be empty";
              }
              if (!vals.description) {
                errors.description = "Event description cannot be empty!";
              }
              if (!vals.price) {
                errors.price = "Event price cannot be empty!";
              }
              return errors;
            }}
            onSubmit={(data) => {
              data.price = +data.price; //convert price string to number
              const requestBody = {
                query: `mutation{
                  createEvent(args: {
                    title:"${data.title}",
                    description: "${data.description}",
                    price: ${data.price},
                    date: "${data.date}"
                 }){		
                   title
                  _id }
                 }`,
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
                  console.log("successufully create an event", resData);
                });

              //console.log(data);
            }}
          >
            <Form>
              <div>
                <label htmlFor="title">Title</label>
                <Field name="title" type="text" />
                <ErrorMessage name="title" />
              </div>

              <div>
                <label htmlFor="price">Price</label>
                <Field name="price" type="number" />
                <ErrorMessage name="price" />
              </div>
              <div>
                <label htmlFor="date">Date</label>
                <Field name="date" type="datetime-local" />
                <ErrorMessage name="date" />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <Field as="textarea" type="text" name="description" rows="4" />
                <ErrorMessage name="description" />
              </div>
              <div>
                <button type="submit">Create this event</button>
                <button onClick={cancelHandler}>Cancel</button>
              </div>
            </Form>
          </Formik>
        </Modal>
      ) : (
        isAuthenticated && (
          <button
            onClick={() => {
              setModalOpened(true);
            }}
          >
            Create an event +
          </button>
        )
      )}
    </div>
  );
}

export default Events;
