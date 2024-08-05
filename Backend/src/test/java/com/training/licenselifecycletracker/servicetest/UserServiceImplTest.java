package com.training.licenselifecycletracker.servicetest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.never;
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
import com.training.licenselifecycletracker.entities.User;
import com.training.licenselifecycletracker.exceptions.UserNotFoundException;
import com.training.licenselifecycletracker.repositories.UserRepository;
import com.training.licenselifecycletracker.service.UserServiceImpl;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;

    private Optional<User> user1;
    private User user;
    private Role role;
    private ERole roleName;

    @BeforeEach
    public void setUp() {
        // Initialize User and Role
        user = new User();
        user.setUserId(1);
        user.setUsername("testuser");
        role = new Role();
        role.setRoleId(1);
        roleName = ERole.ROLE_USER;  // Assuming ROLE_USER is a valid value in ERole
    }

    @Test
    public void testAddUser() {
        when(userRepository.save(user)).thenReturn(user);

        User result = userService.addUser(user);

        assertNotNull(result);
        assertEquals(user.getUsername(), result.getUsername());

        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testGetUserByIdSuccess() throws UserNotFoundException {
        when(userRepository.findById(user.getUserId())).thenReturn(Optional.of(user));

        User result = userService.getUserById(user.getUserId());

        assertNotNull(result);
        assertEquals(user.getUserId(), result.getUserId());

        verify(userRepository, times(1)).findById(user.getUserId());
    }

    @Test
    public void testGetUserByIdNotFound() {
        when(userRepository.findById(user.getUserId())).thenReturn(Optional.empty());

        UserNotFoundException thrown = assertThrows(UserNotFoundException.class, () -> {
            userService.getUserById(user.getUserId());
        });

        assertEquals("User with userId " + user.getUserId() + " not found", thrown.getMessage());

        verify(userRepository, times(1)).findById(user.getUserId());
    }

    @Test
    public void testDeleteUserByIdSuccess() throws UserNotFoundException {
        when(userRepository.findById(user.getUserId())).thenReturn(Optional.of(user));

        String result = userService.deleteUserById(user.getUserId());

        assertEquals("User with userId " + user.getUserId() + " deleted successfully", result);

        verify(userRepository, times(1)).findById(user.getUserId());
        verify(userRepository, times(1)).deleteById(user.getUserId());
    }

    @Test
    public void testDeleteUserByIdNotFound() {
        when(userRepository.findById(user.getUserId())).thenReturn(Optional.empty());

        UserNotFoundException thrown = assertThrows(UserNotFoundException.class, () -> {
            userService.deleteUserById(user.getUserId());
        });

        assertEquals("User with userId " + user.getUserId() + " not found", thrown.getMessage());

        verify(userRepository, times(1)).findById(user.getUserId());
        verify(userRepository, never()).deleteById(user.getUserId());
    }

    @Test
    public void testUpdateUserSuccess() throws UserNotFoundException {
        when(userRepository.findById(user.getUserId())).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);

        User result = userService.updateUser(user);

        assertNotNull(result);
        assertEquals(user.getUserId(), result.getUserId());

        verify(userRepository, times(1)).findById(user.getUserId());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testUpdateUserNotFound() {
        when(userRepository.findById(user.getUserId())).thenReturn(Optional.empty());

        UserNotFoundException thrown = assertThrows(UserNotFoundException.class, () -> {
            userService.updateUser(user);
        });

        assertEquals("User with userId " + user.getUserId() + " not found", thrown.getMessage());

        verify(userRepository, times(1)).findById(user.getUserId());
        verify(userRepository, never()).save(user);
    }

    @Test
    public void testExistsByUsername() {
        when(userRepository.existsByUsername(user.getUsername())).thenReturn(true);

        Boolean result = userService.existsByUsername(user.getUsername());

        assertTrue(result);

        verify(userRepository, times(1)).existsByUsername(user.getUsername());
    }

    @Test
    public void testUpdateRoleSuccess() throws UserNotFoundException {
        when(userRepository.findById(user.getUserId())).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);

        String result = userService.updateRole(user.getUserId(), role);

        assertEquals("Role Updated Successfully!!!", result);

        verify(userRepository, times(1)).findById(user.getUserId());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testUpdateRoleNotFound() {
        when(userRepository.findById(user.getUserId())).thenReturn(Optional.empty());

        UserNotFoundException thrown = assertThrows(UserNotFoundException.class, () -> {
            userService.updateRole(user.getUserId(), role);
        });

        assertEquals("User with " + user.getUserId() + " not found", thrown.getMessage());

        verify(userRepository, times(1)).findById(user.getUserId());
        verify(userRepository, never()).save(user);
    }

    @Test
    public void testAddUserEntity() {
        when(userRepository.save(user)).thenReturn(user);

        User result = userService.addUserEntity(user);

        assertNotNull(result);
        assertEquals(user.getUsername(), result.getUsername());

        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testFindByUsernameSuccess() {
        when(userRepository.findByUsername(user.getUsername())).thenReturn(user);

        Optional<User> result = userService.findByUsername(user.getUsername());

        assertTrue(result.isPresent());
        assertEquals(user.getUsername(), result.get().getUsername());

        verify(userRepository, times(1)).findByUsername(user.getUsername());
    }

 
    @Test
    public void testFindByRole_RoleFound() {
        ERole role = ERole.ROLE_ADMIN;
        User user = new User();

        when(userRepository.findByRole(role)).thenReturn(Optional.of(user));

        Optional<User> result = userService.findByRole(role);

        assertTrue(result.isPresent());

        verify(userRepository, times(1)).findByRole(role);
    }

    @Test
    public void testFindByRole_RoleNotFound() {
        ERole role = ERole.ROLE_ADMIN;

        when(userRepository.findByRole(role)).thenReturn(Optional.empty());

        Optional<User> result = userService.findByRole(role);

        assertFalse(result.isPresent());

        verify(userRepository, times(1)).findByRole(role);
    }
}
