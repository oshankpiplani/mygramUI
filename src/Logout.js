import React from "react";
import { authContext } from "./contexts/AuthProvider";
import {  getCookie } from "./authService";
import { useNavigate } from "react-router-dom";
export default function Logout(props){
    const base_url = process.env.REACT_APP_BACKEND_URL
    const navigate = useNavigate();
    const { logout} = React.useContext(authContext);
    const handleLogout = async () => {
        const csrfToken = getCookie('csrf_access_token');
        await fetch(`${base_url}/logout`, {
          
          method: 'POST',
          credentials: 'include',
          headers: {
            'X-CSRF-TOKEN': csrfToken  // Send CSRF token in the header
          },  // Ensure cookies are sent
        }).then(() => {
          // window.location.href = '/';
        });
        logout();
        props.closeModal();
        navigate("/");
        
      };
    return(
        <div className="button-div">
        <button className="log-in-button" onClick={handleLogout}>Logout</button>
        </div>

    );

}