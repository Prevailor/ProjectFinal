package com.training.licenselifecycletracker.repositories;



import com.training.licenselifecycletracker.entities.Notification;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends CrudRepository<Notification, Long> {
    // Define custom query methods if needed
}
