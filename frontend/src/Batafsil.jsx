
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import './css/Batafsil.css';
import Comment from "./Comment.jsx";
import a from "./batafilimg/Group 1.png";
import q from "./batafilimg/Whatsaap.png";
import w from "./batafilimg/Group 94.png";
import e from "./batafilimg/Facebook.png";
import r from "./batafilimg/instagram.jpg";
import t from "./batafilimg/🇬🇧.png";
import y from "./batafilimg/Vector.png";
import u from "./batafilimg/rasm.png";
import i from "./batafilimg/Vector (1).png";
import o from "./batafilimg/Union.png";
import p from "./batafilimg/rasmcha.png";
import Rodal from "rodal";
import EnquiryForm from "./EnquiryForm.jsx";

function Batafsil() {
    const { tourId } = useParams();
    const [batafsil, setBatafsil] = useState([]);
    const [tourTitle, setTourTitle] = useState('');
    const [videoSrc, setVideoSrc] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [totalCost, setTotalCost] = useState(0);
    const [tourDescription, setTourDescription] = useState('');
    const [day, setDay] = useState(0);
    const initialTop = 680;
    const increment = 200;
    const [modalVisible, setModalVisible] = useState(false);

    const groupToursRef = useRef(null);
    const aboutUsRef = useRef(null);
    const contactRef = useRef(null);
    const footerRef = useRef(null);

    useEffect(() => {
        axios.get(`http://localhost:9090/api/tourDay/${tourId}`)
    .then(res => {
            setBatafsil(res.data);
            if (res.data.length > 0) {
                const tourDetails = res.data[0].tour;
                setTourTitle(tourDetails.title);
                setVideoSrc(`http://localhost:9090/files/video?name=${res.data[0].video}`);
                setImageSrc(`http://localhost:9090/files/img?name=${tourDetails.photo}`);
                setTotalCost(tourDetails.cost);
                setTourDescription(tourDetails.description);
                setDay(tourDetails.day);
            }
        })
            .catch(error => {
                console.error("Error fetching tour details:", error);
            });
    }, [tourId]);

    function toOrder() {
        setModalVisible(true);
    }

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleScrollTo = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="all-2">
            <div className="header-batafsil">
                <img className="header-img" src={a} alt=""/>
                <div className={"header-group"}>
                    <p className="group-tours" onClick={() => handleScrollTo(groupToursRef)}>Group Tours</p>
                    <p className="about" onClick={() => handleScrollTo(aboutUsRef)}>About Us</p>
                    <p className="contact" onClick={() => handleScrollTo(contactRef)}>Contact Us</p>
                </div>
                <div className={"header-imgs"}>
                    <img className="what" src={q} alt=""/>
                    <img className="teleg" src={w} alt=""/>
                    <img className="face" src={e} alt=""/>
                    <img className="ins" src={r} alt=""/>
                </div>
                <img className="black" src={t} alt=""/>
                <p className="eng">ENG</p>
                <img className="tel" src={y} alt=""/>
                <p className="number">+998901234567</p>
            </div>
            <p className="tour">{tourTitle}ga sayohat</p>
            <p className="sayohat">Sayohat qiling mazza qilib</p>
            <p className="desc">{tourDescription}</p>
            <p className="day">Day: {day}</p>
            <p className="price">Price: {totalCost}</p>
            <button onClick={toOrder} className="order-batafsil">Order</button>


            <div className="groups" ref={groupToursRef}>
                {videoSrc && (
                    <video
                        id={videoSrc}
                        src={videoSrc}
                        controls
                        className="video"
                    />
                )}
                {imageSrc && <img src={imageSrc} className="image-batafsil" alt="Tour Image"/>}
            </div>
            {batafsil.map((item, index) => (
                <div key={index}>
                    <div
                        className="batafsil-item"
                        style={{top: `${initialTop + index * increment}px`}}
                    >
                        <img src={`http://localhost:9090/files/img?name=${item.photo}`} className="image-batafsil2"
                             alt={`Day ${item.day} Image`}/>
                        <div className="batafsil-details">
                            <p className="batafsil-title">Day: {item.day}</p>
                            <h3 className="batafsil-subtitle">{item.title}</h3>
                            <p className="batafsil-description">{item.description}</p>
                            <img className="rasmcha" src={p} alt=""/>
                            <p className="batafsil-description2">{item.tour.description2}</p>
                        </div>
                    </div>
                    <div className="chiziq"></div>
                </div>
            ))}


            <div ref={aboutUsRef}>
                <p className="add">Additional Information</p>
                <p className="lorem">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut
                    commodo sagittis, sapien dui mattis dui, non pulvinar
                    lorem felis nec erat Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar
                    lorem felis nec eratLorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar
                    lorem felis nec eratLorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc maximu </p>
            </div>
            <p className="comment-batafsil">Comment</p>
            <Comment/>
            <div className="footer-container" ref={contactRef}>
                <div className="you">You can dream, create, design, and buildsa the most <br/> wonderful place.</div>
                <img className="footer-img" src={u} alt="Phone Icon"/>
                <p className="num2">+0123 456 987, +0123 456 987</p>
                <img className="footer-img2" src={i} alt="Email Icon"/>
                <p className="email">info@example.com</p>
                <img className="footer-img3" src={o} alt="Web Icon"/>
                <p className="www">www.example.com</p>
            </div>
            <div ref={footerRef}>
                <div className="footer-group">- Group Us</div>
                <div className="footer-group2">- About Us</div>
                <div className="footer-group3">- Connection</div>
                <div className="footer-group4">- Comment</div>
                <div className="support">Support:</div>
                <img src={w} className="teleg-3" alt=""/>
                <img src={q} className="what-3" alt=""/>
                <p className="teleg-comment">t.me/barlasvoyageAdmin</p>
                <p className="num3">+9988888888</p>
                <div className="img-icon">
                    <img className="teleg-4" src={q} alt="Telegram"/>
                    <img className="what-4" src={w} alt="WhatsApp"/>
                    <img src={e} alt="Facebook"/>
                    <img src={r} alt="Instagram"/>
                </div>
            </div>
            <Rodal visible={modalVisible} onClose={handleCloseModal} height={400} width={700}>
                <div className="rodal-content">
                    <EnquiryForm/>
                </div>
            </Rodal>
        </div>
    );
}

export default Batafsil;