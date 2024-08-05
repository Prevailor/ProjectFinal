package com.training.licenselifecycletracker.servicetest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import com.training.licenselifecycletracker.dto.DeviceDTO;
import com.training.licenselifecycletracker.dto.ReplaceDTO;
import com.training.licenselifecycletracker.dto.SoftwareDTO;
import com.training.licenselifecycletracker.entities.Device;
import com.training.licenselifecycletracker.entities.LifecycleEvent;
import com.training.licenselifecycletracker.entities.RequestLog;
import com.training.licenselifecycletracker.entities.Software;
import com.training.licenselifecycletracker.entities.User;
import com.training.licenselifecycletracker.exceptions.DeviceNotFoundException;
import com.training.licenselifecycletracker.exceptions.UserNotFoundException;
import com.training.licenselifecycletracker.repositories.DeviceRepository;
import com.training.licenselifecycletracker.repositories.LifecycleEventRepository;
import com.training.licenselifecycletracker.repositories.RequestLogRepository;
import com.training.licenselifecycletracker.repositories.SoftwareRepository;
import com.training.licenselifecycletracker.repositories.UserRepository;
import com.training.licenselifecycletracker.service.RegularUserServiceImpl;

public class RegularUserServiceImplTest {

    @Mock
    private DeviceRepository deviceRepository;
    
    @Mock
    private SoftwareRepository softwareRepository;
    
    @Mock
    private LifecycleEventRepository lifecycleEventRepository;
    
    @Mock
    private UserRepository userRepository;

    
    @Mock
    private RequestLogRepository requestLogRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private RegularUserServiceImpl regularUserService;

    private List<Device> devices;
    private DeviceDTO deviceDTO;
    private Integer userId = 1;
    
    private List<Software> softwareList;
    private SoftwareDTO softwareDTO;
    private String deviceName = "Device1";
    
    private ReplaceDTO replaceDTO;
    private Device device;
    private LifecycleEvent lifecycleEvent;
    
    private List<User> users;
    
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        devices = new ArrayList<>();
        Device device = new Device();
        devices.add(device);
        deviceDTO = new DeviceDTO();
        
        softwareList = new ArrayList<>();
        Software software = new Software();
        softwareList.add(software);
        softwareDTO = new SoftwareDTO();
        
        softwareDTO = new SoftwareDTO();
        softwareDTO.setSoftwareId(1);
        softwareDTO.setSoftwareName("Test Software");
        softwareDTO.setVersion("1.0");
        
        replaceDTO = new ReplaceDTO();
        replaceDTO.setDeviceId(1);
        replaceDTO.setDeviceName("Test Device");
        replaceDTO.setDeviceType("Type A");

        device = new Device();
        device.setDeviceId(1);
        device.setStatus("Available");

        lifecycleEvent = new LifecycleEvent();
        lifecycleEvent.setDevice(device);
        
        devices = new ArrayList<>();
        Device device1 = new Device();
        device1.setDeviceName("Device1");
        device1.setStatus("Active");
        device1.setDeviceType("TypeA");
        devices.add(device1);

        users = new ArrayList<>();
        User user = new User();
        user.setUserId(1);
        user.setUsername("User1");
        users.add(user);
    
    }

    @Test
    public void testGetDevicesByUserId_UserHasDevices() {
        when(deviceRepository.findByUserUserId(userId)).thenReturn(devices);
        when(modelMapper.map(any(Device.class), eq(DeviceDTO.class))).thenReturn(deviceDTO);

        List<DeviceDTO> result = regularUserService.getDevicesByUserId(userId);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(deviceRepository, times(1)).findByUserUserId(userId);
        verify(modelMapper, times(1)).map(any(Device.class), eq(DeviceDTO.class));
    }

    @Test
    public void testGetDevicesByUserId_UserHasNoDevices() {
        when(deviceRepository.findByUserUserId(userId)).thenReturn(new ArrayList<>());

        List<DeviceDTO> result = regularUserService.getDevicesByUserId(userId);

        assertNotNull(result);
        assertEquals(0, result.size());
        verify(deviceRepository, times(1)).findByUserUserId(userId);
        verify(modelMapper, never()).map(any(Device.class), eq(DeviceDTO.class));
    }
    
    @Test
    public void testGetSoftwareByDeviceName_DeviceNameExists() {
        // Setup mock behavior
        when(softwareRepository.findByDeviceDeviceName(deviceName)).thenReturn(softwareList);
        when(modelMapper.map(any(Software.class), eq(SoftwareDTO.class))).thenReturn(softwareDTO);

        // Execute the service call
        List<SoftwareDTO> result = regularUserService.getSoftwareByDeviceName(deviceName);

        // Verify the results
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(softwareRepository, times(1)).findByDeviceDeviceName(deviceName);
        verify(modelMapper, times(1)).map(any(Software.class), eq(SoftwareDTO.class));
    }


    @Test
    public void testGetSoftwareByDeviceName_DeviceNameDoesNotExist() {
        when(softwareRepository.findByDeviceDeviceName(deviceName)).thenReturn(new ArrayList<>());

        List<SoftwareDTO> result = regularUserService.getSoftwareByDeviceName(deviceName);

        assertNotNull(result);
        assertEquals(0, result.size());
        verify(softwareRepository, times(1)).findByDeviceDeviceName(deviceName);
        verify(modelMapper, never()).map(any(Software.class), eq(SoftwareDTO.class));
    }
    
    @Test
    public void testRequestRenew() {
        // Act
        String result = regularUserService.requestRenew(softwareDTO);

        // Assert
        assertEquals("Renewal Request sent successfully", result);

        // Verify the interaction with the repository
        verify(requestLogRepository, times(1)).save(any(RequestLog.class));
    }
    
   

    @Test
    public void testRequestReplacement_DeviceDoesNotExist() {
        when(deviceRepository.findById(replaceDTO.getDeviceId())).thenReturn(Optional.empty());

        String result = regularUserService.requestReplacement(replaceDTO);

        // Verify the RequestLog is saved
        verify(requestLogRepository, times(1)).save(any(RequestLog.class));

        // Verify that no lifecycle event is updated
        verify(lifecycleEventRepository, never()).save(any(LifecycleEvent.class));

        // Verify that the Device repository's save method is never called
        verify(deviceRepository, never()).save(any(Device.class));

        // Verify the result
        assertEquals("Replacement Request sent successfully", result);
    }
    
    @Test
    public void testSearchDevices_DeviceNameProvided_DevicesFound() throws DeviceNotFoundException {
        String deviceName = "Device1";
        when(deviceRepository.findByDeviceName(deviceName)).thenReturn(devices);

        List<Device> result = regularUserService.searchDevices(deviceName, null, null);

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(deviceName, result.get(0).getDeviceName());
        verify(deviceRepository, times(1)).findByDeviceName(deviceName);
    }

    @Test
    public void testSearchDevices_DeviceNameProvided_NoDevicesFound() {
        String deviceName = "NonExistingDevice";
        when(deviceRepository.findByDeviceName(deviceName)).thenReturn(new ArrayList<>());

        Exception exception = assertThrows(DeviceNotFoundException.class, () -> {
        	regularUserService.searchDevices(deviceName, null, null);
        });

        assertEquals("No devices found with name: " + deviceName, exception.getMessage());
        verify(deviceRepository, times(1)).findByDeviceName(deviceName);
    }

    @Test
    public void testSearchDevices_StatusProvided_DevicesFound() throws DeviceNotFoundException {
        String status = "Active";
        when(deviceRepository.findByStatus(status)).thenReturn(devices);

        List<Device> result = regularUserService.searchDevices(null, status, null);

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(status, result.get(0).getStatus());
        verify(deviceRepository, times(1)).findByStatus(status);
    }

    @Test
    public void testSearchDevices_StatusProvided_NoDevicesFound() {
        String status = "Inactive";
        when(deviceRepository.findByStatus(status)).thenReturn(new ArrayList<>());

        Exception exception = assertThrows(DeviceNotFoundException.class, () -> {
        	regularUserService.searchDevices(null, status, null);
        });

        assertEquals("No devices found with status: " + status, exception.getMessage());
        verify(deviceRepository, times(1)).findByStatus(status);
    }

    @Test
    public void testSearchDevices_DeviceTypeProvided_DevicesFound() throws DeviceNotFoundException {
        String deviceType = "TypeA";
        when(deviceRepository.findByDeviceType(deviceType)).thenReturn(devices);

        List<Device> result = regularUserService.searchDevices(null, null, deviceType);

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(deviceType, result.get(0).getDeviceType());
        verify(deviceRepository, times(1)).findByDeviceType(deviceType);
    }

    @Test
    public void testSearchDevices_DeviceTypeProvided_NoDevicesFound() {
        String deviceType = "TypeB";
        when(deviceRepository.findByDeviceType(deviceType)).thenReturn(new ArrayList<>());

        Exception exception = assertThrows(DeviceNotFoundException.class, () -> {
        	regularUserService.searchDevices(null, null, deviceType);
        });

        assertEquals("No devices found with type: " + deviceType, exception.getMessage());
        verify(deviceRepository, times(1)).findByDeviceType(deviceType);
    }

    @Test
    public void testSearchDevices_AllParametersNull_DevicesFound() throws DeviceNotFoundException {
        when(deviceRepository.findAll()).thenReturn(devices);

        List<Device> result = regularUserService.searchDevices(null, null, null);

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals("Device1", result.get(0).getDeviceName());
        verify(deviceRepository, times(1)).findAll();
    }

    @Test
    public void testSearchDevices_AllParametersNull_NoDevicesFound() {
        when(deviceRepository.findAll()).thenReturn(new ArrayList<>());

        Exception exception = assertThrows(DeviceNotFoundException.class, () -> {
        	regularUserService.searchDevices(null, null, null);
        });

        assertEquals("No devices found", exception.getMessage());
        verify(deviceRepository, times(1)).findAll();
    }
    
    @Test
    public void testGetAllUsers_UsersExist() {
        // Arrange
        when(userRepository.findAll()).thenReturn(users);

        // Act
        List<User> result = regularUserService.getAllUsers();

        // Assert
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("User1", result.get(0).getUsername());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    public void testGetAllUsers_NoUsersExist() {
        // Arrange
        when(userRepository.findAll()).thenReturn(new ArrayList<>());

        // Act
        List<User> result = regularUserService.getAllUsers();

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(userRepository, times(1)).findAll();
    }
    
    @Test
    public void testRequestReplacement_Success() {
        // Arrange
        ReplaceDTO replaceDTO = new ReplaceDTO();
        replaceDTO.setDeviceId(1);
        replaceDTO.setDeviceName("DeviceName");
        replaceDTO.setDeviceType("DeviceType");
        
        RequestLog requestLog = new RequestLog();
        LifecycleEvent lifecycleEvent = new LifecycleEvent();
        Device device = new Device();
        
        when(requestLogRepository.save(any(RequestLog.class))).thenReturn(requestLog);
        when(lifecycleEventRepository.findByDevice_DeviceId(replaceDTO.getDeviceId())).thenReturn(lifecycleEvent);
        when(deviceRepository.findById(replaceDTO.getDeviceId())).thenReturn(Optional.of(device));
        when(lifecycleEventRepository.save(any(LifecycleEvent.class))).thenReturn(lifecycleEvent);
        when(deviceRepository.save(any(Device.class))).thenReturn(device);
        
        // Act
        String result = regularUserService.requestReplacement(replaceDTO);
        
        // Assert
        assertEquals("Replacement Request sent successfully", result);
        verify(requestLogRepository).save(any(RequestLog.class));
        verify(lifecycleEventRepository).findByDevice_DeviceId(replaceDTO.getDeviceId());
        verify(lifecycleEventRepository).save(any(LifecycleEvent.class));
        verify(deviceRepository).findById(replaceDTO.getDeviceId());
        verify(deviceRepository).save(any(Device.class));
    }
    
    @Test
    public void testRequestReplacement_LifecycleEventNotFound() {
        // Arrange
        ReplaceDTO replaceDTO = new ReplaceDTO();
        replaceDTO.setDeviceId(1);
        replaceDTO.setDeviceName("DeviceName");
        replaceDTO.setDeviceType("DeviceType");

        RequestLog requestLog = new RequestLog();
        Device device = new Device();
        
        when(requestLogRepository.save(any(RequestLog.class))).thenReturn(requestLog);
        when(lifecycleEventRepository.findByDevice_DeviceId(replaceDTO.getDeviceId())).thenReturn(null);
        when(deviceRepository.findById(replaceDTO.getDeviceId())).thenReturn(Optional.of(device));
        when(deviceRepository.save(any(Device.class))).thenReturn(device);
        
        // Act
        String result =regularUserService.requestReplacement(replaceDTO);
        
        // Assert
        assertEquals("Replacement Request sent successfully", result);
        verify(requestLogRepository).save(any(RequestLog.class));
        verify(lifecycleEventRepository).findByDevice_DeviceId(replaceDTO.getDeviceId());
        verify(lifecycleEventRepository, never()).save(any(LifecycleEvent.class));
        verify(deviceRepository).findById(replaceDTO.getDeviceId());
        verify(deviceRepository).save(any(Device.class));
    }
    
    @Test
    public void testRequestReplacement_DeviceNotFound() {
        // Arrange
        ReplaceDTO replaceDTO = new ReplaceDTO();
        replaceDTO.setDeviceId(1);
        replaceDTO.setDeviceName("DeviceName");
        replaceDTO.setDeviceType("DeviceType");

        RequestLog requestLog = new RequestLog();
        LifecycleEvent lifecycleEvent = new LifecycleEvent();
        
        when(requestLogRepository.save(any(RequestLog.class))).thenReturn(requestLog);
        when(lifecycleEventRepository.findByDevice_DeviceId(replaceDTO.getDeviceId())).thenReturn(lifecycleEvent);
        when(deviceRepository.findById(replaceDTO.getDeviceId())).thenReturn(Optional.empty());
        
        // Act
        String result = regularUserService.requestReplacement(replaceDTO);
        
        // Assert
        assertEquals("Replacement Request sent successfully", result);
        verify(requestLogRepository).save(any(RequestLog.class));
        verify(lifecycleEventRepository).findByDevice_DeviceId(replaceDTO.getDeviceId());
        verify(lifecycleEventRepository).save(any(LifecycleEvent.class));
        verify(deviceRepository).findById(replaceDTO.getDeviceId());
        verify(deviceRepository, never()).save(any(Device.class));
    }

    @Test
    public void testGetUserById_UserFound() throws UserNotFoundException {
        // Arrange
        Integer userId = 1;
        User user = new User();
        user.setUserId(userId);
        user.setUsername("John Doe");
        
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        
        // Act
        User result = regularUserService.getUserById(userId);
        
        // Assert
        assertNotNull(result);
        assertEquals(userId, result.getUserId());
        verify(userRepository).findById(userId);
    }


    @Test
    public void testGetUserById_UserNotFound() {
        // Arrange
        Integer userId = 1;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());
        
        // Act & Assert
        UserNotFoundException thrown = assertThrows(UserNotFoundException.class, () -> {
            regularUserService.getUserById(userId);
        });
        
        assertEquals("User not found with id: " + userId, thrown.getMessage());
        verify(userRepository).findById(userId);
    }


}
