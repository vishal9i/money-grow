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
import { Entypo, Ionicons } from "@expo/vector-icons";

const Contactus = ({ navigation }) => {
  const [phone, setphone] = useState();
  const [fname, setfname] = useState();
  const [lname, setlname] = useState();
  const [email, setemail] = useState();
  const [query, setquery] = useState();

  const sendOtp = () => {
    if (!phone || !fname || !lname || !email || !query) {
      alert("All Fields Required !");
    } else {
      fetch(BASE_URL + "query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname: fname,
          lname: lname,
          email: email,
          phone: phone,
          query: query,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.success == true) {
            alert(
              "Query submitted successfully we will connect with you shortly."
            );
            setphone();
            setquery();
            setlname();
            setfname();
            setemail();
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back-sharp" size={24} color="#005a97" />
        </TouchableOpacity>
        <View style={styles.center}>
          <Image source={require("../assets/M_Logo.png")} style={styles.logo} />
          <Text style={{ fontSize: 18 }}>Please Submit Your Query Here.</Text>
        </View>
        <ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="First Name"
              value={fname}
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor="gray"
              onChangeText={(text) => setfname(text)}
            />

            <TextInput
              placeholder="Last Name"
              value={lname}
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor="gray"
              onChangeText={(text) => setlname(text)}
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
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor="gray"
              onChangeText={(text) => setemail(text)}
            />
            <TextInput
              placeholder="Type Query"
              multiline
              value={query}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor="gray"
              onChangeText={(text) => setquery(text)}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.text1}>Already have an account ?</Text>
              </TouchableOpacity> */}
            </View>
          </View>

          <View style={styles.center}>
            <TouchableOpacity style={styles.button} onPress={() => sendOtp()}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Contactus;

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
    height: "110%",
    resizeMode: "cover",
    paddingTop: "10%",
    paddingBottom: "30%",
  },
  text1: {
    color: "#079beb",
    marginVertical: 10,
  },
});
