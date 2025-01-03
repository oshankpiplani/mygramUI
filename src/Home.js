import React,{useEffect} from "react";
import {authContext} from "./contexts/AuthProvider";
import pic1 from "./images/new1.jpeg"
import pic2 from "./images/new2.jpeg"
import pic3 from "./images/new3.jpeg"
import pic4 from "./images/new4.jpeg"
import pic5 from "./images/new5.jpeg"
import pic9 from "./images/new9.jpeg"
import bgImg from "./images/bgImg.jpeg"



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
        <div className="home-coming">
            <h2>You only fail when you stop writing</h2>
            <div className="home-img">
                <div className="img2"><img src={pic2} alt=""  height="500px" width="250px"/></div>
                <div className="img4"><img src={pic4} alt=""  height="500px" width="250px"/></div>
                <div className="img5"><img src={pic5} alt=""  height="500px" width="300px"/></div>
                <div className="img3"><img src={pic3} alt=""  height="500px" width="250px"/></div>
                <div className="img1"><img src={pic1} alt=""  height="500px" width="250px"/></div>
            </div>
            <div className="home-div-two">

                <div><img className="img8" src={bgImg} alt="" height="780px" width="700px"/></div>
                <div className="home-mssg-div-two"><h2>Create New Ideas</h2>
                    <h7>You</h7>
                    <br></br>
                    <h7>Are</h7>
                    <br></br>
                    <h7>Beyond</h7>
                    <br></br>
                    <h7>Unimginable</h7>
                    <br></br>
                </div>
            </div>
            <div className="home-div-three">
                <h3>Connect with People</h3>
                <img src={pic9} alt="" height="500px" width="500px"/>
            </div>
        </div>
    );

}