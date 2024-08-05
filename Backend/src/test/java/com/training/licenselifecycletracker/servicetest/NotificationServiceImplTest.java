package com.training.licenselifecycletracker.servicetest;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.training.licenselifecycletracker.entities.Device;
import com.training.licenselifecycletracker.entities.Notification;
import com.training.licenselifecycletracker.entities.Software;
import com.training.licenselifecycletracker.entities.User;
import com.training.licenselifecycletracker.repositories.DeviceRepository;
import com.training.licenselifecycletracker.repositories.NotificationRepository;
import com.training.licenselifecycletracker.repositories.SoftwareRepository;
import com.training.licenselifecycletracker.service.NotificationServiceImpl;

public class NotificationServiceImplTest {

    @Mock
    private NotificationRepository notificationRepository;

    @Mock
    private DeviceRepository deviceRepository;

    @Mock
    private SoftwareRepository softwareRepository;

    @InjectMocks
    private NotificationServiceImpl notificationService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    
    // Helper method to create a device
    private Device createDevice(String name, LocalDate softwareExpiryDate, User user) {
        Device device = new Device();
        device.setDeviceName(name);
        device.setUser(user);

        Software software = new Software();
        software.setExpirationDate(softwareExpiryDate);
        software.setSoftwareName("Test Software");

        device.setSoftwareList(Collections.singletonList(software));
        return device;
    }

    // Helper method to create a device with empty software list
    private Device createDeviceWithEmptySoftwareList(String name, User user) {
        Device device = new Device();
        device.setDeviceName(name);
        device.setUser(user);
        device.setSoftwareList(Collections.emptyList());
        return device;
    }

    // Helper method to create a user
    private User createUser(String name) {
        User user = new User();
        user.setUsername(name);
        return user;
    }

    @Test
    public void testSendDeviceExpiryNotifications_DevicesExpiring() {
        // Arrange
        User user = createUser("John Doe");
        Device device = createDevice("Device1", LocalDate.now().plusDays(15), user);
        List<Device> devices = Collections.singletonList(device);

        when(deviceRepository.findByEndOfLifeDateBefore(LocalDate.now().plusDays(30))).thenReturn(devices);

        // Act
        notificationService.sendDeviceExpiryNotifications();

        // Assert
        verify(notificationRepository, times(1)).save(any(Notification.class));
    }

    @Test
    public void testSendDeviceExpiryNotifications_NoDevicesExpiring() {
        // Arrange
        when(deviceRepository.findByEndOfLifeDateBefore(LocalDate.now().plusDays(30))).thenReturn(Collections.emptyList());

        // Act
        notificationService.sendDeviceExpiryNotifications();

        // Assert
        verify(notificationRepository, never()).save(any(Notification.class));
    }
    
//    @Test
//    public void testSendSoftwareExpiryNotifications_SoftwareExpiring() {
//        // Arrange
//        User user = createUser("John Doe");
//        Device device = createDevice("Device1", LocalDate.now().plusDays(15), user);
//        List<Device> devices = Collections.singletonList(device);
//
//        when(deviceRepository.findBySoftwareExpirationDateBefore(LocalDate.now().plusDays(30))).thenReturn(devices);
//
//    }

//    @Test
//    public void testSendSoftwareExpiryNotifications_NoSoftwareExpiring() {
//        // Arrange
//        User user = createUser("John Doe");
//        Device device = createDevice("Device1", LocalDate.now().plusDays(31), user);
//        List<Device> devices = Collections.singletonList(device);
//
//        when(deviceRepository.findBySoftwareExpirationDateBefore(LocalDate.now().plusDays(30))).thenReturn(devices);
//
//        // Act
//       // notificationService.sendSoftwareExpiryNotifications();
//
//        // Assert
//        verify(notificationRepository, never()).save(any(Notification.class));
//    }

    @Test
    public void testSendSoftwareExpiryNotifications_NoSoftware() {
        // Arrange
        User user = createUser("John Doe");
        Device device = new Device();
        device.setDeviceName("Device1");
        device.setUser(user);
        device.setSoftwareList(Collections.emptyList());
        List<Device> devices = Collections.singletonList(device);

        when(deviceRepository.findBySoftwareExpirationDateBefore(LocalDate.now().plusDays(30))).thenReturn(devices);

        // Act
        notificationService.sendSoftwareExpiryNotifications();

        // Assert
        verify(notificationRepository, never()).save(any(Notification.class));
    }
    
    @Test
    public void testSendSoftwareExpiryNotifications_SoftwareExpiring() {
        // Arrange
        User user = createUser("John Doe");
        Device device = createDevice("Device1", LocalDate.now().plusDays(15), user);
        List<Device> devices = Collections.singletonList(device);

        when(deviceRepository.findBySoftwareExpirationDateBefore(LocalDate.now().plusDays(30))).thenReturn(devices);

        // Act
        notificationService.sendSoftwareExpiryNotifications();

        // Assert
        verify(notificationRepository, times(1)).save(any(Notification.class));
    }

    @Test
    public void testSendSoftwareExpiryNotifications_NoSoftwareExpiring() {
        // Arrange
        User user = createUser("John Doe");
        Device device = createDevice("Device1", LocalDate.now().plusDays(31), user);
        List<Device> devices = Collections.singletonList(device);

        when(deviceRepository.findBySoftwareExpirationDateBefore(LocalDate.now().plusDays(30))).thenReturn(devices);

        // Act
        notificationService.sendSoftwareExpiryNotifications();

        // Assert
        verify(notificationRepository, never()).save(any(Notification.class));
    }


    @Test
    public void testSendSoftwareExpiryNotifications_MultipleSoftware_SomeExpiring() {
        // Arrange
        User user = createUser("John Doe");
        Device device = new Device();
        device.setDeviceName("Device1");
        device.setUser(user);

        Software software1 = new Software();
        software1.setExpirationDate(LocalDate.now().plusDays(15));
        software1.setSoftwareName("Software1");

        Software software2 = new Software();
        software2.setExpirationDate(LocalDate.now().plusDays(31));
        software2.setSoftwareName("Software2");

        device.setSoftwareList(Arrays.asList(software1, software2));
        List<Device> devices = Collections.singletonList(device);

        when(deviceRepository.findBySoftwareExpirationDateBefore(LocalDate.now().plusDays(30))).thenReturn(devices);

        // Act
        notificationService.sendSoftwareExpiryNotifications();

        // Assert
        verify(notificationRepository, times(1)).save(any(Notification.class));
    }

    @Test
    public void testSendSoftwareExpiryNotifications_SoftwareExpirationDateNull() {
        // Arrange
        User user = createUser("John Doe");
        Device device = new Device();
        device.setDeviceName("Device1");
        device.setUser(user);

        Software software = new Software();
        software.setExpirationDate(null);
        software.setSoftwareName("Test Software");

        device.setSoftwareList(Collections.singletonList(software));
        List<Device> devices = Collections.singletonList(device);

        when(deviceRepository.findBySoftwareExpirationDateBefore(LocalDate.now().plusDays(30))).thenReturn(devices);

        // Act
        notificationService.sendSoftwareExpiryNotifications();

        // Assert
        verify(notificationRepository, never()).save(any(Notification.class));
    }
}
