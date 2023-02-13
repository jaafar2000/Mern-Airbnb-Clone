import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const BookingWidget = ({ place }) => {
  const [checkIn, setcheckIn] = useState("");
  const [checkOut, setcheckOut] = useState("");
  const [name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [redirect , setRediract] = useState()
  const {user }  = useContext(UserContext)

  useEffect(()=>{
    if(user){
      setName(user.name)
    }
  },[user])
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async () => {
    const res = await axios.post("/bookings", {
      checkIn,
      checkOut,
      name,
      phone,
      numberOfGuests,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = res.data._id;
    setRediract(`/account/bookings/${bookingId}`)
  };

  if(redirect) {
    return <Navigate to={redirect}/>
  }
  return (
    <div className="bg-white p-4 my-8 rounded-2xl ">
      <div className="text-2xl text-center ">
        Price: ${place.price} / per night
      </div>

      <div className="  border rounded-2xl ">
        <div className="flex">
          <div className="  px-4 py-4">
            <label>Check in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setcheckIn(e.target.value)}
            />
          </div>
          <div className=" border-l px-4 py-4 ">
            <label>Check out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setcheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className=" border-t px-3 py-4 ">
          <label>Number of Guests</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <>
            <div className=" border-t px-3 py-4 ">
              <label>Your full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Phone number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
