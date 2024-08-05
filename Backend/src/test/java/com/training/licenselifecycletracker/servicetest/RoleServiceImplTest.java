package com.training.licenselifecycletracker.servicetest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.training.licenselifecycletracker.entities.ERole;
import com.training.licenselifecycletracker.entities.Role;
import com.training.licenselifecycletracker.repositories.RoleRepository;
import com.training.licenselifecycletracker.service.RoleServiceImpl;

@ExtendWith(MockitoExtension.class)
public class RoleServiceImplTest {

    @InjectMocks
    private RoleServiceImpl roleService;

    @Mock
    private RoleRepository roleRepository;

    private Role role;
    private ERole roleName;

    @BeforeEach
    public void setUp() {
        // Initialize Role and ERole
        role = new Role();
        role.setRoleId(1);
        roleName = ERole.ROLE_USER;
       
    }

    @Test
    public void testFindRoleByNameSuccess() {
        // Prepare test data
        when(roleRepository.findByRoleName(roleName)).thenReturn(Optional.of(role));

        // Call the method
        Optional<Role> result = roleService.findRoleByName(roleName);

        // Validate the result
        assertTrue(result.isPresent());
        assertEquals(role.getRoleName(), result.get().getRoleName());

        // Verify interactions
        verify(roleRepository, times(1)).findByRoleName(roleName);
    }

    @Test
    public void testFindRoleByNameNotFound() {
        // Prepare test data
        when(roleRepository.findByRoleName(roleName)).thenReturn(Optional.empty());

        // Call the method
        Optional<Role> result = roleService.findRoleByName(roleName);

        // Validate the result
        assertFalse(result.isPresent());

        // Verify interactions
        verify(roleRepository, times(1)).findByRoleName(roleName);
    }

    @Test
    public void testFindRoleByIdSuccess() {
        // Prepare test data
        when(roleRepository.findById(role.getRoleId())).thenReturn(Optional.of(role));

        // Call the method
        Optional<Role> result = roleService.findRoleById(role.getRoleId());

        // Validate the result
        assertTrue(result.isPresent());
        assertEquals(role.getRoleId(), result.get().getRoleId());

        // Verify interactions
        verify(roleRepository, times(1)).findById(role.getRoleId());
    }

    @Test
    public void testFindRoleByIdNotFound() {
        // Prepare test data
        when(roleRepository.findById(role.getRoleId())).thenReturn(Optional.empty());

        // Call the method
        Optional<Role> result = roleService.findRoleById(role.getRoleId());

        // Validate the result
        assertFalse(result.isPresent());

        // Verify interactions
        verify(roleRepository, times(1)).findById(role.getRoleId());
    }
}
