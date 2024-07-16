// import React from "react";
// import AuthService from "../services/auth.service";

// const Profile = () => {
//   const currentUser = AuthService.getCurrentUser();

//   return (
//     <div className="container">
//       <header className="jumbotron">
//         <h3>
//           <strong>{currentUser.username}</strong> Profile
          
//         </h3>
//       </header>
//       {/* <p>
//         <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
//         {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
//       </p> */}
//       <p>
//         <strong>Id:</strong> {currentUser.id}
//       </p>
//       <p>
//         <strong>Email:</strong> {currentUser.email}
//       </p>
//       <strong>Authorities:</strong>
//       <ul>
//         {currentUser.roles }
//       </ul>
//     </div>
//   );
// };

// export default Profile;



import 'D:\\ProjectFinal\\Frontend\\src\\Profile.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';
import AuthService from '../services/auth.service';
import RegularUserService from '../services/RegularUserService';

 
const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [deviceCount, setDeviceCount] = useState(0);
  const [softwareCount, setSoftwareCount] = useState(0);
  const [recentDevices, setRecentDevices] = useState([]);
 
  const isRegularUser = Array.isArray(currentUser.roles)
    ? currentUser.roles.includes("ROLE_USER")
    : currentUser.roles === "ROLE_USER";
 
  useEffect(() => {
    if (isRegularUser) {
      fetchUserData();
    }
  }, []);
 
  const fetchUserData = async () => {
    try {
      const devices = await RegularUserService.viewDevices(currentUser.id);
      setDeviceCount(devices.length);
      setRecentDevices(devices.slice(0, 3)); // Get last 3 devices
 
      // Fetch software for all devices
      let totalSoftwareCount = 0;
      for (const device of devices) {
        const software = await RegularUserService.viewSoftwareByDeviceName(device.deviceName);
        totalSoftwareCount += software.length;
      }
      setSoftwareCount(totalSoftwareCount);
 
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
 
  return (
    <Container className="profile-container my-5">
      <Row>
        <Col lg={4}>
          <Card className="profile-card">
            <div className="profile-cover"></div>
            <Card.Body className="text-center">
              <div className="profile-avatar">
                <span className="profile-initial">{currentUser.username[0]}</span>
              </div>
              <Card.Title className="mt-3">{currentUser.username}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {Array.isArray(currentUser.roles)
                  ? currentUser.roles.join(', ')
                  : currentUser.roles || 'No role specified'}
              </Card.Subtitle>
              <Badge bg="primary" className="profile-badge">Active User</Badge>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <i className="fas fa-envelope me-2"></i> {currentUser.email}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={8}>
          {isRegularUser ? (
            <>
              <Card className="profile-details">
                <Card.Body>
                  <h4 className="mb-4">Account Overview</h4>
                  <Row>
                    <Col md={6}>
                      <div className="profile-stat">
                        <i className="fas fa-laptop"></i>
                        <div>
                          <h5>Total Devices</h5>
                          <p>{deviceCount}</p>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="profile-stat">
                        <i className="fas fa-code"></i>
                        <div>
                          <h5>Total Software</h5>
                          <p>{softwareCount}</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card className="profile-details mt-4">
                <Card.Body>
                  <h4 className="mb-4">Recent Devices</h4>
                  <ListGroup>
                    {recentDevices.map((device, index) => (
                      <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                        {device.deviceName}
                        <Badge bg="info">{device.deviceType}</Badge>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </>
          ) : (
            <Card className="profile-details">
              <Card.Body>
                <h4 className="mb-4">Welcome, {currentUser.username}!</h4>
                <p>You are logged in as an {Array.isArray(currentUser.roles) ? currentUser.roles.join(', ') : currentUser.roles}.</p>
                <p>Use the navigation menu to access your specific features and functionalities.</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card className="profile-quote">
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>"The only way to do great work is to love what you do."</p>
                <footer className="blockquote-footer">Steve Jobs</footer>
              </blockquote>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
 
export default Profile;