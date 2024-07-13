package com.training.licenselifecycletracker.service;

import com.training.licenselifecycletracker.entities.Device;
import com.training.licenselifecycletracker.entities.Notification;
import com.training.licenselifecycletracker.entities.Software;
import com.training.licenselifecycletracker.entities.User;
import com.training.licenselifecycletracker.repositories.NotificationRepository;
import com.training.licenselifecycletracker.repositories.DeviceRepository;
import com.training.licenselifecycletracker.repositories.SoftwareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private SoftwareRepository softwareRepository;

    @Override
    @Transactional
    @Scheduled(cron = "0 0 9 * * *") 
    public void sendDeviceExpiryNotifications() {
        List<Device> devices = deviceRepository.findByEndOfLifeDateBefore(LocalDate.now().plusDays(30)); // Devices expiring within next 30 days

        for (Device device : devices) {
            User user = device.getUser(); // Assuming device has a reference to User entity
            String message = "Device '" + device.getDeviceName() + "' is expiring soon. Please review.";
            sendNotification(user, message);
        }
    }

    @Override
    @Transactional
    @Scheduled(cron = "0 0 9 * * *")
    public void sendSoftwareExpiryNotifications() {
        // Retrieve devices with software expiring within the next 30 days
        List<Device> devices = deviceRepository.findBySoftwareExpirationDateBefore(LocalDate.now().plusDays(30));

        for (Device device : devices) {
            // Iterate through each device's software list
            for (Software software : device.getSoftwareList()) {
                LocalDate softwareExpiryDate = software.getExpirationDate();
                if (softwareExpiryDate != null && softwareExpiryDate.isBefore(LocalDate.now().plusDays(30))) {
                    User user = device.getUser(); // Assuming device has a reference to User entity
                    String message = "Software '" + software.getSoftwareName() + "' license on device '"
                            + device.getDeviceName() + "' is expiring soon. Please review.";
                    sendNotification(user, message);
                }
            }
        }
    }

    private void sendNotification(User user, String message) {
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setMessage(message);
        notification.setSendDate(LocalDate.now());
        notificationRepository.save(notification);
    }
    // Other methods as needed
}
