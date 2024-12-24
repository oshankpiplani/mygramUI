import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom"; 
import { authContext } from "./contexts/AuthProvider";
import googleIcon from "./images/web_light_rd_ctn@1x.png"
import crossIcon from "./images/radix-icons-cross-1-icon.png"
export default function Login(props){
    const base_url = process.env.BACKEND_URL
    const { login } = React.useContext(authContext);
    const navigate = useNavigate();
    async function getUserInfo(codeResponse) {
        var response = await fetch(`${base_url}/google_login`, {
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
                <img src={crossIcon} alt="closeButton" onClick={props.closeModal} className="cross-button"/>
                <h1 className="header-text">Welcome to mYgram</h1>
                <img src={googleIcon} alt="googleIcon" onClick={handleLogin} className="google-button"/>


            </div>
        </div>
        )}
        </div>
    );

}