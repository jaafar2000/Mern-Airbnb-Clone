import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const AccountNav = () => {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }
  function linkClasses(type = null) {
    let classes = "inline-flex gap-1 items-center py-2 px-6 rounded-full";
    if (type === subpage) {
      classes += " bg-primary text-white";
    } else {
      classes += " bg-gray-200";
    }
    return classes;
  }

  return (
    <nav className="w-full flex mt-8 mb-8 justify-center gap-2">
      <Link className={linkClasses("profile")} to={"/account"}>
        <FaUserCircle />
        My profile
      </Link>
      <Link className={linkClasses("bookings")} to={"/account/bookings"}>
        <AiOutlineUnorderedList />
        My booking
      </Link>
      <Link className={linkClasses("places")} to={"/account/places"}>
        <BsBuilding />
        My accommodations
      </Link>
    </nav>
  );
};

export default AccountNav;
