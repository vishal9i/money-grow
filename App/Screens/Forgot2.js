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

const Forgot2 = ({ route, navigation }) => {
  const [otp, setotp] = useState();
  const { phone } = route.params;
  // console.log(phone, name, password);

  const register = () => {
    fetch(BASE_URL + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        name: name,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        // console.log(data);
        if (data.success == true) {
          await AsyncStorage.setItem("token", data.data._id);
          navigation.navigate("Auth", { screen: "type" });
        } else {
          alert(data.message);
        }
      });
  };

  const verify = () => {
    fetch(BASE_URL + "verify-forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        phone: phone,
      },
      body: JSON.stringify({
        code: otp,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          navigation.navigate("Auth", {
            screen: "forgot3",
            params: { phone: phone },
          });
          //   register();
        } else {
          alert(data.message);
        }
      });
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
            placeholder="Enter OTP"
            autoCapitalize="none"
            autoCorrect={false}
            value={otp}
            style={styles.input}
            placeholderTextColor="gray"
            onChangeText={(text) => setotp(text)}
            keyboardType="numeric"
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.text1}>Already have an account ?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.center}>
          <TouchableOpacity style={styles.button} onPress={() => verify()}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Forgot2;

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
