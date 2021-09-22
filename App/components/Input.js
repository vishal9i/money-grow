import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

const Input = (props) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput {...props} style={styles.input} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    color: "white",
    backgroundColor: "#080935",
  },
});
//#080935
