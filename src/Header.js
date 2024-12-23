import React, { useState, useEffect ,useContext} from "react";
import { Link } from "react-router-dom";
import create from "./images/icons8-create-50.png";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Auth from "./auth/auth";
import RingLoader from "react-spinners/RingLoader";
import { authContext } from "./contexts/AuthProvider";
import Login from "./Login";
import Logout from "./Logout";
export default function Header() {
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [user, setUser] = useState({});
  // const [loading, setLoading] = useState(false);
  const { loggedIn, } = React.useContext(authContext);
  const [isOpen,setisOpen] = useState(false)

  // useEffect(() => {
  //   let ignore = false;
  //   const checkLoginStatus = async () => {
  //     try {

  //       const response = await fetch("http://localhost:8000/me", {
  //         credentials: "include",
  //       });

  //       if (response.ok && ignore === false) {

  //         const userData = await response.json();
  //         console.log(userData);
  //         setLoggedIn(true);
  //         setUser(userData);
  //         setLoading(false);
  //       } else {
  //         if(ignore === false){
  //         setLoggedIn(false);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error checking login status:", error);
  //       setLoggedIn(false);

  //     }
  //   };

  //   checkLoginStatus();
  //   return () => {
  //     ignore = true

  //   }
  // }, []);

  // const setLoggingIn = (value) => {
  //   setLoggedIn(value);
  //   setLoading(false);
  //   console.log("Set logged in called from child value is = ", value);
  // };

  // const settingUser = (userState) => {
  //   setUser(userState);
  //   setLoading(false);
  //   console.log("set user is called from child value is = ", userState);
  // };

  // return (
  //   <div className="header-logo">
  //     <h1 className="header-text">mYgram</h1>
  //     <Link to="/create">
  //       <img className="header-newpost" src={create} alt="Create new post" />
  //     </Link>
  //     <RingLoader color="#11a9b7" loading={loading} size={200} />
  //     {/* Conditionally render Auth component only after loading is false */}

  //       <GoogleOAuthProvider clientId="896811511013-3iq3nd2jmgjdrk6f0gisqpg6ajdetb6b.apps.googleusercontent.com">
  //         {!loggedIn ? (<Auth
  //           loggedIn={loggedIn}
  //           onChangeLoggedIn={setLoggingIn}
  //           onChangeUserName={settingUser}
  //         />):(
  //         <Auth
  //           loggedIn={loggedIn}
  //           user={user}
  //           onChangeLoggedIn={setLoggingIn}
  //           onChangeUserName={settingUser}
  //         />)}
  //       </GoogleOAuthProvider>

  //   </div>
  // );
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
