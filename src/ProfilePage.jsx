import React, { useState } from 'react';
import './ProfilePage.css'; // Import the CSS file
import { postProfileData, postPython } from './Services/profileService'; // Import the service
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {ProfileImage} from './profile.png'
const ProfilePage = () => {
  const username = localStorage.getItem('username');
  const [formData, setFormData] = useState({
    startPoint: '',
    endPoint: '',
    distance: '',
    typeOfTransport: '',
    username: username,
    file:null
  });

  const file = formData.file
  const formImage = new FormData();
  //debugger
  // formImage.append('image', fileInput.files[0])
  console.log(file)

// console.log(filePath)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleDropdownChange = (e) => {
    setFormData({
      ...formData,
      typeOfTransport: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare data to be sent to the backend
    const dataToPost = {
      user_name: formData.username,
      distance_travel: formData.distance,
      trans_mode: formData.typeOfTransport,
    };
    console.log(dataToPost)
    try {
      const response = await postProfileData(dataToPost);
      console.log('Form data successfully posted:', response);
      // Handle successful respo    nse here
    } catch (error) {
      console.error('Error posting form data:', error);
      // Handle error here
    }

    try {
        const response = await postPython(formData.file);
        console.log("I am in")
        console.log('Form data successfully posted:', response);
        // Handle successful response here
      } catch (error) {
        console.error('Error posting form data:', error);
        // Handle error here
      }


  };

  return (
    <div className="profile-page">
      <nav className="navbar navbar-expand-lg navbar-light text-success">
        <a href="#" className="navbar-brand p-0">
          <h1 className='text-shadow'>
            <i className="fa fa-server me-3"></i>GreenHost
          </h1>
        </a>
        <button
          className="navbar-toggler text-center "
          id='button'
          data-bs-toggle="collapse"
         data-bs-target="#navbarCollapse"
        >
           =
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0 border-light">
            <a href="" className="nav-item nav-link text-success">
              Home
            </a>
            <a href="" className="nav-item nav-link  text-success">
              Ride Sharing
            </a>
            <Link to='/leaerbrd' className='text-success'>Leaderboard</Link>
          </div>
        </div>
      </nav>
    {/* <img src={ProfileImage} alt="" /> */}
      {username ? (
      <p className='mt-5'>Welcome <br />
      {username}</p>
      ) : (
        <p>No user is logged in.</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="container">
          <input
            className="form-control"
            type="text"
            placeholder="From"
            name="startPoint"
            value={formData.startPoint}
            onChange={handleChange}
          />
          <input
            className="form-control"
            type="text"
            placeholder="To"
            name="endPoint"
            value={formData.endPoint}
            onChange={handleChange}
          />
          <input
            className="form-control"
            type="text"
            placeholder=".km"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
          />
          <select
            className="form-select"
            name="typeOfTransport"
            value={formData.typeOfTransport}
            onChange={handleDropdownChange}
          >
            <option value="" className='text-light'>Transport</option>
            <option value="Car - Petrol">Car - Petrol</option>
            <option value="Car - Diesel">Car - Diesel</option>
            <option value="Car - Electric">Car - Electric</option>
            <option value="Bike">Bike</option>
            <option value="Bus / Metro">Bus / Metro</option>
            <option value="Cycle">Cycle</option>
            <option value="Walk">Walk</option>
          </select>
          <label className="btn-success me-5" htmlFor="fileUpload">
            Upload
          </label>
          <input
            type="file"
            id="fileUpload"
            className="d-none"
            onChange={handleFileChange}
          />
          
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
