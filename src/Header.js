import React, { useState} from "react";
import { Link } from "react-router-dom";
import create from "./images/icons8-create-50.png";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { authContext } from "./contexts/AuthProvider";
import Login from "./Login";
import Logout from "./Logout";
export default function Header() {

  const { loggedIn, } = React.useContext(authContext);
  const [isOpen,setisOpen] = useState(false)


  const openModel=()=>{
    setisOpen(true)

  }
  const closeModal = ()=>{
    setisOpen(false)
  }

  return (
    <div className="header-logo">
      <h1 className="header-text">mYgram</h1>
      {loggedIn ?(<div><Link to="/create">
        <img className="header-newpost" src={create} alt="Create new post" />
      </Link>
      <Logout closeModal = {closeModal} />
      </div>):(
        <GoogleOAuthProvider clientId="896811511013-3iq3nd2jmgjdrk6f0gisqpg6ajdetb6b.apps.googleusercontent.com">
        <Login isOpen={isOpen} openModel={openModel} closeModal={closeModal}/>
        </GoogleOAuthProvider>
      )}
      
      
    </div>
  );
}
