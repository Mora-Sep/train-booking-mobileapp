import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, useWindowDimensions, Image } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'

import InputFeild from "../components/InputFeild";
import { color } from '../styles/Color';
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {

    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);

    const { login } = useContext(AuthContext);

    const windowWidth = useWindowDimensions().width;

    const buttonWidth = windowWidth * 0.1;

    const dynamicStyles = StyleSheet.create({
        button: {
            marginHorizontal: buttonWidth,
        },

    });

    return (
        <SafeAreaView style={styles.safecontainer}>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.text}>Welcome Back</Text>

                <InputFeild
                    lable={'User-Name'}
                    icon={<Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
                    value={userName}
                    onChangeText={text => setUserName(text)}
                />


                <InputFeild
                    lable={'Password'}
                    icon={<Ionicons name="lock-closed-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
                    inputType="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                />

                <TouchableOpacity onPress={() => { login(userName, password) }}>
                    <Text style={[styles.loginButton, dynamicStyles.button]}>Login</Text>
                </TouchableOpacity>

                <View style={styles.registerSection}>
                    <Text style={styles.registerText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registerButton}> Register Now</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    safecontainer: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
        paddingTop: 25
    },
    scrollContainer: {
        //paddingTop: 40
    },
    text: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 16,
        marginBottom: 30,
        color: "#143066"
    },
    // textInput: {
    //     flexDirection: "row",
    //     borderColor: "black",
    //     borderBottomColor: "black",
    //     borderBottomWidth: 1,
    //     padding: 8,
    //     marginBottom: 25
    // },
    loginButton: {
        padding: 8,
        borderColor: "black",
        borderWidth: 2,
        marginTop: 80,
        marginBottom: 30,
        borderRadius: 10,
        textAlign: "center",
        ...color.theamBlue,
        color: "white",
        fontSize: 24,
        fontWeight: "450"
    },
    registerSection: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 70,
    },
    registerText: {
        fontSize: 18,
        textAlign: "center",
    },
    registerButton: {
        color: "black",
        fontSize: 18,
        color: "#1554d1",
        marginHorizontal: 10
    }
})