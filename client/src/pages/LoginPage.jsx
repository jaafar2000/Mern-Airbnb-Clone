import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const [email , setEmail ]  = useState("");
  const [password , setPassword ]  = useState(""); 
  const [redirect , setRedirect] = useState(false);
  const { setUser} = useContext(UserContext)

  const loginUser = async (e)=>{
    e.preventDefault();
    try{
    const {data} = await axios.post('/login' , {email , password} )
    setEmail("")
    setPassword("")
    alert("Login Successful")
      setUser(data)
      setRedirect(true)
    }catch(e){
      alert("Login Failed")
    }
  }

  if(redirect) {
    return <Navigate to={"/"}/>
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={e=>loginUser(e)} >
          <input 
            type="email" 
            placeholder="your@email.com"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            required
            />
          <input 
            type="password" 
            placeholder="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            required
            />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500 ">
            Don't have an account yet? <Link className=" underline text-black " to={"/register"}>Register Now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
