import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import './styles/AdminEnquiry.css';
import User from "./files/Account.png";
import Account from "./files/Account.png";
import { useNavigate } from "react-router-dom";
import { fetchToursRequest } from "./redux/reducer/userReducer.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminEnquiry() {
    const [enquiries, setEnquiries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [answerText, setAnswerText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
        } else {
            const fetchEnquiries = async () => {
                try {
                    const response = await axios.get('http://localhost:9090/api/enquiry');
                    setEnquiries(response.data);
                } catch (error) {
                    console.error('Error fetching enquiries:', error);
                }
            };

            fetchEnquiries();
        }
    }, [navigate]);

    const handleAnswerClick = (enquiry) => {
        setSelectedEnquiry(enquiry);
        setShowModal(true);
    };

    const handleSendAnswer = async () => {
        if (!answerText.trim()) {
            toast.error('Answer text cannot be empty');
            return;
        }

        setIsLoading(true);
        try {
            await axios.post('http://localhost:9090/api/message', {
                to: selectedEnquiry.email,
                subject: `Answer to your enquiry about ${selectedEnquiry.tourName}`,
                body: answerText
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            await axios.patch(`http://localhost:9090/api/enquiry/${selectedEnquiry.id}/answer`, answerText, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setEnquiries((prevEnquiries) =>
                prevEnquiries.map((enquiry) =>
                    enquiry.id === selectedEnquiry.id ? { ...enquiry, answer: answerText } : enquiry
                )
            );

            setShowModal(false);
            setSelectedEnquiry(null);
            setAnswerText('');
            toast.success('Answer sent and saved successfully!');
        } catch (error) {
            console.error('Error sending answer:', error);
            toast.error('Failed to send and save answer');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    function handleNavigate() {
        navigate('/enquiry/list');
    }

    function handleNavigate2() {
        navigate('/admincomment');
    }

    function handleNavigate3() {
        navigate("/admin");
    }

    return (
        <div className="container">
            <ToastContainer />
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "350px",
                marginTop: "50px",
                padding: "0px 50px 0px 50px"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "-10px" }}>
                    <img src={Account} alt="" />
                    <div>
                        <h1 className={"h0"}> {username} </h1>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "40px", marginLeft: "-100px" }}>
                    <p className={"asd"} onClick={handleNavigate3}>Add Tour</p>
                    <p onClick={handleNavigate} className={"asd"}>Enquiry</p>
                    <p className={"asd"}>Available Tours</p>
                    <p onClick={handleNavigate2} className={"asd"}>Comments</p>
                </div>
                <div>
                    <button onClick={handleLogout} style={{
                        backgroundColor: "red",
                        width: "135px",
                        height: "36px",
                        borderRadius: "20px",
                        borderColor: "red",
                        marginTop: "-15px"
                    }}>Log out
                    </button>
                </div>
            </div>
            <table className={"table"}>
                <thead className={"thead"}>
                <tr>
                    <th className={"th"}>ID</th>
                    <th className={"th"}>First Name</th>
                    <th className={"th"}>Last Name</th>
                    <th className={"th"}>Phone Number</th>
                    <th className={"th"}>Email</th>
                    <th className={"th"}>Tour Name</th>
                    <th className={"th"}>Text</th>
                    <th className={"th"}>Action</th>
                </tr>
                </thead>
                <tbody>
                {enquiries.map((enquiry, index) => (
                    <>
                        <tr className={"tr"} key={enquiry.id}>
                            <td className={"td"} data-label="ID">{index + 1}</td>
                            <td className={"td"} data-label="First Name">{enquiry.firstname}</td>
                            <td className={"td"} data-label="Last Name">{enquiry.lastname}</td>
                            <td className={"td"} data-label="Phone Number">{enquiry.phoneNumber}</td>
                            <td className={"td"} data-label="Email">{enquiry.email}</td>
                            <td className={"td"} data-label="Tour Name">{enquiry.tourName}</td>
                            <td className={"td"} data-label="Text">{enquiry.text}</td>
                            <td className={"td"} data-label="Action">
                                <button className={"button"} onClick={() => handleAnswerClick(enquiry)}>
                                    Write an answer
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="7" className="answer-row">
                                <strong>Answer for the enquiry:</strong> {enquiry.answer || 'No answer yet'}
                            </td>
                        </tr>
                    </>
                ))}
                </tbody>
            </table>
            <Rodal customStyles={{ height: '40%' }} visible={showModal} onClose={() => setShowModal(false)}>
                <div className="modal-content">
                    <h2>Write an Answer</h2>
                    <textarea
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        placeholder="Enter your answer..."
                        rows={4}
                    />
                    <button className="modal-button" onClick={handleSendAnswer} disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send Answer'}
                    </button>
                </div>
            </Rodal>
        </div>
    );
}

export default AdminEnquiry;
