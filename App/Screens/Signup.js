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

const Signup = ({ navigation }) => {
  const [phone, setphone] = useState();
  const [password, setPassword] = useState();
  const [cpass, setcpass] = useState();
  const [name, setname] = useState();
  const [broker, setbroker] = useState();
  const [amount, setamount] = useState();
  const [email, setemail] = useState();

  const sendOtp = () => {
    if (!phone || !password || !name || !broker || !amount || !email) {
      alert("All Fields are required !");
    } else {
      if (phone.length < 10) {
        alert("Phone No is Not Valid !");
      } else {
        if (password == cpass) {
          fetch(BASE_URL + "sendotp", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              phone: phone,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              // console.log(data);
              if (data.success == true) {
                navigation.navigate("Auth", {
                  screen: "otp",
                  params: {
                    phone: phone,
                    password: password,
                    name: name,
                    broker: broker,
                    amount: amount,
                    email: email,
                  },
                });
              } else {
                alert(data.message);
              }
            });
        } else {
          alert("Password not matched !");
        }
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
              placeholder="Enter Name"
              value={name}
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor="gray"
              onChangeText={(text) => setname(text)}
            />
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
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              style={styles.input}
              placeholderTextColor="gray"
              onChangeText={(text) => setemail(text)}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Broker"
              value={broker}
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor="gray"
              onChangeText={(text) => setbroker(text)}
            />
            <TextInput
              placeholder="Trade Amount"
              value={amount}
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor="gray"
              onChangeText={(text) => setamount(text)}
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
            <TextInput
              placeholder="Confirm Password"
              value={cpass}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor="gray"
              onChangeText={(text) => setcpass(text)}
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
            <TouchableOpacity style={styles.button} onPress={() => sendOtp()}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
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
