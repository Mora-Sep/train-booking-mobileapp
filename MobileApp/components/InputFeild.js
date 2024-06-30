import { View, TextInput, StyleSheet } from "react-native";

export default function InputFeild({ lable, icon, inputType, keyboardType }) {
    return (
        <View style={styles.textInput}>
            {icon}
            {inputType == 'password' ?
                (<TextInput placeholder={lable} keyboardType={keyboardType} fontSize={18} secureTextEntry={true} />)
                : (<TextInput placeholder={lable} keyboardType={keyboardType} fontSize={18} />)
            }
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        flexDirection: "row",
        borderColor: "black",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        padding: 8,
        marginBottom: 25
    }
})
