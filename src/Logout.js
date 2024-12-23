import React from "react";
import { authContext } from "./contexts/AuthProvider";
import {  getCookie } from "./authService";
import { useNavigate } from "react-router-dom";
export default function Logout(props){
    const navigate = useNavigate();
    const { logout} = React.useContext(authContext);
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
        logout();
        props.closeModal();
        navigate("/");
        
      };
    return(
        <div>
        <button onClick={handleLogout}>Logout</button>
        </div>

    );

}