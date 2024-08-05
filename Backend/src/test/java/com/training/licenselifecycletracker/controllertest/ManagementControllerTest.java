package com.training.licenselifecycletracker.controllertest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import com.training.licenselifecycletracker.controller.ManagementController;
import com.training.licenselifecycletracker.dto.LifecycleEventDTO;
import com.training.licenselifecycletracker.service.DeviceService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;

public class ManagementControllerTest {

    @Mock
    private DeviceService deviceService;

    @InjectMocks
    private ManagementController managementController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllLifecycleEvents_Success() {
        // Arrange
        LifecycleEventDTO lifecycleEventDTO = new LifecycleEventDTO();
        lifecycleEventDTO.setEventId(1);
        lifecycleEventDTO.setDescription("Test Event");

        List<LifecycleEventDTO> lifecycleEvents = Collections.singletonList(lifecycleEventDTO);
        when(deviceService.getAllLifecycleEvents()).thenReturn(lifecycleEvents);

        // Act
        ResponseEntity<List<LifecycleEventDTO>> responseEntity = managementController.getAllLifecycleEvents();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(lifecycleEvents, responseEntity.getBody());
    }
    
    @Test
    public void testGetAllLifecycleEvents_EmptyList() {
        // Arrange
        when(deviceService.getAllLifecycleEvents()).thenReturn(Collections.emptyList());

        // Act
        ResponseEntity<List<LifecycleEventDTO>> responseEntity = managementController.getAllLifecycleEvents();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(Collections.emptyList(), responseEntity.getBody());
    }

  
}
