import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((res) => {
      setPlaces(res.data);
    });
  }, []);
  return (
    <div className=" mt-8 grid gap gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id}>
            <div className="rounded-2xl bg-gray-500 flex">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square  "
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                />
              )}
            </div>
            <h3 className="font-bold my-2 leading-4">{place.address}</h3>
            <h2 className="text-sm  mt-2 leading-4 text-gray-500">
              {place.title}
            </h2>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per nig
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
