import React from 'react';
import { Link } from 'react-router-dom';
import img from '../asstes/homeimage.png';
import '../styles/Home.css'; // Ensure to import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="animated-header">Welcome to the Smart Health Prediction App</h1>
      <p className="description">Get predictions about your health based on the symptoms you provide. Our AI-driven app helps you understand your health better.</p>
      <Link to="/prediction" className="start-btn">Start Checkup</Link>
      <div className="image-wrapper"> 
        <img src={img} alt="Health Prediction" className="home-image" />
      </div>
      <div className="additional-info">
        <h2>How It Works</h2>
        <p>Simply enter your symptoms in the provided space, and our advanced algorithms will predict potential health issues.</p>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Fast and Accurate Predictions</li>
          <li>User-Friendly Interface</li>
          <li>Privacy and Security of Your Data</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
