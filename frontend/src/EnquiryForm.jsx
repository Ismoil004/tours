import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './styles/EnquiryForm.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchTourRequest } from "./redux/reducer/tourReducer.js";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EnquiryForm = ({ selectedTourTitle }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { tours } = useSelector(state => state.tour);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTourRequest());
    }, [dispatch]);

    const onSubmit = async (data) => {
        try {
            console.log(data);
            const response = await axios.post('http://localhost:9090/api/enquiry', data);
            console.log(response.data);
            toast.success('Enquiry submitted successfully!');
            reset();
        } catch (error) {
            console.error('There was an error submitting the enquiry:', error);
            toast.error('Failed to submit enquiry');
        }
    };

    return (
        <>
            <ToastContainer />
            <form className="enquiry-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <div>
                        <input
                            placeholder="Lastname..."
                            className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                            {...register('lastname', { required: 'Lastname is required' })}
                        />
                        {errors.lastname && <p className="error-message">{errors.lastname.message}</p>}
                    </div>
                    <div>
                        <input
                            placeholder="Firstname..."
                            className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                            {...register('firstname', { required: 'Firstname is required' })}
                        />
                        {errors.firstname && <p className="error-message">{errors.firstname.message}</p>}
                    </div>
                    <div>
                        <input
                            placeholder="Phone number..."
                            className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                            {...register('phoneNumber', {
                                required: 'Phone number is required!',
                                pattern: {
                                    value: /^\+998\d{9}$/,
                                    message: 'Phone number must start with +998 and be followed by exactly 9 digits',
                                }
                            })}
                        />
                        {errors.phoneNumber && <p className="error-message">{errors.phoneNumber.message}</p>}
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <input
                            placeholder="Email address..."
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            {...register('email', {
                                required: 'Email must be entered',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                    message: 'Invalid email format (must be a gmail address)',
                                },
                            })}
                        />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </div>
                    <div>
                        <textarea
                            placeholder="Text..."
                            className={`form-controls ${errors.text ? 'is-invalid' : ''}`}
                            {...register('text', { required: 'Text must be entered' })}
                        />
                        {errors.text && <p className="error-message">{errors.text.message}</p>}
                    </div>
                    <div>
                        <select
                            className={`form-control ${errors.tourName ? 'is-invalid' : ''}`}
                            {...register('tourName', { required: 'Tour name must be selected' })}
                            defaultValue={selectedTourTitle} // Set the initial value from prop
                        >
                            <option value="">{selectedTourTitle || 'Select a tour'}</option>
                            {tours.map((tour) => (
                                <option key={tour.id} value={tour.title}>
                                    {tour.title}
                                </option>
                            ))}
                        </select>
                        {errors.tourName && <p className="error-message">{errors.tourName.message}</p>}
                    </div>
                </div>
                <button className="submit-button" type="submit">Send</button>
            </form>
        </>
    );
};

export default EnquiryForm;
