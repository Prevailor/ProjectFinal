import React, { useState, useEffect } from 'react';
import 'D:\\ProjectFinal\\Frontend\\src\\Notification.css'; // Import your external CSS file
import authHeader from '../services/auth-header';
import AuthService from "../services/auth.service";

const Notifications = () => {
    
    const [loading, setLoading] = useState(true);
    const [deviceNotifications, setDeviceNotifications] = useState([]);
    const [error, setError] = useState(null);
    const [hasNewNotification, setHasNewNotification] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const currentUser = AuthService.getCurrentUser();
                const userId = currentUser.id;

                const deviceResponse = await fetch(`http://localhost:8080/api/user/notifications/${userId}`, {
                    headers: {
                        ...authHeader(),
                        'Access-Control-Allow-Origin': '*'
                    }
                });

                if (!deviceResponse.ok) {
                    throw new Error('Failed to fetch notifications');
                }

                const deviceData = await deviceResponse.json();

                // Assuming deviceData is an array of objects with properties: notificationId, message, sendDate
                setDeviceNotifications(deviceData);
                setLoading(false);
                setHasNewNotification(true); // Trigger new notification indicator
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchNotifications(); // Fetch notifications on component mount

    }, []);

    useEffect(() => {
        const handleNewNotification = () => {
            if (hasNewNotification) {
                setTimeout(() => setHasNewNotification(false), 3000); // Reset after 3 seconds
            }
        };

        handleNewNotification(); // Check for new notification state
    }, [hasNewNotification]);

    if (loading) {
        return <div className="notifications-container">Loading...</div>;
    }

    if (error) {
        return <div className="error-container">Error: {error}</div>;
    }

    return (
        <div className="notifications-container">
            <h2 className="notifications-heading">Notifications</h2>
            <ul className="notifications-list">
                {deviceNotifications.map((notification, index) => (
                    <li key={index} className="notification-item">
                        <div className="notification-content">
                            <div className="notification-message">
                                {/* <strong>Message:</strong> {notification.message}<br /> */}
                                {notification.message}<br />
                            </div>
                            <div className="notification-sent-date">
                                {/* <strong>Sent Date:</strong> {notification.sendDate}<br /> */}
                                {notification.sendDate}<br />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {hasNewNotification && <div className="new-notification-icon"></div>} {/* New notification indicator */}
        </div>
    );
};

export default Notifications;