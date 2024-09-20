import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LandingScreen from '../screens/LandingScreen' 

// Mock the navigation prop
const mockNavigate = jest.fn();

const setup = () => {
  return render(<LandingScreen navigation={{ navigate: mockNavigate }} />);
};

describe('LandingScreen', () => {
  test('renders correctly', () => {
    const { getByText } = setup();

    // Check if the "Login" button is rendered
    expect(getByText('Login')).toBeTruthy();

    // Check if the "Register" button is rendered
    expect(getByText('Register')).toBeTruthy();
  });

  test('navigates to Login screen when Login button is pressed', () => {
    const { getByText } = setup();

    // Press the Login button
    fireEvent.press(getByText('Login'));

    // Check if the navigate function was called with 'Login'
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  test('navigates to Register screen when Register button is pressed', () => {
    const { getByText } = setup();

    // Press the Register button
    fireEvent.press(getByText('Register'));

    // Check if the navigate function was called with 'Register'
    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });
});
