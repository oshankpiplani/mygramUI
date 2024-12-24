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
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                login(data);
            });
    }, [base_url]);


    return (

        <div>
        <h1>Welcome to Mygram</h1>
        </div>
    );

}