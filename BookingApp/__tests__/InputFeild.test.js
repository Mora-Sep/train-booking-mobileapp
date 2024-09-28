import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View } from 'react-native';
import InputFeild from '../components/InputFeild'; 

describe('InputFeild Component', () => {
  const mockOnChangeText = jest.fn();

  const setup = (props = {}) => {
    return render(
      <InputFeild
        lable="Test Label"
        inputType="text"
        keyboardType="default"
        value="Initial Value"
        onChangeText={mockOnChangeText}
        {...props}
      />
    );
  };

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test('renders the TextInput with the correct label', () => {
    const { getByPlaceholderText } = setup();
    
    // Check if the TextInput is rendered with the correct placeholder
    expect(getByPlaceholderText('Test Label')).toBeTruthy();
  });

  test('handles text change', () => {
    const { getByPlaceholderText } = setup();

    // Simulate user typing in the input field
    const input = getByPlaceholderText('Test Label');
    fireEvent.changeText(input, 'Updated Value');

    // Verify the onChangeText handler is called with the updated value
    expect(mockOnChangeText).toHaveBeenCalledWith('Updated Value');
  });

  test('renders the password input correctly when inputType is password', () => {
    const { getByPlaceholderText } = setup({ inputType: 'password' });

    const input = getByPlaceholderText('Test Label');

    // Check if secureTextEntry is true for password input
    expect(input.props.secureTextEntry).toBe(true);
  });

  test('renders an icon if provided', () => {
    const testIcon = <View testID="icon" />;
    const { getByTestId } = setup({ icon: testIcon });

    // Check if the icon is rendered
    expect(getByTestId('icon')).toBeTruthy();
  });
});
