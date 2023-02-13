import axios from "axios";
import React, { useContext, useState } from "react";
import {  Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { UserContext } from "../context/UserContext";
import PlacesPage from "./PlacesPage";


const ProfilePage = () => {
  let {subpage} = useParams()
  const { user, ready , setUser } = useContext(UserContext);
  const [redirect , setRedirect] = useState(null)
  
  const  logOut =async ()=> {
    await axios.post('/logout')
    setRedirect('/')
    setUser(null)
  }
  if (subpage === undefined) {
    subpage = 'profile';
  }
  // if (!ready) {
  //   return 'Loading...';
  // }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div>
    <AccountNav />
    {subpage === 'profile' && (
      <div className="text-center max-w-lg mx-auto">
        Logged in as {user.name} ({user.email})<br />
        <button onClick={logOut} className="primary max-w-sm mt-2">Logout</button>
      </div>
    )}
    {subpage === 'places' && (
      <PlacesPage />
    )}
  </div>
  );
};

export default ProfilePage;
