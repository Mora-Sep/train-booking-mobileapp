import { useLayoutEffect } from "react";
import { Text, View } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import ETicket from "../components/ETicket";

const PaymentScreen = ({route, navigation}) => {
    const {totalPrice} = route.params;

    console.log(totalPrice)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Payment",
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontSize: 24,
                fontWeight: "400",
                color: "white",
            },
            headerStyle: {
                height: 110,
                backgroundColor: "#26457C",
                borderBottomColor: "transparent",
                shadowColor: "transparent"
            },
            headerLeft: () => (
                <Ionicons
                    name="chevron-back" size={40}
                    color="white"
                    style={{ marginLeft: 20 }}
                    onPress={() => navigation.goBack()}
                />
            )
        });
    },[]);

    return(
        <View>
            {/* <Text>Payment Screen</Text> */}
            <ETicket />
        </View>
    )
}

export default PaymentScreen;