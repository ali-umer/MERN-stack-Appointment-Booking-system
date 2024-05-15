import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import appointmentCSS from './Appointment.module.css';
import Navbar from '../Navbar/Navbar';

function Appointment() {
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [doctorName, setDoctorName] = useState(localStorage.getItem('selectedDoctor') || '');
    const [bookingStatus, setBookingStatus] = useState(null);

    const handleBooking = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        try {
            const appointmentData = {
                name: username,
                doctorName: doctorName,
                date: event.target.elements.date.value,
                time: event.target.elements.time.value
            };

            const response = await fetch('http://localhost:3001/bookAppointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });

            const responseData = await response.json();

            if (response.ok) {
                setBookingStatus(responseData.message);
            } else {
                setBookingStatus(responseData.message || "Failed to book appointment");
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            setBookingStatus("Failed to book appointment");
        }
    };

    return (
        <div className={appointmentCSS.pageWrapperA}>
            <div className={appointmentCSS.topA}></div>
            <div className={appointmentCSS.toppA}>
                <Navbar />
            </div>

            <div className={appointmentCSS.cardContainerA}>
                <div className={appointmentCSS.cardA}>
                    <h1 style={{ marginBottom: '20px', color: '#006' }}>Book Appointment</h1>
                    <form className={appointmentCSS.AppForm} onSubmit={handleBooking}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={username}
                            style={{ color: 'gray' }}
                            required
                            disabled
                        />
                        <input
                            type="text"
                            placeholder="Doctor Name"
                            value={doctorName}
                            style={{ color: 'gray' }}
                            required
                            disabled
                        />
                        <div className={appointmentCSS.inlineFields}>
                            <input
                                type="date"
                                placeholder="Date"
                                name="date"
                                required
                            />
                            <input
                                type="time"
                                placeholder="Time"
                                name="time"
                                required
                            />
                        </div>

                        <button type="submit" className={appointmentCSS.bookButton}>Book</button>
                    </form>
                    {bookingStatus && <p>{bookingStatus}</p>}
                </div>
            </div>
        </div>
    );
}

export default Appointment;
