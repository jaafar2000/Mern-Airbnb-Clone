import React, { useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
const PhotoUploader = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");

  const addPhotoLink = async (e) => {
    e.preventDefault();
    if (photoLink) {
      const { data: fileName } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      onChange((prev) => {
        return [...prev, fileName];
      });
      setPhotoLink("");
    } else {
      alert("add photo link please");
    }
  };

  const uploadPhoto = (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: {
          "Content-Type": "mulipart/form-data",
        },
      })
      .then((res) => {
        const { data: filenames } = res;
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  };

  const removePhoto = (filename) => {
    onChange([...addedPhotos.filter((photo) => photo !== filename)]);
  };

  const selectAsMainPhoto = (filename) => {
    onChange([filename, ...addedPhotos.filter((photo) => photo !== filename)]);
  };
  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add using a link...jbg"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button onClick={addPhotoLink} className="bg-gray-200 rounded-2xl p-4">
          Add&nbsp;photo
        </button>
      </div>
      <input
        id="upload"
        type="file"
        className="hidden"
        multiple
        onChange={uploadPhoto}
      />
      <div className=" mt-2 grid grid-cols-3 gap-2  md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((photo) => (
            <div
              key={photo}
              className="relative  rounded-2xl h-28 overflow-hidden "
            >
              <img
                className="rounded-2xl w-full h-full object-cover"
                src={"http://127.0.0.1:4000/uploads/" + photo}
                alt=""
              />
              <div
                onClick={() => removePhoto(photo)}
                className="absolute  bottom-2 right-2 text-white bg-black cursor-pointer bg-opacity-50 rounded-2xl py-2 px-2"
              >
                <FiTrash2 />
              </div>
              <div
                onClick={() => selectAsMainPhoto(photo)}
                className="absolute  bottom-2 left-2  text-white bg-black cursor-pointer bg-opacity-50 rounded-2xl py-2 px-2"
              >
                {photo === addedPhotos[0] && <AiFillStar />}
                {photo !== addedPhotos[0] && <AiOutlineStar />}
              </div>
            </div>
          ))}
        <label
          htmlFor="upload"
          className=" flex cursor-pointer gap-1 items-center border text-3xl bg-transparent rounded-2xl text-gray-500 mt-2 p-8"
        >
          Upload <BiCloudUpload />
        </label>
      </div>
    </>
  );
};

export default PhotoUploader;
