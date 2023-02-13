import React, { useContext } from 'react'
import { HiUserCircle } from "react-icons/hi";
import { TbBrandAirbnb, TbSearch, TbMenu2 } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const Header = () => {
  const {user}  = useContext(UserContext);

  return (
    <header className=" flex items-center justify-between">
    {/* logo */}
    <Link to={'/'} className="flex items-center gap-1  ">
      <TbBrandAirbnb className="text-[30px] " />
      <span className="font-bold text-xl">airbnb</span>
    </Link>
    {/* serch */}
    <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
      <div>Anywhere</div>
      <div className="border border-l h-6 border-gray-300"></div>
      <div>Any week</div>
      <div className="border border-l h-6 border-gray-300"></div>
      <div>Add guests</div>
      <button className="bg-primary text-white p-1 rounded-full  ">
        <TbSearch className="text-[16px]" />
      </button>
    </div>
    {/* user wedgets */}
    <Link to={ user ? '/account' :'/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-1 px-2">
      <TbMenu2 />
      <HiUserCircle className="text-[25px] text-gray-700" />
      {!!user && (
        <div>
          {user.name}
        </div>
      ) }
    </Link>
  </header>
  )
}

export default Header