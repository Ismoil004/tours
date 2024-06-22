import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/Comment.css"
import Page from "./Page.jsx";

function Comment(props) {
    const [comment, setComment] = useState([]);
    const { handleSubmit, register, reset } = useForm();

    function mySubmit(data) {
        axios.post("http://localhost:9090/api/comment", data).then(res => {
            setComment(res.data);
            toast.success("Comment added successfully!");
        }).catch(error => {
            toast.error("Error adding comment!");
        }).finally(() => {
            reset();
        });
    }

    return (
        <div>
            <Page/>
            <ToastContainer />

                <form className={"comment-form"} id="commentForm" onSubmit={handleSubmit(mySubmit)}>
                    <input type="text" className="comment-input" placeholder="First Name" {...register("firstName")} />
                    <input type="text" className="comment-input" placeholder="Last Name" {...register("lastName")} />
                    <input type="text" className="comment-input2" placeholder="Text" {...register("text")} />
                    <button type="submit" form="commentForm" className="comment-button">Send</button>
                </form>
        </div>
    );
}

export default Comment;