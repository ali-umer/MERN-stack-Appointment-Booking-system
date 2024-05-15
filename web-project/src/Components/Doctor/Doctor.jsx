import React, { useState, useEffect } from 'react';
import doctorCSS from './Doctor.module.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons'; // Changed to doctor icon
import Navbar from '../Navbar/Navbar';

const DoctorCard = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [doctorData, setDoctorData] = useState([]); // State to store doctor data
  const [showDescription, setShowDescription] = useState({}); // State to track description visibility

  useEffect(() => {
    // Fetch doctor data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/getDoctor');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDoctorData(data); // Set the fetched doctor data to state
        // Initialize description visibility state for each doctor
        const initialDescriptionState = {};
        data.forEach((doctor, index) => {
          initialDescriptionState[index] = false;
        });
        setShowDescription(initialDescriptionState);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on mount
  useEffect(() => {
    // Retrieve selected specialization from local storage
    const savedSpecialization = localStorage.getItem("selectedSpecialization");
    setSelectedSpecialization(savedSpecialization);
  }, []);

  const toggleDescription = (index) => {
    setShowDescription((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle description visibility for the specific doctor
    }));
  };

  const filterDoctorsBySpecialization = () => {
    if (!selectedSpecialization) {
      return doctorData; // If no specialization selected, return all doctors
    }
    return doctorData.filter((doctor) => doctor.type === selectedSpecialization);
  };

  const handleSpecializationChange = (specialization) => {
    setSelectedSpecialization(specialization);
    // Save selected specialization to local storage
    localStorage.setItem("selectedSpecialization", specialization);
  };

  const handleBookAppointment = (doctorName) => {
    localStorage.setItem("selectedDoctor", doctorName);
    window.location.href = "/Appointment";
  };

  return (
    <div>
      <div className={doctorCSS.toppD}>
      <Navbar handleSpecializationChange={handleSpecializationChange} /> {/* Pass handleSpecializationChange function as prop */}
            </div>
      
      <div className={doctorCSS.containerA}>
        {filterDoctorsBySpecialization().map((doctor, index) => (
          <div className={doctorCSS.doctorCard} key={index}>
            <div className={doctorCSS.doctorInfo}>
              <FontAwesomeIcon icon={faUserMd} className={doctorCSS.doctorIcon} />
            </div>
            <div className={doctorCSS.details}>
              <div>
                <h3>{doctor.name}</h3>
                <p>Specialization: {doctor.type}</p>
                <p>Degree: {doctor.study}</p>
              </div>
              <div>
                <p>Location: {doctor.location}</p>
                <p>Availability: {doctor.waitTime}</p>
              </div>
              <div>
                <p>Services Offered: {doctor.description}</p>
              </div>
              {showDescription[index] && (
                <div>
                  <p>Description: {doctor.description}</p>
                  <p>Additional Description: {doctor.additionalDescription}</p>
                </div>
              )}
              <div className={doctorCSS.additionalDetails} style={{color:'black'}}>
                <button className={doctorCSS.bookAppointment} onClick={() => handleBookAppointment(doctor.name)}>Book Appointment</button>

                <button className={doctorCSS.viewDescription} style={{color:'black'}} onClick={() => toggleDescription(index)}>
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

export default DoctorCard;
