import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Page.css';
import a from './batafilimg/Group 1.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Page() {
    const [page, setPage] = useState([]);

    useEffect(() => {
        getAll();
    }, []);

    function getAll() {
        axios.get('http://localhost:9090/api/comment/approved')
            .then(res => {
                setPage(res.data);
            })
            .catch(error => {
                console.error('Error fetching approved comments:', error);
            });
    }

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className="page-container">
            <Carousel responsive={responsive}>
                {page.map((comment, index) => (
                    <div key={index} className="comment-container">
                        <img width={59} height={22} src={a} alt="" />
                        <p className="comment-name">{comment.firstName} {comment.lastName}</p>
                        <p className="comment-text">{comment.text}</p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default Page;
