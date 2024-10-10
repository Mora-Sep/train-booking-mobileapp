import { Image, StyleSheet, TouchableOpacity, Text, useWindowDimensions, ScrollView, View } from "react-native";
import Onboarding from 'react-native-onboarding-swiper';
import {LinearGradient} from 'expo-linear-gradient'; 
import LottieView from "lottie-react-native";

const done = ({ ...props }) => (
    <TouchableOpacity style={[styles.doneButton, props.style]} {...props}>
        <Text style={styles.doneButtonText}>Get Started</Text>
    </TouchableOpacity>
);

export default function OnBoardingScreen({ navigation }) {

    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    const imageWidth = windowWidth * 0.75;
    const imageHeight = windowHeight * 0.58;

    const isPortrait = windowHeight > windowWidth;

    const dynamicStyles = StyleSheet.create({
        image: {
            width: imageWidth,
            height: imageHeight,
            resizeMode: 'contain'
        },
    });

    const content = (
        <Onboarding
            DoneButtonComponent={done}
            onDone={() => navigation.navigate('LandingScreen')}
            pages={[
                {
                    backgroundColor: "transparent", 
                    // image: <Image source={require('../assets/Group.png')} style={dynamicStyles.image} />,
                    image: (
                        <View style={{ alignItems: 'center' }}>
                            <Image source={require('../assets/Group.png')} style={dynamicStyles.image} />
                            
                            <LottieView
                                source={require('../assets/train.json')} 
                                autoPlay
                                loop
                                style={{ width: 300, height: 300, marginTop: -90 }} 
                            />
                        </View>
                    ),
                },
            ]}
        />
    );

    return (
        isPortrait ? (
            <LinearGradient
                colors={['#1E40AF', '#00d4ff']} 
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 0 }}   
                style={styles.gradientBackground}
            >
                <View style={styles.container}>{content}</View>
            </LinearGradient>
        ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient
                    colors={['#1E40AF', '#00d4ff']} 
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}  
                    style={styles.gradientBackground}
                >
                    {content}
                </LinearGradient>
            </ScrollView>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradientBackground: {
        flex: 1, 
    },
    doneButton: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 5,
        margin: 10,
    },
    doneButtonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
});
