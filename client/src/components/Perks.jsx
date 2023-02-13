import React from "react";
import { AiOutlineWifi, AiFillCar } from "react-icons/ai";
import { CgScreen } from "react-icons/cg";
import { MdPets } from "react-icons/md";
import { ImEnter } from "react-icons/im";
const Perks = ({ selected, onChange }) => {
  function handleCbClick(e) {
    const { checked, name } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  }
  return (
    <>
      <label className="border p-4  cursor-pointer flex rounded-2xl gap-2 items-center">
        <input
          type="checkbox"
          name="wifi"
          onChange={(e) => handleCbClick(e)}
          checked={selected.includes("wifi")}
        />
        <AiOutlineWifi />
        <span>Wifi</span>
      </label>
      <label className="border p-4 cursor-pointer flex rounded-2xl gap-2 items-center">
        <input
          type="checkbox"
          name="parking"
          onChange={(e) => handleCbClick(e)}
          checked={selected.includes("parking")}
        />
        <AiFillCar />
        <span>Free parking spot</span>
      </label>
      <label className="border p-4  cursor-pointer flex rounded-2xl gap-2 items-center">
        <input
          type="checkbox"
          name="tv"
          onChange={(e) => handleCbClick(e)}
          checked={selected.includes("tv")}
        />
        <CgScreen />
        <span>TV</span>
      </label>
      <label className="border p-4 cursor-pointer  flex rounded-2xl gap-2 items-center">
        <input
          type="checkbox"
          name="pets"
          onChange={(e) => handleCbClick(e)}
          checked={selected.includes("pets")}
        />
        <MdPets />
        <span>Pets</span>
      </label>
      <label className="border p-4 cursor-pointer flex rounded-2xl gap-2 items-center">
        <input
          type="checkbox"
          name="entrance"
          onChange={(e) => handleCbClick(e)}
          checked={selected.includes("entrance")}
        />
        <ImEnter />
        <span>Private entrance</span>
      </label>
    </>
  );
};

export default Perks;
