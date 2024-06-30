import { View, Text, StyleSheet, Button } from "react-native";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


export default function HomeScreen({navigation}) {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Home Screen</Text>
            <FontAwesomeIcon name="train" size={50} style={StyleSheet.trainicon}/>
            <Button title="Go to Profile" onPress={()=>navigation.navigate('Profile')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:"center",
        justifyContent: "center"
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20
    },
    trainicon: {
        textAlign:"center",
        marginBottom: 40
    }
})
