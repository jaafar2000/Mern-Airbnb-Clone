import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";
const PlacePage = () => {
  const { id } = useParams();
  // const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);
  if (!place) return "";


  return (
    <div className="mt-4 p-8 -mx-8 px-8 bg-gray-100">
      <h1 className="text-2xl">{place?.title}</h1>
      {/* <a
        className="  flex items-center gap-2  my-2 font-semibold underline"
        href={"https://maps.google.com/?q="}
        target="_blank"
      >
        <BiMap /> {place?.address}
      </a> */}
      <AddressLink >{place.address}</AddressLink>
      <PlaceGallery place ={place} />
      {/* <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden ">
          <div>
            {place?.photos?.[0] && (
              <div>
                <img
                  className="aspect-square object-cover"
                  src={"http://localhost:4000/uploads/" + place?.photos[0]}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className=" grid">
            {place?.photos?.[1] && (
              <img
                className="aspect-square object-cover"
                src={"http://localhost:4000/uploads/" + place?.photos[1]}
                alt=""
              />
            )}
            {place?.photos?.[2] && (
              <div className="overflow-hidden">
                <img
                  className="aspect-square object-cover relative top-2 "
                  src={"http://localhost:4000/uploads/" + place?.photos[2]}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className=" absolute bottom-2  right-2 py-2 px-4 bg-white rounded-2xl shadow-gray-500 "
        >
          show more photo
          {showAllPhotos}
        </button>
      </div> */}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className=" font-semibold text-2xl ">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkin} <br />
          Check-out: {place.checkout} <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white  my-6 px-8 py-8 border-t ">
        <div>
          <h2 className=" font-semibold text-2xl ">Extra Info</h2>
        </div>
        <div className="text-sm mb-4 mt-1 text-gray-700 leading-5 my-4">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
