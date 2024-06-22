import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Comment from "./Comment";
import AdminComment from "./AdminComment";
import TourDay from "./TourDay.jsx";
import Admin from "./Admin.jsx";
import Enquiry from "./EnquiryForm";
import AdminEnquiry from "./AdminEnquiry";
import LandingPage from "./LandingPage";
import Batafsil from "./Batafsil.jsx";
import Login from "./Login.jsx";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admincomment" element={<AdminComment />} />
                <Route path="/login" element={<Login />} />
                <Route path="/tour/:uuid" element={<TourDay />} />
                <Route path="/batafsil/:tourId" element={<Batafsil />} />
                <Route path="/enquiry/list" element={<AdminEnquiry />} />
                <Route path="/" element={<LandingPage />} />
                <Route path={"/login"} element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;