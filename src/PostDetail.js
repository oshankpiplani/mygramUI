import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import comment1 from "./images/comment-icon-1024x964-julk98bl.png";
import './App.css'; 

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [userId] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentSectionVisible, setIsCommentSectionVisible] = useState(false);
  const [placeholder, setPlaceholder] = useState('TypeCommentHere');
  const [textStyle, setTextStyle] = useState({ bold: false, italic: false });

  const handleFocus = () => {
    setPlaceholder('');
  };

  const handleBlur = () => {
    if (comment === '') {
      setPlaceholder('TypeCommentHere');
    }
  };

  const fetchComments = useCallback(() => {
    fetch(`https://localhost:8000/posts/${id}/comments`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setComments(data);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`https://localhost:8000/posts/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setPost(data);
          if (data.num_likes > 0) {
            setIsLiked(true);
          }
        })
        .catch((error) => console.error("Error fetching post:", error));

      fetchComments();
    }
  }, [id, fetchComments]);

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const toggleLike = () => {
    const url = `https://localhost:8000/posts/${id}/${isLiked ? 'unlike' : 'likes'}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(() => {
        setPost((prevPost) => ({
          ...prevPost,
          num_likes: isLiked ? prevPost.num_likes - 1 : prevPost.num_likes + 1,
        }));
        setIsLiked(!isLiked);
      })
      .catch((error) => console.error(`Error ${isLiked ? 'unliking' : 'liking'} post:`, error));
  };

  const handleComment = () => {
    fetch(`https://localhost:8000/posts/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, content: comment }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(() => {
        setPost((prevPost) => ({
          ...prevPost,
          num_comments: prevPost.num_comments + 1,
        }));
        setComment("");
        fetchComments();
      })
      .catch((error) => console.error("Error adding comment:", error));
  };

  const toggleCommentSection = () => {
    setIsCommentSectionVisible(!isCommentSectionVisible);
  };

  const handleBold = () => {
    setTextStyle((prevStyle) => ({
      ...prevStyle,
      bold: !prevStyle.bold,
    }));
  };

  const handleItalic = () => {
    setTextStyle((prevStyle) => ({
      ...prevStyle,
      italic: !prevStyle.italic,
    }));
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-detail">
      <h1 className="post-header">{post.title}</h1>
      <p className="post-description">{post.description}</p>
      <div className="post-elements">
        <div className="post-likecom">
          <button onClick={toggleLike} style={{ background: 'none', border: 'none',cursor: 'pointer' }}>
            <FontAwesomeIcon
              icon={isLiked ? faSolidHeart : faRegularHeart}
              style={{ color: isLiked ? 'red' : 'grey', fontSize: '24px' }}
            />
          </button>
          <p className="post-like">{post.num_likes}</p>
          <img className="post-comment-image" src={comment1} alt="comment" onClick={toggleCommentSection} />
          <p className="post-comment" onClick={toggleCommentSection}>
            {post.num_comments}
          </p>
        </div>
        <p className="post-date">{formatDate(post.created)}</p>
      </div>
      <div className={`post-comment-overview ${isCommentSectionVisible ? 'visible' : ''}`}>
        <div className="post-comment-details">
          <button onClick={toggleCommentSection} className="close-button">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <textarea
            value={comment}
            onChange={handleChange}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="form-input20"
            style={{
              fontWeight: textStyle.bold ? 'bold' : 'normal',
              fontStyle: textStyle.italic ? 'italic' : 'normal',
            }}
          />
          <button onClick={handleBold} className="format-button">
            <b>B</b>
          </button>
          <button onClick={handleItalic} className="format-button">
            <i>I</i>
          </button>
          <button onClick={handleComment} className="submit-button1">Respond</button>
        </div>
        <div className="comments-section">
          <h1>Comments</h1>
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p><strong>User Id: {comment.user_id}</strong></p>
              <p>{comment.content}</p>
              <p>{comment.formatted_date}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
