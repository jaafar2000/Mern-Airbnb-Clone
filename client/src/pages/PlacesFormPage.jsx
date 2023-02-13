import React, { useEffect, useState } from "react";
import Perks from "../components/Perks";
import PhotoUploader from "../components/PhotoUploader";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [price , setPrice] = useState('')
  const [description, setDecs] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/places/" + id).then((res) => {
        const { data } = res;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDecs(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckin(data.checkin);
        setCheckout(data.checkout);
        setMaxGuests(data.maxGuests);
        setPrice(data.price)
      });
    }
  }, [id]);
  const preInput = (text, desc) => {
    return (
      <>
        <h2 className="text-2xl mt-4">{text}</h2>
        <p className="text-gray-500 text-sm">{desc}</p>
      </>
    );
  };
  const nav = useNavigate();

  const savePlace = async (e) => {
    e.preventDefault();
    const placeData = {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkin, checkout, maxGuests,
      price
    };
    if (id) {
      await axios.put("/places", {
        id,
        ...placeData,
      });
    } else {
      await axios.post("/places", {
        ...placeData,
      });
    }
    nav(-1);
  };

  return (
    <div>
      <AccountNav />
      <form onSubmit={(e) => savePlace(e)}>
        {preInput("Title", "itle for your place. should be short and catchy")}
        <input
          type="text"
          placeholder="title, ex: My lovely apt"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {preInput("Address", "Address to this place.")}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {preInput("Photos", "more = better")}

        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput("Description", "descreption for the place")}
        <textarea
          value={description}
          onChange={(e) => setDecs(e.target.value)}
        />

        {preInput("Perks", "Select all the perks of your place")}
        <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 ">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {preInput("Extra info", "house rules, etc")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {preInput(
          "Check in & out times",
          "add check in ahd out times, remember have some time window for cleaning the room between guests"
        )}
        <div className="grid sm:grid-cols-2  md:grid-cols-4 gap-2">
          <div>
            <h3 className="mt-2 mb-1">Check in time</h3>
            <input
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
              type="text"
              placeholder="14:00"
            />
          </div>
          <div>
            <h3 className="mt-2 mb-1">Check out time</h3>
            <input
              type="text"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
            />
          </div>{" "}
          <div>
            <h3 className="mt-2 mb-1">Price per night</h3>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 mb-1">Max number of guests</h3>
            <input
              type="text"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
