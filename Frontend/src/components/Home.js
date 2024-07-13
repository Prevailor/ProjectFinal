import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css'; // Import custom CSS for additional styling

import lifecycleImage from '../images/lifecycle.jpg';
import complianceImage from '../images/compliance.jpg';
import userInterfaceImage from '../images/user-interface.jpg';

const Home = () => {
  const [expandedFeatures, setExpandedFeatures] = useState({
    'Lifecycle Management': false,
    'Compliance and Reporting': false,
    'User-Friendly Interface': false
  });

  const toggleFeature = (feature) => {
    setExpandedFeatures(prevState => ({
      ...prevState,
      [feature]: !prevState[feature]
    }));
  };

  const features = [
    {
      title: "Lifecycle Management",
      image: lifecycleImage,
      description: "Track devices and software throughout their lifecycle.",
      expandedDescription: "Implement full lifecycle management for both hardware devices and software licenses."
    },
    {
      title: "Compliance and Reporting",
      image: complianceImage,
      description: "Ensure compliance and generate reports.",
      expandedDescription: "Ensure compliance with licensing terms and provide detailed reporting features."
    },
    {
      title: "User-Friendly Interface",
      image: userInterfaceImage,
      description: "Intuitive user interface for ease of use.",
      expandedDescription: "Admin and user level access controls to ensure secure and efficient management."
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to License Lifecycle Tracker</h1>
            <p className="hero-subtitle">Efficiently manage and monitor the lifecycle of licenses for network devices and software.</p>
            <button className="btn btn-primary hero-button">Get Started</button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-container">
        <div className="container">
          <div className="features-section row">
            {features.map((feature, index) => (
              <div className={`col-lg-4 feature ${expandedFeatures[feature.title] ? 'expanded' : ''}`} key={index} onClick={() => toggleFeature(feature.title)}>
                <div className="feature-inner">
                  <img src={feature.image} alt={feature.title} className="feature-image" />
                  <div className="feature-text">
                    <h2 className="feature-title">{feature.title}</h2>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </div>
                {expandedFeatures[feature.title] && (
                  <div className="expanded-description">
                    <p>{feature.expandedDescription}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-subtitle">Sign up today to start managing your licenses with ease.</p>
          <button className="btn btn-secondary cta-button">Sign Up Now</button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} License Lifecycle Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
