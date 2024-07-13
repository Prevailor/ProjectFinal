package com.training.licenselifecycletracker.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.training.licenselifecycletracker.entities.Device;
import com.training.licenselifecycletracker.entities.Software;
import com.training.licenselifecycletracker.repositories.DeviceRepository;
import com.training.licenselifecycletracker.repositories.SoftwareRepository;

@Service
public interface NotificationService {

	void sendDeviceExpiryNotifications();

    void sendSoftwareExpiryNotifications();
}

