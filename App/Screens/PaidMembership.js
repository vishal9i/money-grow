import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../Config.json";

const PaidMembership = ({ navigation }) => {
  const [userdata, setuserdata] = useState();
  //   const [category, setcategory] = useState()
  const getuserdata = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "user-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userid: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          setuserdata(data.data);
        } else {
          alert(data.message);
        }
      });
  };
  const initiatePayment = (category) => {
    console.log("initiated", category);
    fetch(BASE_URL + "razor-recharge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        amount: 500,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success == true) {
          navigation.navigate("Auth", {
            screen: "ConfirmPayment",
            params: {
              phone: userdata.phone,
              amount: 500,
              orderid: data.data.id,
              email: userdata.email,
              category: category,
              name: userdata.name,
            },
          });
        } else {
          alert(data.message);
        }
      });
  };
  useEffect(() => {
    getuserdata();
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={[styles.row, styles.spaceBetween]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="ios-arrow-back-sharp" size={24} color="#005a97" />
          </TouchableOpacity>
          {/* <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <FontAwesome
                style={styles.mx12}
                name="user"
                size={24}
                color="#005a97"
              />
            </TouchableOpacity>
          </View> */}
        </View>
        <View style={styles.card}>
          <LinearGradient
            // Background Linear Gradient
            colors={["#66725a", "#a8d865"]}
            style={styles.linearBackground}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 28,
                fontWeight: "600",
              }}
            >
              Paid
            </Text>
            <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
              Membership
            </Text>
          </LinearGradient>
        </View>
        <View>
          <TouchableOpacity
            style={styles.box}
            onPress={() => initiatePayment("Stock Cash")}
          >
            <Text style={styles.boxText}>Stock Cash</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => initiatePayment("Stock F&O")}
          >
            <Text style={styles.boxText}>Stock F&O</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => initiatePayment("Index F&O")}
          >
            <Text style={styles.boxText}>Index F&O</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

export default PaidMembership;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    marginHorizontal: 12,
  },
  row: {
    flexDirection: "row",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  mx12: {
    marginHorizontal: 12,
  },
  box: {
    marginVertical: 12,
    backgroundColor: "#080935",
    padding: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#797d96",
  },
  boxText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linearBackground: {
    padding: 16,
    paddingHorizontal: 20,
    paddingVertical: 60,
    borderRadius: 24,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 24,
  },
});
// #66725a
//#a8d865
