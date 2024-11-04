import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import IconButton from "@mui/material/IconButton";
import { useGoogleLogin } from "@react-oauth/google";
import UserAvatar from "./userAvatar";

async function getUserInfo(codeResponse) {
  var response = await fetch("http://localhost:8000/google_login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: codeResponse.code }),
  });
  return await response.json();
}

async function getProtected(token) {
  console.log("Sending token:", token); // Log the token for debugging
  try {
    const response = await fetch("http://localhost:8000/protected", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Include the token here
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


export default function Auth() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      const loginDetails = await getUserInfo(codeResponse);
      setLoggedIn(true);
      setUser(loginDetails.user);

      // Store the token after successful login
      localStorage.setItem("token", loginDetails.token); // Assuming the token is returned here
    },
  });

  const handleLogout = async () => {
    const token = localStorage.getItem("token"); // Retrieve the token for the protected call
    await getProtected(token); // Call the protected route
    localStorage.removeItem("token"); // Clear the token on logout
    setLoggedIn(false);
  };

  return (
      <>
        {!loggedIn ? (
            <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={() => googleLogin()}
            >
              <GoogleIcon fontSize="large" />
            </IconButton>
        ) : (
            <UserAvatar userName={user.name} onClick={handleLogout}></UserAvatar>
        )}
      </>
  );
}
