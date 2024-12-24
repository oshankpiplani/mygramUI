import React,{useEffect} from "react";
import {authContext} from "./contexts/AuthProvider";

export default function Home(){
    const base_url = process.env.REACT_APP_BACKEND_URL
    const { login } = React.useContext(authContext);

    React.useEffect(() => {
        fetch(`${base_url}/me`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => {
                if (res.ok) {  // Check if the response status is 200-299
                    return res.json();
                } else {
                    throw new Error('Failed to fetch user data');
                }
            })
            .then((data) => {
                console.log(data);
                login(data);
            })
            .catch((error) => {
                console.error('Error:', error);  // Handle errors (like non-200 responses)
            });
    }, [base_url]);



    return (

        <div>
        <h1>Welcome to Mygram</h1>
        </div>
    );

}