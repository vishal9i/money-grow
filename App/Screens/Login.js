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
  ScrollView,
} from "react-native";
import { BASE_URL } from "../../Config.json";

const Login = ({ navigation }) => {
  const [phone, setphone] = useState();
  const [password, setPassword] = useState();

  const login = () => {
    if (!phone || !password) {
      alert("Please fill all the fields.");
    } else {
      if (phone.length < 10) {
        alert("Phone number is not valid.");
      } else {
        fetch(BASE_URL + "login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: phone,
            password: password,
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            console.log(data);
            if (data.success == true) {
              await AsyncStorage.setItem("token", data.userId);
              navigation.replace("App", { screen: "Home" });
            } else {
              alert(data.message);
            }
          });
      }
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("./../assets/bg.png")}
      >
        <ScrollView
          style={{ margin: "5%" }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.center}>
            <Image
              source={require("../assets/M_Logo.png")}
              style={styles.logo}
            />
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
            <TextInput
              placeholder="Password"
              value={password}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor="gray"
              onChangeText={(text) => setPassword(text)}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Auth", { screen: "forgot1" })
                }
              >
                <Text style={styles.text1}>Forgot Password ?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                <Text style={styles.text1}>Don't have an account</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.center}>
            <TouchableOpacity style={styles.button} onPress={() => login()}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Login;

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
