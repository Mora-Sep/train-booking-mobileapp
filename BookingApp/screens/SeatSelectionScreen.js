import { View, Text, StyleSheet } from "react-native";

export default function SeatSelectionScreen() {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Select your seats</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItem:"Center",
        justifyContent: "center",
        backgroundColor: "yellow",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign:"center",
    }
})
