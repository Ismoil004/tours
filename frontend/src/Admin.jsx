import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "./styles/Admin.css";
import Account from "./files/Account.png";
import {
    fetchToursRequest,
    addTourRequest,
    updateTourRequest,
    deleteTourRequest
} from './redux/reducer/userReducer.js';

function Admin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tours = useSelector(state => state.user.tours);
    const loading = useSelector(state => state.user.loading);
    const error = useSelector(state => state.user.error);
    const username = localStorage.getItem('username'); // Retrieve the username

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        description2: '',
        text: '',
        photo: '',
        video: '',
        day: '',
        cost: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
        } else {
            dispatch(fetchToursRequest());
        }
    }, [dispatch, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePhotoChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            photo: e.target.files[0]
        }));
    };

    const handleVideoChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            video: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const photoData = new FormData();
        const videoData = new FormData();

        if (formData.photo) {
            photoData.append('file', formData.photo);
            const photoResponse = await fetch('http://localhost:9090/files/img', {
                method: 'POST',
                body: photoData
            });
            const photoName = await photoResponse.text();
            formData.photo = photoName;
        }

        if (formData.video) {
            videoData.append('file', formData.video);
            const videoResponse = await fetch('http://localhost:9090/files/video', {
                method: 'POST',
                body: videoData
            });
            const videoName = await videoResponse.text();
            formData.video = videoName;
        }

        if (formData.id) {
            dispatch(updateTourRequest(formData));
        } else {
            dispatch(addTourRequest(formData));
        }

        setFormData({
            id: '',
            title: '',
            description: '',
            description2: '',
            text: '',
            photo: '',
            video: '',
            day: '',
            cost: ''
        });
    };

    const handleEdit = (tour, e) => {
        e.stopPropagation();
        setFormData(tour);
    };

    const handleDelete = (id, e) => {
        e.stopPropagation();
        dispatch(deleteTourRequest(id));
    };

    const selectedTour = (uuid) => {
        navigate(`/tour/${uuid}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    function handleNavigate(){
        navigate('/enquiry/list');
    }

    function handleNavigate1(){
        navigate('/');
    }

    function handleNavigate2(){
        navigate('/comment');
    }

    return (
        <div className={"containers"}>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"320px",marginTop:"50px", padding:"0px 50px 0px 50px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"20px", marginTop:"-10px"}}>
                    <img src={Account} alt=""/>
                    <div>
                        <h1 className={"h0"}> {username} </h1>
                    </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:" 40px", marginLeft:"-100px"}}>
                    <p className={"asd"}>Add Tour</p>
                    <p onClick={handleNavigate} className={"asd"}>Enquiry</p>
                    <p onClick={handleNavigate1} className={"asd"}>Available Tours</p>
                    <p onClick={handleNavigate2} className={"asd"}>Comments</p>
                </div>
                <div>
                    <button onClick={handleLogout} style={{backgroundColor:"red",width:"135px",height:"36px",borderRadius:"20px",borderColor:"red", marginTop:"-15px"}}>Log out</button>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "50px",
                    padding:"0px 50px 0px 50px"
                }}>
                    <div style={{display: "flex", gap: "10px"}}>
                        <div className="">
                            <input placeholder={"Title"} style={{width: "200px"}} type="text" className="form-control"
                                   id="title" name="title"
                                   value={formData.title} onChange={handleChange}/>
                        </div>
                        <div className="">
                            <input placeholder={"Description"} style={{width: "200px"}} type="text"
                                   className="form-control" id="description"
                                   name="description" value={formData.description} onChange={handleChange}/>
                        </div>
                        <div className="">
                            <input placeholder={"Additional description"} style={{width: "200px"}} type="text"
                                   className="form-control" id="description2"
                                   name="description2" value={formData.description2} onChange={handleChange}/>
                        </div>

                        <div style={{display: "flex", gap: "10px"}}>
                            <div className="">
                                <label htmlFor="photo">Photo:</label>
                                <input style={{width: "200px"}} type="file"
                                       className="form-control-file" id="photo"
                                       name="photo" onChange={handlePhotoChange}/>
                            </div>
                            <div className="">
                                <label htmlFor="video">Video:</label>
                                <input style={{width: "200px", marginBottom: "11px"}} type="file"
                                       className="form-control-file" id="video"
                                       name="video" onChange={handleVideoChange}/>
                            </div>
                            <div className="">
                                <input placeholder={"Day"} style={{width: "200px"}} type="number"
                                       className="form-control" id="day" name="day"
                                       value={formData.day} onChange={handleChange}/>
                            </div>
                            <div>
                                <input placeholder={"Price"} style={{width: "200px"}} type="number"
                                       className="form-control" id="cost" name="cost"
                                       value={formData.cost} onChange={handleChange}/>
                            </div>
                        </div>
                    </div>

                    <textarea
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        placeholder={"Text..."}
                        style={{width: "1300px", marginTop: "20px"}}
                        cols="30"
                        rows="10">
                    </textarea>
                    <button style={{backgroundColor: "red", width: "135px", borderRadius: "20px", borderColor: "red"}}
                            type="submit">
                        {formData.id ? 'Update' : 'Add'}
                    </button>
                </div>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div className="table-container">
                <table className="table">
                    <thead>
                    <tr className={"op"}>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Description2</th>
                        <th>Text</th>
                        <th>Photo</th>
                        <th>Video</th>
                        <th>Day</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tours.map((tour, index) => (
                        <tr className={"op"} onClick={() => selectedTour(tour.id)} key={index}>
                            <td>{tour.title}</td>
                            <td>{tour.description}</td>
                            <td>{tour.description2}</td>
                            <td>{tour.text}</td>
                            <td><img src={`http://localhost:9090/files/img?name=${tour.photo}`} alt="Tour"/></td>
                            <td>
                                <video width="320" height="240" controls>
                                    <source src={`http://localhost:9090/files/video?name=${tour.video}`} type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </td>
                            <td>{tour.day}</td>
                            <td>{tour.cost}</td>
                            <td>
                                <button className="btn btn-warning" onClick={(e) => handleEdit(tour, e)}>Edit</button>
                                <button className="btn btn-danger" onClick={(e) => handleDelete(tour.id, e)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;
