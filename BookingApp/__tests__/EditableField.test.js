import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native'; 
import EditableField from '../components/EditableField';
import { Alert } from 'react-native';  

const defaultProps = {
    label: 'First Name:',
    value: 'John',
    isEditing: false,
    onEdit: jest.fn(),
    onSave: jest.fn(),
};

describe('EditableField Component', () => {
    beforeAll(() => {
        jest.spyOn(Alert, 'alert');
    });

    it('allows editing when edit icon is pressed', () => {
        const { getByTestId } = render(<EditableField {...defaultProps} />);

        fireEvent.press(getByTestId('edit-icon'));

        expect(defaultProps.onEdit).toHaveBeenCalled();
    });

    it('shows input field when editing mode is enabled', () => {
        const { getByTestId } = render(
            <EditableField {...defaultProps} isEditing={true} />
        );

        // Access the input field using the label's testID
        const input = getByTestId('input-First Name:');
        expect(input).toBeTruthy(); 
    });

    it('validates input and prevents saving an empty field', () => {
        const { getByTestId } = render(
            <EditableField {...defaultProps} isEditing={true} />
        );

        fireEvent.changeText(getByTestId('input-First Name:'), '');  
        fireEvent.press(getByTestId('save-button'));

        expect(Alert.alert).toHaveBeenCalledWith('Validation Error', 'This field cannot be empty.');
        expect(defaultProps.onSave).not.toHaveBeenCalled();
    });

    it('saves the value when the input is valid', async () => {
        const { getByTestId } = render(
            <EditableField {...defaultProps} isEditing={true} />
        );

        fireEvent.changeText(getByTestId('input-First Name:'), 'Doe');  
        fireEvent.press(getByTestId('save-button'));

        await waitFor(() => {
            expect(defaultProps.onSave).toHaveBeenCalledWith('Doe');
        });
    });
});
