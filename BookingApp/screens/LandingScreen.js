import { Text, View, Image, useWindowDimensions, TouchableOpacity, StyleSheet } from 'react-native'

export default function LandingScreen ({navigation}) {

    const windowHeigt = useWindowDimensions().height
    const windowWidth = useWindowDimensions().width;

    const buttonWidth = windowWidth * 0.60;

    const dynamicStyles = StyleSheet.create({
        button: {
            width: buttonWidth,
        },

    });

    return (
        <View>
            <Image source={require('../assets/cover.png')} style={{ resizeMode: 'cover', height: windowHeigt }} />
            
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[styles.loginbutton, dynamicStyles.button]}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={[styles.registerbutton, dynamicStyles.button]}>
                <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    loginbutton: {
        position: 'absolute',
        bottom: 180, // Adjust this value to position the button vertically
        left: '20%',
        backgroundColor: '#0333DE',
        padding: 10,
        borderRadius: 50,
    },
    loginText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22,
    },
    registerbutton:{
        position: 'absolute',
        bottom: 100,
        left: '20%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 50,
    },
    registerText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22,
    },
})

