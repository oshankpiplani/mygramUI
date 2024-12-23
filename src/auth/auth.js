import React, { useState ,useEffect} from "react";
import GoogleIcon from "@mui/icons-material/Google";
import IconButton from "@mui/material/IconButton";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom"; 
import UserAvatar from "./userAvatar";
import {  getCookie } from "../authService";


async function getUserInfo(codeResponse) {
  var response = await fetch("http://localhost:8000/google_login", {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: codeResponse.code }),
  });
  return await response.json();
}

async function getProtected(token) {
  console.log("Sending token:", token);
  try {
    const response = await fetch("http://localhost:8000/protected", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const msg = await response.json();
    console.log("Protected response:", msg);
    return msg;

  } catch (error) {
    console.error('Fetch error:', error);
    alert('Failed to fetch data from server.');
  }
}

export default function Auth({ loggedIn, user, onChangeLoggedIn, onChangeUserName }) {
  console.log("received from parent p")
  
  const navigate = useNavigate(); 

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      const loginDetails = await getUserInfo(codeResponse);
      console.log("login details",loginDetails.user)
      onChangeLoggedIn(true);
      onChangeUserName(loginDetails.user);
      navigate("/posts");
    },
  });

  const handleLogout = async () => {
    const csrfToken = getCookie('csrf_access_token');
    await fetch('http://localhost:8000/logout', {
      
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRF-TOKEN': csrfToken  // Send CSRF token in the header
      },  // Ensure cookies are sent
    }).then(() => {
      // window.location.href = '/';
    });
    onChangeUserName({});
    onChangeLoggedIn(false);
    navigate("/")
  };
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  

  return (
    <>
      {loggedIn ? (
        
        <UserAvatar userName={user.name} onClick={handleLogout} />
        
        
      ) : (
        <IconButton
          color="primary"
          aria-label="login with Google"
          onClick={() => googleLogin()}
        >
          <GoogleIcon fontSize="large" />
        </IconButton>
        
      )}
    </>
  );
}
