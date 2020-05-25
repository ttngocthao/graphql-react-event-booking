import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";
import Spinner from "../components/Spinner/Spinner";
import BookingList from "../components/Bookings/BookingList";
function Bookings() {
  const authContext = useContext(AuthContext);
  const [bookingsData, setbookingsData] = useState(null);
  // console.log("state from Booking page", authContext.state);
  const { token } = authContext.state;
  const getAllBookings = () => {
    const requestBody = {
      query: `
     query allBookings {
      bookings{
        _id
        event{
          title
        }
        createdAt
        user{
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
        setbookingsData(resData.data.bookings);
      })
      .catch((err) => {
        console.log("Errors: ", err);
      });
  };
  const deleteBookingHandler = (bookingId) => {
    const requestBody = {
      query: `mutation{
        cancelBooking(bookingId:"${bookingId}"){
          _id
          creator{
            email
          }
        }
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
        setbookingsData((currentList) => {
          currentList.filter((item) => item._id !== bookingId);
        });
        getAllBookings();
      })
      .catch((err) => {
        console.log("Errors: ", err);
      });
  };
  useEffect(() => {
    getAllBookings();
  }, []);
  return (
    <div>
      <h1>Bookings list</h1>
      {bookingsData ? (
        <BookingList
          bookingsData={bookingsData}
          deleteBookingHandler={deleteBookingHandler}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Bookings;
