import React from "react";
import { Link } from "react-router-dom";
import create from "./images/icons8-create-50.png";

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
    </div>
  );
}


