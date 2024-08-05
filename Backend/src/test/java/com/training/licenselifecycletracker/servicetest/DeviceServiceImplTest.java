package com.training.licenselifecycletracker.servicetest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import com.training.licenselifecycletracker.dto.DeviceDTO;
import com.training.licenselifecycletracker.dto.LifecycleEventDTO;
import com.training.licenselifecycletracker.dto.SoftwareDTO;
import com.training.licenselifecycletracker.entities.Device;
import com.training.licenselifecycletracker.entities.ERole;
import com.training.licenselifecycletracker.entities.LifecycleEvent;
import com.training.licenselifecycletracker.entities.Role;
import com.training.licenselifecycletracker.entities.Software;
import com.training.licenselifecycletracker.entities.User;
import com.training.licenselifecycletracker.exceptions.DeviceNotFoundException;
import com.training.licenselifecycletracker.exceptions.UserNotFoundException;
import com.training.licenselifecycletracker.repositories.DeviceRepository;
import com.training.licenselifecycletracker.repositories.LifecycleEventRepository;
import com.training.licenselifecycletracker.repositories.SoftwareRepository;
import com.training.licenselifecycletracker.repositories.UserRepository;
import com.training.licenselifecycletracker.service.DeviceServiceImpl;

@ExtendWith(MockitoExtension.class)
public class DeviceServiceImplTest {

    @InjectMocks
    DeviceServiceImpl deviceService;

    @Mock
    DeviceRepository deviceRepository;

    @Mock
    SoftwareRepository softwareRepository;

    @Mock
    LifecycleEventRepository lifecycleEventRepository;

    @Mock
    UserRepository userRepository;

    @Mock
    ModelMapper modelMapper;

    Device device;
    DeviceDTO deviceDTO;
    Software software;
    SoftwareDTO softwareDTO;
    LifecycleEvent lifecycleEvent;
    LifecycleEventDTO lifecycleEventDTO;
    User user;
    ERole role;
    Role role1;

    private Device device1;
    private Device device2;
    private DeviceDTO deviceDTO1;
    private DeviceDTO deviceDTO2;
    private Device deviceWithSoftware;
    private Device deviceWithoutSoftware;
    private Software softwareWithEndDate;
    private Software softwareWithoutEndDate;
    private SoftwareDTO softwareDTOWithEndDate;

    @BeforeEach
    public void setUp() {
 
        lifecycleEvent = new LifecycleEvent();
        lifecycleEventDTO = new LifecycleEventDTO();
        user = new User();
        role = ERole.ROLE_ADMIN; // Example role
        
        device = new Device();
        device.setDeviceId(1);

        deviceDTO = new DeviceDTO();
        deviceDTO.setDeviceId(1);
        
        device1 = new Device();
        device1.setDeviceId(1);
        device2 = new Device();
        device2.setDeviceId(2);

        deviceDTO1 = new DeviceDTO();
        deviceDTO1.setDeviceId(1);
        deviceDTO2 = new DeviceDTO();
        deviceDTO2.setDeviceId(2);
        
        
        software = new Software();
        software.setSoftwareId(1);

        softwareDTO = new SoftwareDTO();
        softwareDTO.setSoftwareId(1);
        
        device = new Device();
        device.setDeviceId(1);
        device.setSoftwareList(new ArrayList<>());  // Initialize the software list

        software = new Software();
        software.setSoftwareId(1);

        softwareDTO = new SoftwareDTO();
        softwareDTO.setSoftwareId(1);

        deviceDTO = new DeviceDTO();
        deviceDTO.setDeviceId(1);
        
        // Initialize Software with end dates
        softwareWithEndDate = new Software();
        softwareWithEndDate.setSoftwareId(1);
        softwareWithEndDate.setSupportEndDate(LocalDate.of(2023, 12, 31));

        // Initialize Software without end dates
        softwareWithoutEndDate = new Software();
        softwareWithoutEndDate.setSoftwareId(2);
        softwareWithoutEndDate.setSupportEndDate(null);

        // Initialize SoftwareDTO
        softwareDTOWithEndDate = new SoftwareDTO();
        softwareDTOWithEndDate.setSoftwareId(1);
        softwareDTOWithEndDate.setSupportEndDate(LocalDate.of(2023, 12, 31));

        // Initialize Devices
        deviceWithSoftware = new Device();
        deviceWithSoftware.setDeviceId(1);
        deviceWithSoftware.setSoftwareList(Arrays.asList(softwareWithEndDate, softwareWithoutEndDate));

        deviceWithoutSoftware = new Device();
        deviceWithoutSoftware.setDeviceId(2);
        deviceWithoutSoftware.setSoftwareList(new ArrayList<>());
    }

    @Test
    public void testAddDevice() {
        when(modelMapper.map(deviceDTO, Device.class)).thenReturn(device);
        when(deviceRepository.save(device)).thenReturn(device);
        when(modelMapper.map(device, DeviceDTO.class)).thenReturn(deviceDTO);

        DeviceDTO result = deviceService.addDevice(deviceDTO);

        assertNotNull(result);
        verify(deviceRepository, times(1)).save(device);
    }

    @Test
    public void testUpdateDevice() throws DeviceNotFoundException {
        when(deviceRepository.findById(deviceDTO.getDeviceId())).thenReturn(Optional.of(device));
        doNothing().when(modelMapper).map(deviceDTO, device);

        DeviceDTO result = deviceService.updateDevice(deviceDTO);

       // assertNotNull(result);
        verify(deviceRepository, times(1)).save(device);
    }

    
    @Test
    public void testUpdateDeviceSuccess() throws DeviceNotFoundException {
        when(deviceRepository.findById(deviceDTO.getDeviceId())).thenReturn(Optional.of(device));
        doNothing().when(modelMapper).map(deviceDTO, device);
        when(deviceRepository.save(device)).thenReturn(device);
        when(modelMapper.map(device, DeviceDTO.class)).thenReturn(deviceDTO);

        DeviceDTO result = deviceService.updateDevice(deviceDTO);

        assertNotNull(result);
        verify(deviceRepository, times(1)).findById(deviceDTO.getDeviceId());
        verify(modelMapper, times(1)).map(deviceDTO, device);
        verify(deviceRepository, times(1)).save(device);
        verify(modelMapper, times(1)).map(device, DeviceDTO.class);
    }

    @Test
    public void testUpdateDeviceNotFound() {
        when(deviceRepository.findById(deviceDTO.getDeviceId())).thenReturn(Optional.empty());

        assertThrows(DeviceNotFoundException.class, () -> deviceService.updateDevice(deviceDTO));
        verify(deviceRepository, times(1)).findById(deviceDTO.getDeviceId());
        verify(modelMapper, times(0)).map(any(DeviceDTO.class), any(Device.class));
        verify(deviceRepository, times(0)).save(any(Device.class));
    }

    @Test
    public void testUpdateDeviceWithLifecycleEvent() throws DeviceNotFoundException {
        LifecycleEvent lifecycleEvent = new LifecycleEvent();
        device.setLifecycleEvent(lifecycleEvent);

        when(deviceRepository.findById(deviceDTO.getDeviceId())).thenReturn(Optional.of(device));
        doNothing().when(modelMapper).map(deviceDTO, device);
        when(deviceRepository.save(device)).thenReturn(device);
        when(modelMapper.map(device, DeviceDTO.class)).thenReturn(deviceDTO);

        DeviceDTO result = deviceService.updateDevice(deviceDTO);

        assertNotNull(result);
        assertEquals(device, lifecycleEvent.getDevice());
        verify(deviceRepository, times(1)).findById(deviceDTO.getDeviceId());
        verify(modelMapper, times(1)).map(deviceDTO, device);
        verify(deviceRepository, times(1)).save(device);
        verify(modelMapper, times(1)).map(device, DeviceDTO.class);
    }
    
    @Test
    public void testGetDeviceByIdSuccess() throws DeviceNotFoundException {
        when(deviceRepository.findById(device.getDeviceId())).thenReturn(Optional.of(device));
        when(modelMapper.map(device, DeviceDTO.class)).thenReturn(deviceDTO);

        DeviceDTO result = deviceService.getDeviceById(device.getDeviceId());

        assertNotNull(result);
        assertEquals(deviceDTO, result);
        verify(deviceRepository, times(1)).findById(device.getDeviceId());
        verify(modelMapper, times(1)).map(device, DeviceDTO.class);
    }

    @Test
    public void testGetDeviceByIdNotFound() {
        when(deviceRepository.findById(device.getDeviceId())).thenReturn(Optional.empty());

        assertThrows(DeviceNotFoundException.class, () -> deviceService.getDeviceById(device.getDeviceId()));
        verify(deviceRepository, times(1)).findById(device.getDeviceId());
        verify(modelMapper, times(0)).map(any(Device.class), any(DeviceDTO.class));
    }
    

    @Test
    public void testGetAllDevicesSuccess() {
        when(deviceRepository.findAll()).thenReturn(Arrays.asList(device1, device2));
        when(modelMapper.map(device1, DeviceDTO.class)).thenReturn(deviceDTO1);
        when(modelMapper.map(device2, DeviceDTO.class)).thenReturn(deviceDTO2);

        List<DeviceDTO> result = deviceService.getAllDevices();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertTrue(result.contains(deviceDTO1));
        assertTrue(result.contains(deviceDTO2));
        verify(deviceRepository, times(1)).findAll();
        verify(modelMapper, times(1)).map(device1, DeviceDTO.class);
        verify(modelMapper, times(1)).map(device2, DeviceDTO.class);
    }

    @Test
    public void testGetAllDevicesEmpty() {
        when(deviceRepository.findAll()).thenReturn(Collections.emptyList());

        List<DeviceDTO> result = deviceService.getAllDevices();

        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(deviceRepository, times(1)).findAll();
        verify(modelMapper, times(0)).map(any(Device.class), any(DeviceDTO.class));
    }

    @Test
    public void testDeleteDeviceSuccess() throws DeviceNotFoundException {
        when(deviceRepository.findById(device.getDeviceId())).thenReturn(Optional.of(device));

        deviceService.deleteDevice(device.getDeviceId());

        verify(deviceRepository, times(1)).findById(device.getDeviceId());
        verify(deviceRepository, times(1)).deleteById(device.getDeviceId());
    }

    @Test
    public void testDeleteDeviceNotFound() {
        when(deviceRepository.findById(device.getDeviceId())).thenReturn(Optional.empty());

        assertThrows(DeviceNotFoundException.class, () -> deviceService.deleteDevice(device.getDeviceId()));
        
        verify(deviceRepository, times(1)).findById(device.getDeviceId());
        verify(deviceRepository, times(0)).deleteById(anyInt());
    }
    

    @Test
    public void testAddSoftwareToDeviceSuccess() throws DeviceNotFoundException {
        when(deviceRepository.findById(device.getDeviceId())).thenReturn(Optional.of(device));
        when(modelMapper.map(softwareDTO, Software.class)).thenReturn(software);
        when(softwareRepository.save(software)).thenReturn(software);
        when(modelMapper.map(device, DeviceDTO.class)).thenReturn(deviceDTO);

        DeviceDTO result = deviceService.addSoftwareToDevice(device.getDeviceId(), softwareDTO);

        assertNotNull(result);
        assertEquals(deviceDTO.getDeviceId(), result.getDeviceId());
        verify(deviceRepository, times(1)).findById(device.getDeviceId());
        verify(softwareRepository, times(1)).save(software);
        verify(deviceRepository, times(1)).save(device);
        verify(modelMapper, times(1)).map(softwareDTO, Software.class);
        verify(modelMapper, times(1)).map(device, DeviceDTO.class);
    }

    @Test
    public void testAddSoftwareToDeviceNotFound() {
        when(deviceRepository.findById(device.getDeviceId())).thenReturn(Optional.empty());

        assertThrows(DeviceNotFoundException.class, () -> deviceService.addSoftwareToDevice(device.getDeviceId(), softwareDTO));

        verify(deviceRepository, times(1)).findById(device.getDeviceId());
        verify(softwareRepository, times(0)).save(any(Software.class));
        verify(deviceRepository, times(0)).save(any(Device.class));
        verify(modelMapper, times(0)).map(any(SoftwareDTO.class), any(Software.class));
        verify(modelMapper, times(0)).map(any(Device.class), any(DeviceDTO.class));
    }

    @Test
    public void testAddLifecycleEventToDeviceSuccess() throws DeviceNotFoundException {
        when(deviceRepository.findById(device.getDeviceId())).thenReturn(Optional.of(device));
        when(modelMapper.map(lifecycleEventDTO, LifecycleEvent.class)).thenReturn(lifecycleEvent);
        when(lifecycleEventRepository.save(lifecycleEvent)).thenReturn(lifecycleEvent);
        when(modelMapper.map(device, DeviceDTO.class)).thenReturn(deviceDTO);

        DeviceDTO result = deviceService.addLifecycleEventToDevice(device.getDeviceId(), lifecycleEventDTO);

        assertNotNull(result);
        assertEquals(deviceDTO.getDeviceId(), result.getDeviceId());
        verify(deviceRepository, times(1)).findById(device.getDeviceId());
        verify(lifecycleEventRepository, times(1)).save(lifecycleEvent);
        verify(deviceRepository, times(1)).save(device);
        verify(modelMapper, times(1)).map(lifecycleEventDTO, LifecycleEvent.class);
        verify(modelMapper, times(1)).map(device, DeviceDTO.class);
    }

    @Test
    public void testAddLifecycleEventToDeviceNotFound() {
        when(deviceRepository.findById(device.getDeviceId())).thenReturn(Optional.empty());

        assertThrows(DeviceNotFoundException.class, () -> deviceService.addLifecycleEventToDevice(device.getDeviceId(), lifecycleEventDTO));

        verify(deviceRepository, times(1)).findById(device.getDeviceId());
        verify(lifecycleEventRepository, times(0)).save(any(LifecycleEvent.class));
        verify(deviceRepository, times(0)).save(any(Device.class));
        verify(modelMapper, times(0)).map(any(LifecycleEventDTO.class), any(LifecycleEvent.class));
        verify(modelMapper, times(0)).map(any(Device.class), any(DeviceDTO.class));
    }

    @Test
    public void testAddLifecycleEventToDeviceLifecycleEventMapping() throws DeviceNotFoundException {
        when(deviceRepository.findById(device.getDeviceId())).thenReturn(Optional.of(device));
        when(modelMapper.map(lifecycleEventDTO, LifecycleEvent.class)).thenReturn(lifecycleEvent);
        when(lifecycleEventRepository.save(lifecycleEvent)).thenReturn(lifecycleEvent);
        when(modelMapper.map(device, DeviceDTO.class)).thenReturn(deviceDTO);

        deviceService.addLifecycleEventToDevice(device.getDeviceId(), lifecycleEventDTO);

        assertNotNull(lifecycleEvent.getDevice());
        assertEquals(device, lifecycleEvent.getDevice());
        verify(deviceRepository, times(1)).findById(device.getDeviceId());
        verify(lifecycleEventRepository, times(1)).save(lifecycleEvent);
        verify(deviceRepository, times(1)).save(device);
        verify(modelMapper, times(1)).map(lifecycleEventDTO, LifecycleEvent.class);
        verify(modelMapper, times(1)).map(device, DeviceDTO.class);
    }
    
    @Test
    public void testViewEndOfSupportDatesSuccess() {
        when(deviceRepository.findAll()).thenReturn(Arrays.asList(deviceWithSoftware));

        when(modelMapper.map(softwareWithEndDate, SoftwareDTO.class)).thenReturn(softwareDTOWithEndDate);

        List<SoftwareDTO> result = deviceService.viewEndOfSupportDates();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(softwareDTOWithEndDate.getSoftwareId(), result.get(0).getSoftwareId());
        assertEquals(softwareDTOWithEndDate.getSupportEndDate(), result.get(0).getSupportEndDate());

        verify(deviceRepository, times(1)).findAll();
        verify(modelMapper, times(1)).map(softwareWithEndDate, SoftwareDTO.class);
    }

    @Test
    public void testViewEndOfSupportDatesNoSoftware() {
        when(deviceRepository.findAll()).thenReturn(Arrays.asList(deviceWithoutSoftware));

        List<SoftwareDTO> result = deviceService.viewEndOfSupportDates();

        assertNotNull(result);
        assertTrue(result.isEmpty());

        verify(deviceRepository, times(1)).findAll();
        verify(modelMapper, times(0)).map(any(Software.class), any(Class.class));
    }

    @Test
    public void testViewEndOfSupportDatesEmptyList() {
        when(deviceRepository.findAll()).thenReturn(new ArrayList<>());

        List<SoftwareDTO> result = deviceService.viewEndOfSupportDates();

        assertNotNull(result);
        assertTrue(result.isEmpty());

        verify(deviceRepository, times(1)).findAll();
        verify(modelMapper, times(0)).map(any(Software.class), any(Class.class));
    }

    @Test
    public void testViewEndOfSupportDatesMultipleDevices() {
        // Initialize more devices and software
        Software anotherSoftwareWithEndDate = new Software();
        anotherSoftwareWithEndDate.setSoftwareId(3);
        anotherSoftwareWithEndDate.setSupportEndDate(LocalDate.of(2024, 1, 1));

        SoftwareDTO anotherSoftwareDTOWithEndDate = new SoftwareDTO();
        anotherSoftwareDTOWithEndDate.setSoftwareId(3);
        anotherSoftwareDTOWithEndDate.setSupportEndDate(LocalDate.of(2024, 1, 1));

        Device anotherDevice = new Device();
        anotherDevice.setDeviceId(3);
        anotherDevice.setSoftwareList(Arrays.asList(anotherSoftwareWithEndDate));

        when(deviceRepository.findAll()).thenReturn(Arrays.asList(deviceWithSoftware, anotherDevice));

        when(modelMapper.map(softwareWithEndDate, SoftwareDTO.class)).thenReturn(softwareDTOWithEndDate);
        when(modelMapper.map(anotherSoftwareWithEndDate, SoftwareDTO.class)).thenReturn(anotherSoftwareDTOWithEndDate);

        List<SoftwareDTO> result = deviceService.viewEndOfSupportDates();

        assertNotNull(result);
        assertEquals(2, result.size());

        // Verify sorting order
        assertTrue(result.get(0).getSupportEndDate().isBefore(result.get(1).getSupportEndDate()));

        verify(deviceRepository, times(1)).findAll();
        verify(modelMapper, times(2)).map(any(Software.class), any(Class.class));
       
    }
    
    @Test
    public void testGetAllLifecycleEventsSuccess() {
        // Prepare test data
        List<LifecycleEvent> lifecycleEvents = Collections.singletonList(lifecycleEvent);
        when(lifecycleEventRepository.findAll()).thenReturn(lifecycleEvents);
        when(modelMapper.map(lifecycleEvent, LifecycleEventDTO.class)).thenReturn(lifecycleEventDTO);

        // Call the method
        List<LifecycleEventDTO> result = deviceService.getAllLifecycleEvents();

        // Validate the result
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(lifecycleEventDTO.getEventId(), result.get(0).getEventId());
        assertEquals(lifecycleEventDTO.getEventType(), result.get(0).getEventType());

        // Verify interactions
        verify(lifecycleEventRepository, times(1)).findAll();
        verify(modelMapper, times(1)).map(lifecycleEvent, LifecycleEventDTO.class);
    }

    @Test
    public void testGetAllLifecycleEventsEmptyList() {
        // Prepare test data
        when(lifecycleEventRepository.findAll()).thenReturn(Collections.emptyList());

        // Call the method
        List<LifecycleEventDTO> result = deviceService.getAllLifecycleEvents();

        // Validate the result
        assertNotNull(result);
        assertTrue(result.isEmpty());

        // Verify interactions
        verify(lifecycleEventRepository, times(1)).findAll();
        verify(modelMapper, times(0)).map(any(LifecycleEvent.class), any(Class.class));
    }

    @Test
    public void testGetAllLifecycleEventsMultipleEntries() {
        // Prepare test data
        LifecycleEvent anotherLifecycleEvent = new LifecycleEvent();
        anotherLifecycleEvent.setEventId(2);
        anotherLifecycleEvent.setEventType("Event2");
        
        LifecycleEventDTO anotherLifecycleEventDTO = new LifecycleEventDTO();
        anotherLifecycleEventDTO.setEventId(2);
        anotherLifecycleEventDTO.setEventType("Event2");

        List<LifecycleEvent> lifecycleEvents = Arrays.asList(lifecycleEvent, anotherLifecycleEvent);
        when(lifecycleEventRepository.findAll()).thenReturn(lifecycleEvents);
        when(modelMapper.map(lifecycleEvent, LifecycleEventDTO.class)).thenReturn(lifecycleEventDTO);
        when(modelMapper.map(anotherLifecycleEvent, LifecycleEventDTO.class)).thenReturn(anotherLifecycleEventDTO);

        // Call the method
        List<LifecycleEventDTO> result = deviceService.getAllLifecycleEvents();

        // Validate the result
        assertNotNull(result);
        assertEquals(2, result.size());
       
    }
    
    @Test
    public void testUpdateRoleSuccess() throws UserNotFoundException {
        // Prepare test data
        when(userRepository.findById(user.getUserId())).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);

        // Call the method
        String result = deviceService.updateRole(user.getUserId(), role1);

        // Validate the result
        assertEquals("Role Updated Successfully!!!", result);
        assertEquals(role1, user.getRole());  // Validate that the role was updated correctly

        // Verify interactions
        verify(userRepository, times(1)).findById(user.getUserId());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testUpdateRoleUserNotFound() {
        // Prepare test data
        when(userRepository.findById(user.getUserId())).thenReturn(Optional.empty());

        // Call the method and validate exception
        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
            deviceService.updateRole(user.getUserId(), role1);
        });
        assertEquals("User with id " + user.getUserId() + " not found", exception.getMessage());

        // Verify interactions
        verify(userRepository, times(1)).findById(user.getUserId());
        verify(userRepository, times(0)).save(any(User.class));  // No save operation should be called
    }
}



    
