// import { Image, StyleSheet, TouchableOpacity, Text, useWindowDimensions, ScrollView, View } from "react-native";
// import Onboarding from 'react-native-onboarding-swiper';

// const done = ({ ...props }) => (
//     <TouchableOpacity style={[styles.doneButton, props.style]} {...props}>
//         <Text style={styles.doneButtonText}>Get Started</Text>
//     </TouchableOpacity>
// );

// export default function OnBoardingScreen({ navigation }) {

//     const windowWidth = useWindowDimensions().width;
//     const windowHeight = useWindowDimensions().height;

//     const imageWidth = windowWidth * 0.75;
//     const imageHeight = windowHeight * 0.58;

//     const isPortrait = windowHeight > windowWidth;

//     const dynamicStyles = StyleSheet.create({
//         image: {
//             width: imageWidth,
//             height: imageHeight,
//         },
//     });

//     const content = (
//         <Onboarding
//             DoneButtonComponent={done}
//             onDone={() => navigation.navigate('Login')}
//             pages={[
//                 {
//                     backgroundColor: "#60a0d1",
//                     image: <Image source={require('../assets/onboardingscreen.png')} style={dynamicStyles.image} />,
//                     title: 'Book your Train with express.com',
//                     subtitle: 'Your journey, Our priority',
//                     titleStyles: { color: 'black', fontWeight: "bold", fontSize: 35 },
//                     subTitleStyles: { color: 'black', fontSize: 20, marginBottom: 60 },
//                 },
//             ]}
//         />
//     );

//     return (
//         isPortrait ? <View style={styles.container}>{content}</View> : <ScrollView showsVerticalScrollIndicator={false}>{content}</ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     doneButton: {
//         backgroundColor: 'yellow',
//         padding: 8,
//         borderRadius: 5,
//         margin: 10,
//     },
//     doneButtonText: {
//         color: 'black',
//         fontWeight: 'bold',
//         textAlign: 'center',
//         fontSize: 18,
//     },
// });


import { Image, StyleSheet, TouchableOpacity, Text, useWindowDimensions, ScrollView, View } from "react-native";
import Onboarding from 'react-native-onboarding-swiper';

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
                    backgroundColor: "#26457C",
                    image: <Image source={require('../assets/Group.png')} style={dynamicStyles.image} />,
                    // title: 'Book your Train with On Train',
                    // subtitle: 'Your journey, Our priority',
                    // titleStyles: { color: 'black', fontWeight: "bold", fontSize: 35 },
                    // subTitleStyles: { color: 'black', fontSize: 20, marginBottom: 60 },
                },
            ]}
        />
    );

    return (
        isPortrait ? <View style={styles.container}>{content}</View> : <ScrollView showsVerticalScrollIndicator={false}>{content}</ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
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
