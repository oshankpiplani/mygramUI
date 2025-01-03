import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "./authService";
export default function PostForm() {
  const base_url = process.env.REACT_APP_BACKEND_URL
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [placeholder1, setPlaceholder1] = useState('Title');
  const [placeholder2, setPlaceholder2] = useState('Description');

  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${base_url}/posts`, {
      method: 'POST',
      credentials:'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "X-CSRF-TOKEN": getCookie("csrf_access_token"), 
      },
      body: JSON.stringify({ title, description}),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      navigate('/posts');
    })
    .catch(error => {
      console.error('Error:', error);
    });
    setTitle("");
    setDescription("");
  };

  const handleFocus1 = () => {
    setPlaceholder1('');
  };

  const handleBlur1 = () => {
    if (title === '') {
      setPlaceholder1('Title');
    }
  };
  const handleFocus2 = () => {
    setPlaceholder2('');
  };

  const handleBlur2 = () => {
    if (description === '') {
      setPlaceholder2('Description');
    }
  };


  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <input 
          className="form-input1"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={placeholder1}
          onFocus={handleFocus1}
          onBlur={handleBlur1}
        />
      </div>
      <div>
        <textarea
          className="form-input2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={placeholder2}
          onFocus={handleFocus2}
          onBlur={handleBlur2}
        />
      </div>


      <button className="submit-button" type="submit">Submit</button>
    </form>
  );
}
