import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/AuthContext';
import EditableField from '../components/EditableField';
import { color } from '../styles/Color';
import axios from 'axios';
import { BASE_URL } from '../config';

// Define the mapping between frontend and backend field names
const FIELD_MAPPING = {
    firstName: 'firstName',
    lastName: 'lastName',
    contactNumber: 'contactNumber',
    email: 'email',
    nic: 'nic',
    address: 'address',
    gender: 'gender',
    birthday: 'birthday',
    username: 'username',
};

// Define the mapping between backend field names and display field names in 'details'
const BACKEND_DISPLAY_MAPPING = {
    firstName: 'FirstName',
    lastName: 'LastName',
    contactNumber: 'Contact_Number',
    email: 'Email',
    nic: 'NIC',
    address: 'Address',
    gender: 'Gender',
    birthday: 'Birth_Date',
    username: 'Username',
};

export default function ProfileScreen({ navigation }) {
    const { logout, details, setDetails, userToken } = useContext(AuthContext);
    const [editingField, setEditingField] = useState(null);

    const handleSave = async (field, newValue) => {
        // Map the frontend field name to the backend field name
        const backendField = FIELD_MAPPING[field];
        const displayField = BACKEND_DISPLAY_MAPPING[field];

        if (!backendField || !displayField) {
            console.error(`No mapping found for field: ${field}`);
            Alert.alert("Error", "An unexpected error occurred. Please try again.");
            return;
        }

        // Create an updatedDetails object with only the field being updated
        const updatedDetails = {
            [backendField]: newValue,
        };

        // Add any other fields that are not being updated but are required for the request
        const otherFields = {
            firstName: details.FirstName,
            lastName: details.LastName,
            username: details.Username,
            nic: details.NIC,
            gender: details.Gender,
            address: details.Address,
            contactNumber: details.Contact_Number,
            birthday: formatDate(details.Birth_Date),
            email: details.Email,
        };

        // If the birthday is being updated, format it appropriately
        if (backendField === 'birthday') {
            updatedDetails[backendField] = formatDate(newValue);
        }

        // Merge the updatedDetails with other fields
        const requestBody = { ...otherFields, ...updatedDetails };

        try {
            // Perform the API request to update user details
            const response = await axios.put(`${BASE_URL}/users/update`, requestBody, {
                headers: { 'Authorization': `Bearer ${userToken}` }
            });
            console.log("Update successful:", response.data);
            console.log(details);

            // Update local state with the new field value using display field names
            setDetails(prevState => ({
                ...prevState,
                [displayField]: newValue,
            }));

            Alert.alert("Success", "Your profile has been updated successfully.");
        } catch (error) {
            if (error.response) {
                console.error("Error response data:", error.response.data);
                console.error("Status code:", error.response.status);
                Alert.alert("Update Failed", error.response.data.message || "An error occurred while updating your profile.");
            } else if (error.request) {
                console.error("Error request:", error.request);
                Alert.alert("Update Failed", "No response from the server. Please try again later.");
            } else {
                console.error("Error message:", error.message);
                Alert.alert("Update Failed", "An unexpected error occurred. Please try again.");
            }
        } finally {
            // Reset the editing state
            setEditingField(null);
        }
    };

    // Helper function to format date for MySQL
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>Profile</Text>

            <View style={styles.userImageContainer}>
                <Image source={require('../assets/user.png')} style={styles.image} />
                <TouchableOpacity style={styles.iconContainer}>
                    <MaterialCommunityIcons name="camera" size={40} color="grey" />
                </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: "600" }}>
                    {details && details.Username ? details.Username : "Loading..."}
                </Text>
            </View>

            <EditableField
                label="First Name:"
                value={details && details.FirstName ? details.FirstName : "Loading..."}
                isEditing={editingField === 'firstName'}
                onEdit={() => setEditingField('firstName')}
                onSave={(newValue) => handleSave('firstName', newValue)}
            />

            <EditableField
                label="Last Name:"
                value={details && details.LastName ? details.LastName : "Loading..."}
                isEditing={editingField === 'lastName'}
                onEdit={() => setEditingField('lastName')}
                onSave={(newValue) => handleSave('lastName', newValue)}
            />

            <EditableField
                label="Contact Number:"
                value={details && details.Contact_Number ? details.Contact_Number : "Loading..."}
                isEditing={editingField === 'contactNumber'}
                onEdit={() => setEditingField('contactNumber')}
                onSave={(newValue) => handleSave('contactNumber', newValue)}
            />

            <EditableField
                label="Email:"
                value={details && details.Email ? details.Email : "Loading..."}
                isEditing={editingField === 'email'}
                onEdit={() => setEditingField('email')}
                onSave={(newValue) => handleSave('email', newValue)}
            />

            <EditableField
                label="NIC:"
                value={details && details.NIC ? details.NIC : "Loading..."}
                isEditing={editingField === 'nic'}
                onEdit={() => setEditingField('nic')}
                onSave={(newValue) => handleSave('nic', newValue)}
            />

            <TouchableOpacity onPress={() => navigation.navigate('Conditions')} style={{ paddingVertical: 25, paddingBottom: 50 }}>
                <Text style={{ fontSize: 24 }}>Terms and Conditions</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { logout() }} style={{ paddingVertical: 13, ...color.theamBlue, paddingHorizontal: 30, borderRadius: 15, borderWidth: 2, borderColor: "black", marginBottom: 40 }}>
                <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 15,
        backgroundColor: "#dadef5",
        paddingBottom: 50, 
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    userImageContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },
    image: {
        width: 170,
        height: 170,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "white",
        backgroundColor: "white",
    },
    iconContainer: {
        position: "absolute",
        bottom: 15,
        right: -9,
    },
    details: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderColor: "black",
        borderBottomWidth: 0.5,
        backgroundColor: "#e8e8e8",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginBottom: 8
    },
    userName: {
        fontSize: 24,
        fontWeight: "600",
    },
});
