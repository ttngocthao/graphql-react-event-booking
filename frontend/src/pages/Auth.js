import React, { useState, useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import styles from "./auth.module.scss";
import { AuthContext } from "../context/auth-context";
function Auth() {
  const { dispatch } = useContext(AuthContext);
  const [isLogIn, setLogIn] = useState(true);
  const switchModeHandler = () => {
    setLogIn(!isLogIn);
  };

  return (
    <div>
      <h1>Login to your account / create an account</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          if (values.password.length > 0 && values.password.length < 6) {
            errors.password = "Password must have more than 6 characters";
          }
          return errors;
        }}
        onSubmit={(data) => {
          let requestBody = {
            query: `
              query{
                login(email:"${data.email}",password:"${data.password}"){
                  userId
                  token
                  tokenExpiration
                }
              }`,
          };
          if (!isLogIn) {
            requestBody = {
              query: `
                mutation {
                  createUser(args:{
                    email: "${data.email}",
                    password:"${data.password}"
                  })
                  {
                  _id
                  email                 
                  }
                }               
              `,
            };
          }

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
              //token is return here
              if (resData.data.login.token) {
                dispatch({
                  type: "LOGIN",
                  payload: resData.data.login,
                });
              }
            })
            .catch((errors) => {
              console.log(errors); //errors from browser
            });
        }}
      >
        <Form name="user-form">
          <div className={styles.inputWrap}>
            <label htmlFor="email">Email:</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
          </div>
          <div className={styles.inputWrap}>
            <label htmlFor="password">Password:</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" />
          </div>
          <div className={styles.inputWrap}>
            <button type="submit">Submit</button>
            <button type="button" onClick={switchModeHandler}>
              {isLogIn ? "Create an account" : "Login"}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Auth;
