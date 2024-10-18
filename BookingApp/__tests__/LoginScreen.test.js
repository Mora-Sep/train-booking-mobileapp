import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen'; 
import { AuthContext } from '../context/AuthContext'; 

// Mock navigation prop
const mockNavigate = jest.fn();

const mockNavigation = {
  navigate: mockNavigate,
};

// Mock AuthContext
const mockLogin = jest.fn();

// Common mock AuthContext provider
const MockAuthContextProvider = ({ children }) => (
  <AuthContext.Provider value={{ login: mockLogin }}>
    {children}
  </AuthContext.Provider>
);

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <MockAuthContextProvider>
        <LoginScreen navigation={mockNavigation} />
      </MockAuthContextProvider>
    );

    // Check that key elements are rendered
    expect(getByText('Welcome Back')).toBeTruthy();
    expect(getByPlaceholderText('User-Name')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
    expect(getByText('Forgot Password?')).toBeTruthy();
    expect(getByText("Don't have an account?")).toBeTruthy();
    expect(getByText('Register Now')).toBeTruthy();
  });

  it('should call login when username and password are entered', async () => {
    const { getByPlaceholderText, getByText } = render(
      <MockAuthContextProvider>
        <LoginScreen navigation={mockNavigation} />
      </MockAuthContextProvider>
    );

    const usernameInput = getByPlaceholderText('User-Name');
    const passwordInput = getByPlaceholderText('Password');

    // Simulate entering username and password
    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'password123');

    // Simulate pressing the login button
    fireEvent.press(getByText('Login'));

    // Expect login to have been called with correct credentials
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testuser', 'password123');
    });
  });
});
