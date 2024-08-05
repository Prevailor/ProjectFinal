package com.training.licenselifecycletracker.controllertest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.training.licenselifecycletracker.controller.AdminController;
import com.training.licenselifecycletracker.dto.DeviceDTO;
import com.training.licenselifecycletracker.dto.LifecycleEventDTO;
import com.training.licenselifecycletracker.dto.SoftwareDTO;
import com.training.licenselifecycletracker.entities.ERole;
import com.training.licenselifecycletracker.entities.Role;
import com.training.licenselifecycletracker.entities.User;
import com.training.licenselifecycletracker.exceptions.DeviceNotFoundException;
import com.training.licenselifecycletracker.exceptions.UserNotFoundException;
import com.training.licenselifecycletracker.service.DeviceService;
import com.training.licenselifecycletracker.service.RegularUserService;

public class AdminControllerTest {

    @Mock
    private RegularUserService regularUserService;

    @Mock
    private DeviceService deviceService;

    @InjectMocks
    private AdminController adminController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddDevice_Success() {
        // Arrange
        DeviceDTO deviceDTO = new DeviceDTO();
        when(deviceService.addDevice(deviceDTO)).thenReturn(deviceDTO);

        // Act
        ResponseEntity<DeviceDTO> responseEntity = adminController.addDevice(deviceDTO);

        // Assert
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(deviceDTO, responseEntity.getBody());
    }

    @Test
    public void testUpdateDevice_Success() throws DeviceNotFoundException {
        // Arrange
        Integer deviceId = 1;
        DeviceDTO deviceDTO = new DeviceDTO();
        deviceDTO.setDeviceId(deviceId);
        when(deviceService.updateDevice(deviceDTO)).thenReturn(deviceDTO);

        // Act
        ResponseEntity<DeviceDTO> responseEntity = adminController.updateDevice(deviceId, deviceDTO);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(deviceDTO, responseEntity.getBody());
    }


   
   
//    @Test
//    public void testGetDeviceById_Success() throws DeviceNotFoundException {
//        // Arrange
//        Integer deviceId = 1;
//        DeviceDTO mockDevice = new DeviceDTO();
//        mockDevice.setDeviceId(deviceId); // Set other necessary fields if any
//        when(deviceService.getDeviceById(deviceId)).thenReturn(mockDevice);
//
//        // Act
//        ResponseEntity<DeviceDTO> responseEntity = adminController.getDeviceById(deviceId);
//
//        // Assert
//        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
//        assertEquals(mockDevice, responseEntity.getBody());  // Verify the returned device
//    }

//    @Test
//    public void testGetDeviceById_DeviceNotFoundException() throws DeviceNotFoundException {
//        // Arrange
//        Integer deviceId = 1;
//        when(deviceService.getDeviceById(deviceId)).thenThrow(new DeviceNotFoundException("Device not found"));
//
//        // Act
//        ResponseEntity<DeviceDTO> responseEntity = adminController.getDeviceById(deviceId);
//
//        // Assert
//        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
//        assertEquals(null, responseEntity.getBody());  // Verify that the body is null
//    }
//    
//    @Test
//    public void testGetDeviceById_InvalidDeviceId() throws DeviceNotFoundException {
//        // Arrange
//        Integer invalidDeviceId = null;  // Or use a negative number, or any value that should be considered invalid
//        // Assuming DeviceNotFoundException is thrown for invalid IDs
//        when(deviceService.getDeviceById(invalidDeviceId)).thenThrow(new DeviceNotFoundException("Device not found"));
//
//        // Act
//        ResponseEntity<DeviceDTO> responseEntity = adminController.getDeviceById(invalidDeviceId);
//
//        // Assert
//        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
//        assertEquals(null, responseEntity.getBody());  // Verify that the body is null
//    }


    @Test
    public void testGetAllDevices_Success() {
        // Arrange
        List<DeviceDTO> mockDevices = Arrays.asList(new DeviceDTO(), new DeviceDTO()); // Create mock devices
        when(deviceService.getAllDevices()).thenReturn(mockDevices);

        // Act
        ResponseEntity<List<DeviceDTO>> responseEntity = adminController.getAllDevices();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(mockDevices, responseEntity.getBody());  // Verify the returned list
    }

    @Test
    public void testGetAllDevices_EmptyList() {
        // Arrange
        List<DeviceDTO> emptyList = Collections.emptyList();
        when(deviceService.getAllDevices()).thenReturn(emptyList);

        // Act
        ResponseEntity<List<DeviceDTO>> responseEntity = adminController.getAllDevices();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertTrue(responseEntity.getBody().isEmpty());  // Verify that the list is empty
    }
    
    @Test
    public void testDeleteDevice_Success() throws DeviceNotFoundException {
        // Arrange
        Integer deviceId = 1;
        // No need to mock deleteDevice since it is expected to succeed

        // Act
        ResponseEntity<Void> responseEntity = adminController.deleteDevice(deviceId);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, responseEntity.getStatusCode());
    }


    @Test
    public void testAddSoftwareToDevice_Success() throws DeviceNotFoundException {
        // Arrange
        Integer deviceId = 1;
        SoftwareDTO softwareDTO = new SoftwareDTO(); // Set necessary fields for the DTO
        DeviceDTO updatedDeviceDTO = new DeviceDTO(); // Mocked updated device DTO with software

        when(deviceService.addSoftwareToDevice(deviceId, softwareDTO)).thenReturn(updatedDeviceDTO);

        // Act
        ResponseEntity<DeviceDTO> responseEntity = adminController.addSoftwareToDevice(deviceId, softwareDTO);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(updatedDeviceDTO, responseEntity.getBody());
    }

    @Test
    public void testAddLifecycleEventToDevice_Success() throws DeviceNotFoundException {
        // Arrange
        Integer deviceId = 1;
        LifecycleEventDTO lifecycleEventDTO = new LifecycleEventDTO(); // Set necessary fields for the DTO
        DeviceDTO updatedDeviceDTO = new DeviceDTO(); // Mocked updated device DTO with lifecycle event

        when(deviceService.addLifecycleEventToDevice(deviceId, lifecycleEventDTO)).thenReturn(updatedDeviceDTO);

        // Act
        ResponseEntity<DeviceDTO> responseEntity = adminController.addLifecycleEventToDevice(deviceId, lifecycleEventDTO);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(updatedDeviceDTO, responseEntity.getBody());
    }


//    @Test
//    public void testUpdateUserRole_Success() throws UserNotFoundException {
//        // Arrange
//        Integer userId = 1;
//        Role role = new Role(); // Set necessary fields for the Role object
//        String expectedResult = "Role updated successfully";
//        
//        when(deviceService.updateRole(userId, role)).thenReturn(expectedResult);
//        
//        // Act
//        ResponseEntity<String> responseEntity = adminController.updateUserRole(userId, role);
//        
//        // Assert
//        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
//        assertEquals(expectedResult, responseEntity.getBody());
//    }
//
//    @Test
//    public void testUpdateUserRole_UserNotFoundException() throws UserNotFoundException {
//        // Arrange
//        Integer userId = 1;
//        Role role = new Role(); // Set necessary fields for the Role object
//        
//        when(deviceService.updateRole(userId, role)).thenThrow(new UserNotFoundException("User not found"));
//
//        // Act
//        ResponseEntity<String> responseEntity = adminController.updateUserRole(userId, role);
//
//        // Assert
//        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
//        assertEquals("User not found", responseEntity.getBody());
//    }
//
//    @Test
//    public void testUpdateUserRole_InternalServerError() throws UserNotFoundException {
//        // Arrange
//        Integer userId = 1;
//        Role role = new Role(); // Set necessary fields for the Role object
//        
//        when(deviceService.updateRole(userId, role)).thenThrow(new RuntimeException("Unexpected error"));
//
//        // Act
//        ResponseEntity<String> responseEntity = adminController.updateUserRole(userId, role);
//
//        // Assert
//        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
//        assertEquals("An error occurred while updating the user role.", responseEntity.getBody());
//    }

    
    @Test
    public void testGetAllUsers_Success() {
        // Arrange
        List<User> users = Arrays.asList(
            new User(/* initialize with test data */),
            new User(/* initialize with test data */)
        );
        
        when(regularUserService.getAllUsers()).thenReturn(users);
        
        // Act
        ResponseEntity<List<User>> responseEntity = adminController.getAllUsers();
        
        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(users, responseEntity.getBody());
    }

    @Test
    public void testGetAllUsers_EmptyList() {
        // Arrange
        List<User> users = Collections.emptyList();
        
        when(regularUserService.getAllUsers()).thenReturn(users);
        
        // Act
        ResponseEntity<List<User>> responseEntity = adminController.getAllUsers();
        
        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertTrue(responseEntity.getBody().isEmpty());  // Ensure the list is empty
    }
    
    @Test
    public void testGetDeviceById_Success() throws DeviceNotFoundException {
        // Arrange
        Integer deviceId = 1;
        DeviceDTO mockDevice = new DeviceDTO();
        mockDevice.setDeviceId(deviceId); // Set other necessary fields if any
        when(deviceService.getDeviceById(deviceId)).thenReturn(mockDevice);

        // Act
        ResponseEntity<DeviceDTO> responseEntity = adminController.getDeviceById(deviceId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(mockDevice, responseEntity.getBody()); // Verify the returned device
    }

  
    @Test
    void updateUserRole_Success() throws UserNotFoundException {
        // Arrange
        Integer userId = 1;
        Role role = new Role();
        when(deviceService.updateRole(userId, role)).thenReturn("Role updated successfully");
 
        // Act
        ResponseEntity<String> response = adminController.updateUserRole(userId, role);
 
        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Role updated successfully", response.getBody());
        verify(deviceService, times(1)).updateRole(userId, role);
    }
 
    @Test
    void updateUserRole_UserNotFound() throws UserNotFoundException {
        // Arrange
        Integer userId = 1;
        Role role = new Role();
        when(deviceService.updateRole(userId, role)).thenThrow(new UserNotFoundException("User not found"));
 
        // Act
        ResponseEntity<String> response = adminController.updateUserRole(userId, role);
 
        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("User not found", response.getBody());
        verify(deviceService, times(1)).updateRole(userId, role);
    }
 
    @Test
    void updateUserRole_InternalServerError() throws UserNotFoundException {
        // Arrange
        Integer userId = 1;
        Role role = new Role();
        when(deviceService.updateRole(userId, role)).thenThrow(new RuntimeException("Database error"));
 
        // Act
        ResponseEntity<String> response = adminController.updateUserRole(userId, role);
 
        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An error occurred while updating the user role.", response.getBody());
        verify(deviceService, times(1)).updateRole(userId, role);
    }
 
    @Test
    void updateUserRole_NullUserId() throws UserNotFoundException {
        // Arrange
        Role role = new Role();
 
        // Act
        ResponseEntity<String> response = adminController.updateUserRole(null, role);
 
        
    }
 
    @Test
    void updateUserRole_NullRole() throws UserNotFoundException {
        // Arrange
        Integer userId = 1;
 
        // Act
        ResponseEntity<String> response = adminController.updateUserRole(userId, null);
 
       
    }
}
