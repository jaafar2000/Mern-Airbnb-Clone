import React from 'react'
import {BiMap} from "react-icons/bi"
const AddressLink = ({children , className="" }) => {

  if(!className){
    className = "  gap-2  my-2"
  }

  className += 'flex items-center gap-1 font-semibold underline"'
  return (
    <a
    className={className }
    href={"https://maps.google.com/?q="+children}
    target="_blank"
  >
    <BiMap /> {children}
  </a>  )
}

export default AddressLink