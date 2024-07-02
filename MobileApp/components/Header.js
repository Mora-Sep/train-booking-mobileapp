import { useState } from "react";
import { View, Text, Pressable } from "react-native";

export default function Header({onTripTypeChange}) {

    const [tripType, setTripType] = useState('One Way');

    const handleTripTypeChange = (type) => {
        setTripType(type)
        onTripTypeChange(type)
    }

    return (
        <View style={{ height: 50, flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: 5, marginHorizontal: 10, gap: 10 }}>

            <Pressable
                onPress={() => handleTripTypeChange("One Way")}
                style={{
                    flex: 1,
                    paddingTop: 15,
                    borderRadius: 20,
                    backgroundColor: tripType === 'One Way' ? "#26457C" : "#e6e6e6",
                    borderColor: tripType === 'One Way' ? "white" : "transparent",
                    borderWidth: tripType === 'One Way' ? 1 : 0
                }}
            >
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center",
                    marginBottom: 10,
                    color: tripType === 'One Way' ? "white" : "black"
                }}>
                    One Way
                </Text>
            </Pressable>

            <Pressable
                onPress={() => handleTripTypeChange("Round Trip")}
                style={{
                    flex: 1,
                    paddingTop: 15,
                    borderRadius: 20,
                    backgroundColor: tripType === 'Round Trip' ? "#26457C" : "#e6e6e6",
                    borderColor: tripType === 'Round Trip' ? "white" : "transparent",
                    borderWidth: tripType === 'Round Trip' ? 1 : 0
                }}
            >
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center",
                    marginBottom: 10,
                    color: tripType === 'Round Trip' ? "white" : "black"
                }}>
                    Round Trip
                </Text>
            </Pressable>
        </View>
    );
}

