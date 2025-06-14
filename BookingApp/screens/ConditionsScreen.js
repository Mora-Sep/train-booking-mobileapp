import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ConditionsScreen({ navigation }) {
    return (
        <SafeAreaView>
            <ScrollView style={styles.outerContainer}>
                <Text style={{ fontSize: 15, fontWeight: "600", marginBottom: 20 }}>PRIOR TO MAKING A RESERVATION THROUGH THE SYSTEM, YOU ARE STRONGLY ADVISED TO CAREFULLY
                    REVIEW AND ADHERE TO THE FOLLOWING GUIDLINES.
                </Text>

                <Text>
                    - Tickets are only valid for the specific train and journey booked. Travel on any other train requires a separate ticket.
                    {'\n'}
                    {'\n'}- Passengers must purchase an ordinary travel ticket if they need to transit to another station to catch their reserved train.
                    {'\n'}
                    {'\n'}- Tickets issued through the Train Booking System must be presented upon request by railway staff.
                    {'\n'}
                    {'\n'}- Payments can be made using valid VISA or MasterCard credit/debit cards.
                    {'\n'}
                    {'\n'}- The user must ensure that the payment card details provided are accurate and legally owned by them.
                    {'\n'}
                    {'\n'}- Users acknowledge the potential risks of online payment, including unauthorized access or fraud. Our system and payment service providers will not be liable for such incidents.
                    {'\n'}
                    {'\n'}- Our Company reserves the right to amend these terms and conditions at any time. Passengers are encouraged to review the latest version regularly.
                </Text>

                <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: "#dadef5", padding: 10, alignItems: "center", borderColor: "black", borderWidth: 1, marginTop: 40 }}>
                    <Text style={{ fontSize: 18 }}>Go Back</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    }
})