import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "./authService";
export default function PostForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [placeholder1, setPlaceholder1] = useState('Title');
  const [placeholder2, setPlaceholder2] = useState('Description');
  const [placeholder3, setPlaceholder3] = useState('UserId');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // need to header
    fetch(`http://localhost:8000/posts`, {
      method: 'POST',
      credentials:'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "X-CSRF-TOKEN": getCookie("csrf_access_token"), 
      },
      body: JSON.stringify({ title, description, userId }),
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
    setUserId("");
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
  const handleFocus3 = () => {
    setPlaceholder3('');
  };

  const handleBlur3 = () => {
    if (userId === '') {
      setPlaceholder3('User Id');
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
      <div>
        <input
          className="form-input3"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder={placeholder3}
          onFocus={handleFocus3}
          onBlur={handleBlur3}
        />
      </div>
      <button className="submit-button" type="submit">Submit</button>
    </form>
  );
}
