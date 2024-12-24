import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom"; 
import { authContext } from "./contexts/AuthProvider";
import googleIcon from "./images/web_light_rd_ctn@1x.png"
import crossIcon from "./images/radix-icons-cross-1-icon.png"
export default function Login(props){
    const base_url = process.env.REACT_APP_BACKEND_URL
    const { login } = React.useContext(authContext);
    const navigate = useNavigate();
    async function getUserInfo(codeResponse) {
        console.log(base_url)
        var response = await fetch(`${base_url}/google_login`, {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: codeResponse.code }),
        });
        const csrfToken = response.headers.get("X-CSRF-TOKEN");
        if (csrfToken) {
            console.log("CSRF Token:", csrfToken);
            // Store CSRF token securely (e.g., in localStorage or a React context)
            document.cookie = `csrf_access_token=${csrfToken}; Path=/; Secure; SameSite=None`;
        }
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
        onFailure: (error) => {
            console.log("Login failed: ", error);
        }
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