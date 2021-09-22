import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import { BASE_URL } from "../../Config.json";

const Forgot1 = ({ navigation }) => {
  const [phone, setphone] = useState();
  //   const [password, setPassword] = useState();

  const login = () => {
    if (phone < 9) {
      alert("Phone no is not valid.");
    } else {
      fetch(BASE_URL + "sendotp-forgot", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          phone: phone,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success == true) {
            navigation.replace("Auth", {
              screen: "forgot2",
              params: { phone: phone },
            });
          } else {
            alert(data.message);
          }
        });
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("./../assets/bg.png")}
      >
        <View style={styles.center}>
          <Image source={require("../assets/M_Logo.png")} style={styles.logo} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Phone Number"
            autoCapitalize="none"
            autoCorrect={false}
            value={phone}
            style={styles.input}
            placeholderTextColor="gray"
            onChangeText={(text) => setphone(text)}
            keyboardType="numeric"
          />
          {/* <TextInput
            placeholder="Password"
            value={password}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            placeholderTextColor="gray"
            onChangeText={(text) => setPassword(text)}
          /> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* <TouchableOpacity>
              <Text style={styles.text1}>Forgot Password ?</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => navigation.navigate("signup")}>
              <Text style={styles.text1}>Don't have an account</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.center}>
          <TouchableOpacity style={styles.button} onPress={() => login()}>
            <Text style={styles.buttonText}>SEND OTP</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Forgot1;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#005a97",
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  logo: {
    width: 240,
    height: 240,
    resizeMode: "contain",
  },
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
  background: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  text1: {
    color: "#079beb",
    marginVertical: 10,
  },
});
