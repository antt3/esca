import React, { useState } from "react";

import './PostForm.css';

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as postsReducer from "../../store/postsReducer";

function PostFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState([]);
  
    if (!sessionUser) return <Redirect to="/login" />;
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title !== "") {
            setErrors([]);
            const newPost = {
                title,
                sessionUser
            };
            const returnedPost = dispatch(postsReducer.writePost(newPost))
            
            if (returnedPost) {
                reset();
                // history.pushState(`/users/${userId}/posts`)
                return;
            }
            
        }
        return setErrors(['Must write a post']);
    };

    const reset = () => {
        setTitle('');
    };
  
    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Write your post
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Post</button>
        </form>
    );
}

export default PostFormPage;