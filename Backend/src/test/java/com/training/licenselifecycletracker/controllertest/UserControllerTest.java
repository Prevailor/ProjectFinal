package com.training.licenselifecycletracker.controllertest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.training.licenselifecycletracker.controller.UserController;
import com.training.licenselifecycletracker.dto.DeviceDTO;
import com.training.licenselifecycletracker.dto.ReplaceDTO;
import com.training.licenselifecycletracker.dto.SoftwareDTO;
import com.training.licenselifecycletracker.entities.Device;
import com.training.licenselifecycletracker.entities.Notification;
import com.training.licenselifecycletracker.entities.User;
import com.training.licenselifecycletracker.exceptions.DeviceNotFoundException;
import com.training.licenselifecycletracker.exceptions.UserNotFoundException;
import com.training.licenselifecycletracker.service.DeviceService;
import com.training.licenselifecycletracker.service.RegularUserService;

public class UserControllerTest {

    @Mock
    private RegularUserService regularUserService;

    @Mock
    private DeviceService deviceService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

 // Helper method to create a user with notifications
    private User createUserWithNotifications(String name, List<Notification> notifications) {
        User user = new User();
        user.setUsername(name);
        user.setNotifications(notifications);
        return user;
    }

    @Test
    public void testGetDevicesByUserId_Success() {
        // Arrange
        Integer userId = 1;
        List<DeviceDTO> deviceList = new ArrayList<>();
        deviceList.add(new DeviceDTO()); // Mock device
        when(regularUserService.getDevicesByUserId(userId)).thenReturn(deviceList);

        // Act
        ResponseEntity<List<DeviceDTO>> responseEntity = userController.getDevicesByUserId(userId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(deviceList, responseEntity.getBody());
    }

    @Test
    public void testGetDevicesByUserId_NotFound() {
        // Arrange
        Integer userId = 1;
        when(regularUserService.getDevicesByUserId(userId)).thenReturn(new ArrayList<>());

        // Act
        ResponseEntity<List<DeviceDTO>> responseEntity = userController.getDevicesByUserId(userId);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    public void testGetSoftwareByDeviceName_Success() {
        // Arrange
        String deviceName = "Device1";
        List<SoftwareDTO> softwareList = new ArrayList<>();
        softwareList.add(new SoftwareDTO()); // Mock software
        when(regularUserService.getSoftwareByDeviceName(deviceName)).thenReturn(softwareList);

        // Act
        ResponseEntity<List<SoftwareDTO>> responseEntity = userController.getSoftwareByDeviceName(deviceName);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(softwareList, responseEntity.getBody());
    }

    @Test
    public void testGetSoftwareByDeviceName_NotFound() {
        // Arrange
        String deviceName = "Device1";
        when(regularUserService.getSoftwareByDeviceName(deviceName)).thenReturn(new ArrayList<>());

        // Act
        ResponseEntity<List<SoftwareDTO>> responseEntity = userController.getSoftwareByDeviceName(deviceName);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    public void testRequestRenew_Success() {
        // Arrange
        SoftwareDTO softwareDTO = new SoftwareDTO();
        when(regularUserService.requestRenew(softwareDTO)).thenReturn("Renewal Request sent successfully");

        // Act
        String response = userController.requestRenew(softwareDTO);

        // Assert
        assertEquals("Renewal Request sent successfully", response);
    }

    @Test
    public void testRequestReplace_Success() {
        // Arrange
        ReplaceDTO replaceDTO = new ReplaceDTO();
        when(regularUserService.requestReplacement(replaceDTO)).thenReturn("Replacement Request sent successfully");

        // Act
        String response = userController.requestReplace(replaceDTO);

        // Assert
        assertEquals("Replacement Request sent successfully", response);
    }

    @Test
    public void testSearchDevicesByName_Success() throws DeviceNotFoundException {
        // Arrange
        String deviceName = "Device1";
        List<Device> deviceList = new ArrayList<>();
        deviceList.add(new Device()); // Mock device
        when(regularUserService.searchDevices(deviceName, null, null)).thenReturn(deviceList);

        // Act
        ResponseEntity<List<Device>> responseEntity = userController.searchDevicesByName(deviceName);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(deviceList, responseEntity.getBody());
    }

    @Test
    public void testSearchDevicesByName_NotFound() throws DeviceNotFoundException {
        // Arrange
        String deviceName = "Device1";
        when(regularUserService.searchDevices(deviceName, null, null)).thenReturn(new ArrayList<>());

        // Act
        ResponseEntity<List<Device>> responseEntity = userController.searchDevicesByName(deviceName);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    public void testSearchDevicesByStatus_Success() throws DeviceNotFoundException {
        // Arrange
        String status = "Active";
        List<Device> deviceList = new ArrayList<>();
        deviceList.add(new Device()); // Mock device
        when(regularUserService.searchDevices(null, status, null)).thenReturn(deviceList);

        // Act
        ResponseEntity<List<Device>> responseEntity = userController.searchDevicesByStatus(status);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(deviceList, responseEntity.getBody());
    }

    @Test
    public void testSearchDevicesByStatus_NotFound() throws DeviceNotFoundException {
        // Arrange
        String status = "Active";
        when(regularUserService.searchDevices(null, status, null)).thenReturn(new ArrayList<>());

        // Act
        ResponseEntity<List<Device>> responseEntity = userController.searchDevicesByStatus(status);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    public void testSearchDevicesByType_Success() throws DeviceNotFoundException {
        // Arrange
        String deviceType = "Type1";
        List<Device> deviceList = new ArrayList<>();
        deviceList.add(new Device()); // Mock device
        when(regularUserService.searchDevices(null, null, deviceType)).thenReturn(deviceList);

        // Act
        ResponseEntity<List<Device>> responseEntity = userController.searchDevicesByType(deviceType);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(deviceList, responseEntity.getBody());
    }

    @Test
    public void testSearchDevicesByType_NotFound() throws DeviceNotFoundException {
        // Arrange
        String deviceType = "Type1";
        when(regularUserService.searchDevices(null, null, deviceType)).thenReturn(new ArrayList<>());

        // Act
        ResponseEntity<List<Device>> responseEntity = userController.searchDevicesByType(deviceType);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }
    
    @Test
    public void testGetNotificationByUserId_UserHasNotifications() throws UserNotFoundException {
        // Arrange
        List<Notification> notifications = new ArrayList<>();
        notifications.add(new Notification());
        User user = createUserWithNotifications("John Doe", notifications);
        when(regularUserService.getUserById(1)).thenReturn(user);

        // Act
        ResponseEntity<List<Notification>> responseEntity = userController.getNotificationByUserId(1);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(notifications, responseEntity.getBody());
    }

    @Test
    public void testGetNotificationByUserId_UserHasNoNotifications() throws UserNotFoundException {
        // Arrange
        User user = createUserWithNotifications("John Doe", Collections.emptyList());
        when(regularUserService.getUserById(1)).thenReturn(user);

        // Act
        ResponseEntity<List<Notification>> responseEntity = userController.getNotificationByUserId(1);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals(null, responseEntity.getBody());
    }

    @Test
    public void testGetNotificationByUserId_UserNotFound() throws UserNotFoundException {
        // Arrange
        when(regularUserService.getUserById(1)).thenThrow(new UserNotFoundException("User not found with id: 1"));

        // Act
        try {
            userController.getNotificationByUserId(1);
        } catch (UserNotFoundException ex) {
            // Assert
            assertEquals("User not found with id: 1", ex.getMessage());
        }

        verify(regularUserService, times(1)).getUserById(1);
    }
}
