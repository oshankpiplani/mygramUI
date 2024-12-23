import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom"; 
import { authContext } from "./contexts/AuthProvider";
export default function Login(props){
    const { login } = React.useContext(authContext);
    const navigate = useNavigate();
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

    
    const handleLogin = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async (codeResponse) => {
          const loginDetails = await getUserInfo(codeResponse);
          console.log("login details",loginDetails.user)
          login(loginDetails.user)

          navigate("/posts");
        },
      });
    return(
        <div>
        <button onClick={props.openModel}>Login</button>
        {props.isOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Welcome to Mygram</h2>
            <button onClick={handleLogin}>Sign in with Google</button>
            <button onClick={props.closeModal}>Close</button>
          </div>
        </div>
      )}
        </div>
    );

}