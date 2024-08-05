package com.training.licenselifecycletracker.servicetest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
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
import com.training.licenselifecycletracker.dto.HardwareUpdateDTO;
import com.training.licenselifecycletracker.dto.SoftwareUpdateDTO;
import com.training.licenselifecycletracker.entities.Device;
import com.training.licenselifecycletracker.entities.LifecycleEvent;
import com.training.licenselifecycletracker.entities.RequestLog;
import com.training.licenselifecycletracker.entities.Software;
import com.training.licenselifecycletracker.exceptions.DeviceNotFoundException;
import com.training.licenselifecycletracker.exceptions.RequestLogNotFoundException;
import com.training.licenselifecycletracker.repositories.DeviceRepository;
import com.training.licenselifecycletracker.repositories.LifecycleEventRepository;
import com.training.licenselifecycletracker.repositories.RequestLogRepository;
import com.training.licenselifecycletracker.service.DeviceServiceImpl;
import com.training.licenselifecycletracker.service.TechnicalSupportServiceImpl;

@ExtendWith(MockitoExtension.class)
public class TechnicalSupportServiceImplTest {
	
	@InjectMocks
	private DeviceServiceImpl deviceService;

    @InjectMocks
    private TechnicalSupportServiceImpl technicalSupportService;

    @Mock
    private RequestLogRepository requestLogRepository;

    @Mock
    private DeviceRepository deviceRepository;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private LifecycleEventRepository lifecycleEventRepository;

    private RequestLog requestLog;
   

    private Device device;
    private Software software;
    private SoftwareUpdateDTO softwareUpdateDTO;
    private DeviceDTO deviceDTO;


    @BeforeEach
    public void setUp() {
        // Initialize RequestLog object
        requestLog = new RequestLog();
        requestLog.setAssetid(1);
        requestLog.setType("Test Request Log");
        
        
        device = new Device();
        device.setDeviceId(1);

        software = new Software();
        software.setSoftwareId(1);
        List<Software> softwareList = new ArrayList<>();
        softwareList.add(software);
        device.setSoftwareList(softwareList);

        softwareUpdateDTO = new SoftwareUpdateDTO();
        softwareUpdateDTO.setSoftwareId(1);
        softwareUpdateDTO.setExpirationDate(LocalDate.of(2025, 1, 1));
        softwareUpdateDTO.setSupportEndDate(LocalDate.of(2023, 12, 31));

        deviceDTO = new DeviceDTO();
        deviceDTO.setDeviceId(1);
    }

    @Test
    public void testGetAllRequestLogs() {
        List<RequestLog> requestLogs = List.of(requestLog);
        when(requestLogRepository.findAll()).thenReturn(requestLogs);

        List<RequestLog> result = technicalSupportService.getAllRequestLogs();

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals(requestLog.getAssetid(), result.get(0).getAssetid());
        assertEquals(requestLog.getType(), result.get(0).getType());

        verify(requestLogRepository, times(1)).findAll();
    }

    @Test
    public void testDeleteRequestLogById_Success() throws RequestLogNotFoundException {
        when(requestLogRepository.findById(1)).thenReturn(Optional.of(requestLog));

        boolean result = technicalSupportService.deleteRequestLogById(1);

        assertTrue(result);
        verify(requestLogRepository, times(1)).findById(1);
        verify(requestLogRepository, times(1)).deleteById(1);
    }

    @Test
    public void testDeleteRequestLogById_RequestLogNotFound() {
        when(requestLogRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(RequestLogNotFoundException.class, () -> {
            technicalSupportService.deleteRequestLogById(1);
        });

        verify(requestLogRepository, times(1)).findById(1);
        verify(requestLogRepository, never()).deleteById(anyInt());
    }
    
    @Test
    public void testUpdateSoftwareDates_Success() throws DeviceNotFoundException {
        when(deviceRepository.findBySoftwareList_SoftwareId(1)).thenReturn(Optional.of(device));
        when(modelMapper.map(device, DeviceDTO.class)).thenReturn(deviceDTO);

        DeviceDTO result = technicalSupportService.updateSoftwareDates(softwareUpdateDTO);

        assertNotNull(result);
        assertEquals(1, result.getDeviceId());
        assertEquals(LocalDate.of(2025, 1, 1), software.getExpirationDate());
        assertEquals(LocalDate.of(2023, 12, 31), software.getSupportEndDate());
        assertEquals(LocalDate.now(), software.getDateOfLastRenewal());

        verify(deviceRepository, times(1)).findBySoftwareList_SoftwareId(1);
        verify(deviceRepository, times(1)).save(device);
        verify(modelMapper, times(1)).map(device, DeviceDTO.class);
    }

    @Test
    public void testUpdateSoftwareDates_DeviceNotFound() {
        when(deviceRepository.findBySoftwareList_SoftwareId(1)).thenReturn(Optional.empty());

        assertThrows(DeviceNotFoundException.class, () -> {
            technicalSupportService.updateSoftwareDates(softwareUpdateDTO);
        });

        verify(deviceRepository, times(1)).findBySoftwareList_SoftwareId(1);
        verify(deviceRepository, never()).save(any(Device.class));
        verify(modelMapper, never()).map(any(Device.class), eq(DeviceDTO.class));
    }

    @Test
    public void testUpdateSoftwareDates_SoftwareNotFoundInDevice() throws DeviceNotFoundException {
        SoftwareUpdateDTO invalidSoftwareUpdateDTO = new SoftwareUpdateDTO();
        invalidSoftwareUpdateDTO.setSoftwareId(2);

        when(deviceRepository.findBySoftwareList_SoftwareId(2)).thenReturn(Optional.of(device));
        when(modelMapper.map(device, DeviceDTO.class)).thenReturn(deviceDTO);

        DeviceDTO result = technicalSupportService.updateSoftwareDates(invalidSoftwareUpdateDTO);

        assertNotNull(result);
        assertEquals(1, result.getDeviceId());
        assertNull(device.getSoftwareList().get(0).getExpirationDate());
        assertNull(device.getSoftwareList().get(0).getSupportEndDate());
        assertNull(device.getSoftwareList().get(0).getDateOfLastRenewal());

        verify(deviceRepository, times(1)).findBySoftwareList_SoftwareId(2);
        verify(deviceRepository, times(1)).save(device);
        verify(modelMapper, times(1)).map(device, DeviceDTO.class);
    }

    @Test
    public void testUpdateDeviceDates_Success() throws DeviceNotFoundException {
        HardwareUpdateDTO hardwareUpdateDTO = new HardwareUpdateDTO();
        hardwareUpdateDTO.setDeviceId(1);
        hardwareUpdateDTO.setEndOfLife(LocalDate.of(2025, 12, 31));
        hardwareUpdateDTO.setEndOfSupportDate(LocalDate.of(2024, 12, 31));
        
        Device device = new Device();
        device.setDeviceId(1);
        device.setLifecycleEvent(new LifecycleEvent());

        when(deviceRepository.findById(1)).thenReturn(Optional.of(device));
        when(lifecycleEventRepository.findByDevice_DeviceId(1)).thenReturn(new LifecycleEvent());

        DeviceDTO result = technicalSupportService.updateDeviceDates(hardwareUpdateDTO);

        verify(deviceRepository, times(1)).findById(1);
        verify(deviceRepository, times(1)).save(device);
        verify(lifecycleEventRepository, times(1)).findByDevice_DeviceId(1);
        verify(lifecycleEventRepository, times(1)).save(any(LifecycleEvent.class));
    }
    
    @Test
    public void testUpdateDeviceDates_DeviceNotFound() {
        HardwareUpdateDTO hardwareUpdateDTO = new HardwareUpdateDTO();
        hardwareUpdateDTO.setDeviceId(1);

        when(deviceRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(DeviceNotFoundException.class, () -> {
            technicalSupportService.updateDeviceDates(hardwareUpdateDTO);
        });

        verify(deviceRepository, times(1)).findById(1);
        verify(deviceRepository, never()).save(any(Device.class));
        verify(lifecycleEventRepository, never()).findByDevice_DeviceId(anyInt());
        verify(lifecycleEventRepository, never()).save(any(LifecycleEvent.class));
    }

   
    @Test
    public void testUpdateDeviceDates_LifecycleEventExists() throws DeviceNotFoundException {
        HardwareUpdateDTO hardwareUpdateDTO = new HardwareUpdateDTO();
        hardwareUpdateDTO.setDeviceId(1);
        hardwareUpdateDTO.setEndOfLife(LocalDate.of(2025, 12, 31));
        hardwareUpdateDTO.setEndOfSupportDate(LocalDate.of(2024, 12, 31));

        Device device = new Device();
        device.setDeviceId(1);
        device.setLifecycleEvent(new LifecycleEvent());

        when(deviceRepository.findById(1)).thenReturn(Optional.of(device));
        when(lifecycleEventRepository.findByDevice_DeviceId(1)).thenReturn(new LifecycleEvent());

        DeviceDTO result = technicalSupportService.updateDeviceDates(hardwareUpdateDTO);

        verify(deviceRepository, times(1)).findById(1);
        verify(deviceRepository, times(1)).save(device);
        verify(lifecycleEventRepository, times(1)).findByDevice_DeviceId(1);
        verify(lifecycleEventRepository, times(1)).save(any(LifecycleEvent.class));
    }

    
    @Test
    public void testUpdateDeviceDates_NoLifecycleEvent() throws DeviceNotFoundException {
        HardwareUpdateDTO hardwareUpdateDTO = new HardwareUpdateDTO();
        hardwareUpdateDTO.setDeviceId(1);
        hardwareUpdateDTO.setEndOfLife(LocalDate.of(2025, 12, 31));
        hardwareUpdateDTO.setEndOfSupportDate(LocalDate.of(2024, 12, 31));

        Device device = new Device();
        device.setDeviceId(1);

        when(deviceRepository.findById(1)).thenReturn(Optional.of(device));
        when(lifecycleEventRepository.findByDevice_DeviceId(1)).thenReturn(null);

        DeviceDTO result = technicalSupportService.updateDeviceDates(hardwareUpdateDTO);

        verify(deviceRepository, times(1)).findById(1);
        verify(deviceRepository, times(1)).save(device);
        verify(lifecycleEventRepository, times(1)).findByDevice_DeviceId(1);
        verify(lifecycleEventRepository, never()).save(any(LifecycleEvent.class));
    }

 
}

