import { View, TextInput, StyleSheet } from "react-native";

export default function InputFeild({ lable, icon, inputType, keyboardType, value, onChangeText, }) {

    return (
        <View style={styles.textInput}>
            {icon}
            {inputType == 'password' ?
                (
                    <TextInput
                        placeholder={lable}
                        keyboardType={keyboardType}
                        fontSize={18}
                        secureTextEntry={true}
                        value={value}
                        onChangeText={onChangeText}
                    />) : (
                    <TextInput
                        placeholder={lable}
                        keyboardType={keyboardType}
                        fontSize={18}
                        value={value}
                        onChangeText={onChangeText}
                    />)
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
