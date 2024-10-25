import React from "react";
import { Link } from "react-router-dom";
import create from "./images/icons8-create-50.png";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Auth from "./auth/auth"
export default function Header() {
  return (
    <div className="header-logo">
      <h1 className="header-text">mYgram</h1>
      <Link to="/create">
        <img
          className="header-newpost"
          src={create}
          alt="Create new post"
        />
      </Link>
      <GoogleOAuthProvider clientId="896811511013-3iq3nd2jmgjdrk6f0gisqpg6ajdetb6b.apps.googleusercontent.com">
          <Auth></Auth>
      </GoogleOAuthProvider>
    </div>
  );
}


