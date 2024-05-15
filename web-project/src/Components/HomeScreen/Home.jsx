import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import homeCSS from './Home.module.css';
import Navbar from '../Navbar/Navbar';

function Home() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState('');
  const [updateData, setUpdateData] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:3001/getAppointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleDelete = async (appointment) => {
    try {
      const response = await fetch('http://localhost:3001/deleteAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });
      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }
      setMessage('Appointment deleted successfully');
      // Refetch appointments after successful deletion
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
      setMessage('An error occurred while deleting appointment');
    }
  };

  const handleUpdate = (appointment) => {

    setUpdateData(appointment);
    setShowModal(true);
  };

  const handleSubmitUpdate = async () => {
    if (!updateData || !newDate || !newTime) {
      setMessage('Please provide new date and time');
      return;
    }
  
    let response; // Declare response variable outside try block
    const updatedAppointment = { ...updateData, newDate, newTime };

    try {
      response = await fetch('http://localhost:3001/updateAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAppointment),
      });
      if (!response.ok) {
        throw new Error(`Failed to update appointment: ${response.statusText}`);
      }
      setMessage('Appointment updated successfully');
      // Close the modal after successful update
      setShowModal(false);
      // Refetch appointments after successful update
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
      setMessage(JSON.stringify(updatedAppointment))

     // setMessage('An error occurred while updating appointment');
      // Log the error response if available
      if (response) {
        console.error('Error response:', await response.json());
      }
    }
  };
  

  return (
    <div className={homeCSS.pageWrapper}>
      <div className={homeCSS.top}></div>
      <div className={homeCSS.topp}>
        <Navbar />
      </div>

      <div className={homeCSS.cardContainer}>
        <div className={homeCSS.card}>
          <h1 style={{ marginBottom: '20px', color: '#006' }}>My Appointments</h1>
          <p>{message}</p>
          <table className={homeCSS.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Doctor Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment._id}>
                  <td>{appointment.name}</td>
                  <td>{appointment.doctorName}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>
                    <button onClick={() => handleUpdate(appointment)}>Update</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(appointment)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className={homeCSS.homeModal}>
          <div className={homeCSS.homeModalContent}>
            <span className='close' onClick={() => setShowModal(false)}>×</span>
            <h2>Update Appointment</h2>
            <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
            <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} />
            <button onClick={handleSubmitUpdate}>Update</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
