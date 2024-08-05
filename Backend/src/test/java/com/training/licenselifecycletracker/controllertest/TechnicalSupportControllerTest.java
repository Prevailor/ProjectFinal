package com.training.licenselifecycletracker.controllertest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.training.licenselifecycletracker.controller.TechnicalSupportController;
import com.training.licenselifecycletracker.dto.DeviceDTO;
import com.training.licenselifecycletracker.dto.HardwareUpdateDTO;
import com.training.licenselifecycletracker.dto.SoftwareDTO;
import com.training.licenselifecycletracker.dto.SoftwareUpdateDTO;
import com.training.licenselifecycletracker.entities.RequestLog;
import com.training.licenselifecycletracker.exceptions.DeviceNotFoundException;
import com.training.licenselifecycletracker.exceptions.RequestLogNotFoundException;
import com.training.licenselifecycletracker.repositories.RequestLogRepository;
import com.training.licenselifecycletracker.service.DeviceService;
import com.training.licenselifecycletracker.service.TechnicalService;

public class TechnicalSupportControllerTest {

    @Mock
    private DeviceService deviceService;

    @Mock
    private TechnicalService technicalService;

    @Mock
    private RequestLogRepository requestLogRepository;

    @InjectMocks
    private TechnicalSupportController technicalSupportController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testViewEndOfSupportDates_Success() {
        // Arrange
        SoftwareDTO softwareDTO = new SoftwareDTO();
        softwareDTO.setSoftwareId(1);
        softwareDTO.setSoftwareName("Test Software");

        List<SoftwareDTO> softwareDTOList = Collections.singletonList(softwareDTO);
        when(deviceService.viewEndOfSupportDates()).thenReturn(softwareDTOList);

        // Act
        ResponseEntity<List<SoftwareDTO>> responseEntity = technicalSupportController.viewEndOfSupportDates();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(softwareDTOList, responseEntity.getBody());
    }
    
    @Test
    public void testViewAllRequestLog_Success() {
        // Arrange
        RequestLog requestLog = new RequestLog();
        requestLog.setAssetid(1);
        requestLog.setType("Renew");

        List<RequestLog> requestLogList = Collections.singletonList(requestLog);
        when(technicalService.getAllRequestLogs()).thenReturn(requestLogList);

        // Act
        ResponseEntity<List<RequestLog>> responseEntity = technicalSupportController.viewAllRequestLog();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(requestLogList, responseEntity.getBody());
    }

    @Test
    public void testUpdateDeviceDates_Success() throws DeviceNotFoundException {
        // Arrange
        HardwareUpdateDTO hardwareUpdateDTO = new HardwareUpdateDTO();
        hardwareUpdateDTO.setDeviceId(1);
        DeviceDTO deviceDTO = new DeviceDTO();
        deviceDTO.setDeviceId(1);
        when(technicalService.updateDeviceDates(hardwareUpdateDTO)).thenReturn(deviceDTO);

        // Act
        ResponseEntity<DeviceDTO> responseEntity = technicalSupportController.updateDeviceDates(hardwareUpdateDTO);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(deviceDTO, responseEntity.getBody());
    }


    @Test
    public void testUpdateSoftwareDates_Success() throws DeviceNotFoundException {
        // Arrange
        SoftwareUpdateDTO softwareUpdateDTO = new SoftwareUpdateDTO();
        softwareUpdateDTO.setSoftwareId(1);
        DeviceDTO deviceDTO = new DeviceDTO();
        deviceDTO.setDeviceId(1);
        when(technicalService.updateSoftwareDates(softwareUpdateDTO)).thenReturn(deviceDTO);

        // Act
        ResponseEntity<DeviceDTO> responseEntity = technicalSupportController.updateSoftwareDates(softwareUpdateDTO);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(deviceDTO, responseEntity.getBody());
    }

    @Test
    public void testDeleteRequestLogById_Success() throws RequestLogNotFoundException {
        // Arrange
        Integer id = 1;
        when(technicalService.deleteRequestLogById(id)).thenReturn(true);

        // Act
        ResponseEntity<String> responseEntity = technicalSupportController.deleteRequestLogById(id);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Request log with ID " + id + " deleted successfully", responseEntity.getBody());
    }

    @Test
    public void testDeleteRequestLogById_RequestLogNotFoundException() throws RequestLogNotFoundException {
        // Arrange
        Integer id = 1;
        when(technicalService.deleteRequestLogById(id)).thenReturn(false);

        // Act
        ResponseEntity<String> responseEntity = technicalSupportController.deleteRequestLogById(id);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals("Request log with ID " + id + " not found", responseEntity.getBody());
    }

}
