// ManagerService.js

const API_BASE_URL = 'http://localhost:8080/api/test/';

const loginservice = {
  async viewAllLifecycleEvents() {
    try {
      const response = await fetch(`${API_BASE_URL}/lifecycle/events`);
      if (!response.ok) {
        throw new Error('Failed to fetch lifecycle events');
      }
      return await response.json();
    } catch (error) {
      console.error('Error in viewAllLifecycleEvents:', error);
      throw error;
    }
  },

  async login(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  },

  async checkLoggedIn() {
    // Example implementation to check if user is logged in
    const token = localStorage.getItem('token'); // Assuming token stored in localStorage
    if (!token) {
      return false;
    }
    // Perform additional validation or check with server if necessary
    return true;
  },
};

export default loginservice;
