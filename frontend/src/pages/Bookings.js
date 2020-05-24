import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth-context";

function Bookings() {
  const [isPageIsLoading, setPageIsLoading] = useState(false);

  const [bookings, setBookings] = useState([]);
  const { state } = useContext(AuthContext);
  const { token, isAuthenticated, userId } = state; //destructure state from AuthContext
  const getAllBookings = () => {
    //--1--requestBody,an object, query property: string
    const requestBody = {
      query: `query allBookings {
      bookings{
        _id
        createdAt
        user{
          email
        }
       
      }
    }`,
    };
    //--2--fetch data
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
        console.log("successufully get all bookings", resData);
      })
      .catch((err) => {
        console.log("Errors: ", err);
        setPageIsLoading(false);
      });
  };
  // useEffect(() => {
  //   getAllBookings();
  // }, []);
  return (
    <div>
      <h1>This is bookings page</h1>
    </div>
  );
}

export default Bookings;
