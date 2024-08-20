import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useContext, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import { color } from "../styles/Color";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen({navigation}) {

    const { logout, details } = useContext(AuthContext)

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>Profile</Text>

            <View style={styles.userImageContainer}>
                <Image source={require("../assets/user.png")} style={styles.image} />
                <TouchableOpacity style={styles.iconContainer}>
                    <MaterialCommunityIcons name="camera" size={40} color="grey" />
                </TouchableOpacity>
            </View>


            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: "600" }}>
                    {details && details.Username ? details.Username : "Loading..."}
                </Text>
            </View>

            <View style={{marginBottom: 15}}>
                <Text style={{fontSize: 18}}>First Name:</Text>
                <View style={styles.details}>
                    <Text style={{ fontSize: 18 }}>{details && details.FirstName ? details.FirstName : "Loading..."}</Text>
                    <TouchableOpacity>
                        <Feather name="edit" size={25} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{marginBottom: 15}}>
                <Text style={{fontSize: 18}}>Last Name:</Text>
                <View style={styles.details}>
                    <Text style={{ fontSize: 18 }}>{details && details.LastName ? details.LastName : "Loading..."}</Text>
                    <TouchableOpacity>
                        <Feather name="edit" size={25} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{marginBottom: 15}}>
                <Text style={{fontSize: 18}}>Contact Number: </Text>
                <View style={styles.details}>
                    <Text style={{ fontSize: 18 }}>{details && details.Contact_Number ? details.Contact_Number : "Loading..."}</Text>
                    <TouchableOpacity>
                        <Feather name="edit" size={25} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{marginBottom: 15}}>
                <Text style={{fontSize: 18}}>Email: </Text>
                <View style={styles.details}>
                    <Text style={{ fontSize: 18 }}>{details && details.Email ? details.Email : "Loading..."}</Text>
                    <TouchableOpacity>
                        <Feather name="edit" size={25} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{marginBottom: 15}}>
                <Text style={{fontSize: 18}}>NIC: </Text>
                <View style={styles.details}>
                    <Text style={{ fontSize: 18 }}>{details && details.NIC ? details.NIC : "Loading..."}</Text>
                    <TouchableOpacity>
                        <Feather name="edit" size={25} />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Conditions')}  style={{ paddingVertical: 25, paddingBottom: 50 }}>
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
    input: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginRight: 10,
    },
    userDetailsText: {
        fontSize: 18,
    },
    userNameText: {
        fontSize: 18
    }
});
