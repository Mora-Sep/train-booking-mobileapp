import { StyleSheet, Text, View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'

const ETicket = () => {
    return(
        <View style={styles.outerContainer}>
            <AntDesign name="checkcircle" color="green" size={40}/>
            <Text style={styles.congradText}>Congradulations!</Text>
            <Text style={styles.bookingSuccessText}>You have successfully booked tickets.</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    outerContainer: {
        alignItems: "center",
        borderColor: "black",
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderRadius: 5
    },
    congradText: {
        fontSize: 20,
        color: "green",
        marginVertical: 10
    },
    bookingSuccessText: {
        fontSize: 16
    }
})

export default  ETicket;