import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/AdminComment.css';
import {useNavigate} from "react-router-dom";

function AdminComment(props) {
    const [adminComment, setAdminComment] = useState([]);
     const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
        } else {
           getAll()
        }
    }, [navigate]);



    function getAll() {
        axios.get("http://localhost:9090/api/comment/adminstatus/true")
            .then(res => {
                setAdminComment(res.data);
            })
            .catch(error => {
                console.error("There was an error fetching the comments!", error);
            });
    }

    function updateStatus(id, status) {
        axios.put(`http://localhost:9090/api/comment/${id}/status`, { status })
            .then(() => {
                // Update the adminstatus to false
                updateAdminStatus(id, false);

                // Remove the comment from the list immediately
                setAdminComment(prevComments =>
                    prevComments.filter(comment => comment.id !== id)
                );
            })
            .catch(error => {
                console.error("There was an error updating the status!", error);
            });
    }

    function updateAdminStatus(id, adminStatus) {
        axios.put(`http://localhost:9090/api/comment/${id}/adminstatus`, { adminstatus: adminStatus })
            .then(res => {
                console.log("Admin status updated successfully:", res.data);
            })
            .catch(error => {
                console.error("Error updating admin status:", error);
            });
    }

    return (
        <div className="admin-comment-container">
            <table className="admin-comment-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Text</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {adminComment.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.text}</td>
                        <td>
                            <button className="admin-comment-button" onClick={() => updateStatus(item.id, true)}>Yes</button>
                            <button className="admin-comment-button" onClick={() => updateStatus(item.id, false)}>No</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminComment;
