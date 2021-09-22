import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../Config.json";

const Type = ({ navigation }) => {
  const [userdata, setuserdata] = useState();
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
  const initiatePayment = () => {
    console.log("initiated");
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
    <View style={styles.container}>
      <View style={[styles.row, styles.spaceBetween]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back-sharp" size={24} color="#005a97" />
        </TouchableOpacity>
      </View>
      <View style={styles.heading}>
        <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
          Please Choose Membership To Continue
        </Text>
      </View>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Auth", { screen: "PaidMembership" })
          }
        >
          <LinearGradient
            // Background Linear Gradient
            colors={["#fa963a", "#7e532c"]}
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
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace("App", { screen: "Home" })}
        >
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
              Free
            </Text>
            <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
              Membership
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Type;

const styles = StyleSheet.create({
  container: {
    marginTop: 36,
    marginHorizontal: 10,
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
    backgroundColor: "#080935",
    height: "80%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
  },
  boxTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "400",
    paddingVertical: 24,
  },
  linearBackground: {
    padding: 16,
    paddingHorizontal: 20,
    paddingVertical: 60,
    borderRadius: 24,
    marginHorizontal: 12,
  },
  card: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    marginTop: "30%",
  },
  boxText: {
    color: "#fff",
  },
  textContainer: {
    width: "90%",
    marginLeft: 12,
  },
  my12: {
    marginVertical: 12,
  },
  heading: {
    alignItems: "center",
    marginVertical: 30,
  },
});
