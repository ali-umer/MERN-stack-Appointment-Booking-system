import React, { useState, useEffect } from 'react';
import hospitalCSS from'./Hospital.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar/Navbar'; // Import the new Navbar component

const HospitalSearchPage = () => {
    const [initialHospitalData, setInitialHospitalData] = useState([]); // Store initial data
    const [hospitalData, setHospitalData] = useState([]); // Store filtered data
    const [showDescription, setShowDescription] = useState({});

    useEffect(() => {
        fetchData();
        // Retrieve selected location from local storage when the component mounts
        const savedLocation = localStorage.getItem("selectedLocation");
        if (savedLocation) {
            handleLocationChange(savedLocation);
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/getHospital');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setInitialHospitalData(data); // Save initial data
            setHospitalData(data); // Set initial data as filtered data
            const initialDescriptionState = {};
            data.forEach((_, index) => {
                initialDescriptionState[index] = false;
            });
            setShowDescription(initialDescriptionState);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const toggleDescription = (index) => {
        setShowDescription((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const handleLocationChange = (location) => {
        // Save selected location to local storage
        localStorage.setItem("selectedLocation", location);
        // Filter hospital data based on the selected location
        const filteredData = initialHospitalData.filter(hospital => hospital.Location === location);
        setHospitalData(filteredData); // Update filtered data
    };

    return (
        
        <div className={hospitalCSS.Hospitalcontainer}>
            <div className={hospitalCSS.toppH}>
                <Navbar handleLocationChange={handleLocationChange} />
            </div>
            <h1>Hospitals</h1>
            <div className={hospitalCSS.hospitalCards}>
                {hospitalData.map((hospital, index) => (
                    <div className={hospitalCSS.hospitalCard} key={index}>
                        <div className={hospitalCSS.hospitalInfo}>
                            <FontAwesomeIcon icon={faHospital} className={hospitalCSS.hospitalIcon} />
                        </div>
                        <div className={hospitalCSS.details}>
                            <div>
                                <h3>Name: {hospital.Name}</h3>
                                <p>Address: {hospital.Address}</p>
                                <p>Location: {hospital.Location}</p>
                                <p>Types of Doctors: {hospital['TypesofDoctors']}</p>
                                <p>Description: {hospital.Description}</p>
                                {showDescription[index] && (
                                    <p>Additional Description: {hospital.AdditionalDescription}</p>
                                )}
                            </div>
                            <div className={hospitalCSS.additionalDetails}>
                                <button className={hospitalCSS.callNow}>
                                    <FontAwesomeIcon icon={faPhoneAlt} className="callIcon" />
                                    Call Now
                                </button>
                                <button className={hospitalCSS.viewDescription} onClick={() => toggleDescription(index)}>
                                    {showDescription[index] ? 'Hide Description' : 'View Description'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HospitalSearchPage;
