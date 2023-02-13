import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const RegisterPage = () => {
  const [name , setName ] =  useState("")
  const [email , setEmail ] =  useState("")
  const [password , setPassword ] =  useState("")
  const [reg , setReg] = useState(false)

  const registerUser = async (e)=>{
    setReg(true)
    e.preventDefault();
    try{
      await axios.post('/register' , {
        name,
        email, 
        password
      })
      setName("")
      setEmail("")
      setPassword('')
      setReg(false)
      alert('Registration seccessfull, Now you can login')
    }catch(err){
      alert("Registration failed. Please try again later")
    } 
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form onSubmit={e=>registerUser(e)} className="max-w-md mx-auto">
        <input 
          required
          type="text" 
          placeholder="John Doe"
          value={name}
          onChange={e=>setName(e.target.value)}
        />
          <input 
          required
            type="email" 
            placeholder="your@email.com"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            />
          <input 
          required
            type="password" 
            placeholder="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            />
          <button className="primary">{!reg ? "Register" : "Registering..."}</button>
          <div className="text-center py-2 text-gray-500 ">
            Already a member? <Link className=" underline text-black " to={"/login"}>Login</Link>

          </div>
        </form>
      </div>
    </div>  )
}

export default RegisterPage