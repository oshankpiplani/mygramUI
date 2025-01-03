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
        console.log(response.headers.get("X-CSRF-TOKEN"));
        console.log(response);
        if (csrfToken) {
            console.log("CSRF Token:", csrfToken);

            document.cookie = `csrf_access_token=${csrfToken}; Path=/; Secure; SameSite=None`;
        }
        return await response.json();
      }


    const handleLogin = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async (codeResponse) => {
            try {
                const loginDetails = await getUserInfo(codeResponse);
                const user = loginDetails.user;

                const response = await fetch(`${base_url}/users`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: user.name,
                        email: user.email,
                    }),
                });

                const result = await response.json();
                console.log(result.message);

                // Proceed with login and navigation
                login(user);
                navigate("/posts");

            } catch (error) {
                console.error("Error during login process: ", error);
            }
        },
        onFailure: (error) => {
            console.log("Login failed: ", error);
        }
    });

    return(
        <div>
            <div className="button-div">
                <button className="log-in-button" onClick={props.openModel}>Log in</button>
            </div>
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