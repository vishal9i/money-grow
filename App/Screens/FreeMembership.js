import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";

const FreeMembership = () => {
  const navigation = useNavigation();

  return (
    <Screen>
      <View style={styles.container}>
        <View style={[styles.row, styles.spaceBetween]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="ios-arrow-back-sharp" size={24} color="#005a97" />
          </TouchableOpacity>
          <View style={styles.row}>
            <Ionicons name="md-notifications-sharp" size={24} color="#005a97" />
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <FontAwesome
                style={styles.mx12}
                name="user"
                size={24}
                color="#005a97"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card}>
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
              Free
            </Text>
            <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
              Membership
            </Text>
          </LinearGradient>
        </View>
        <View>
          <TouchableOpacity style={styles.box}>
            <Text style={styles.boxText}>Completely Free</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box}>
            <Text style={styles.boxText}>Open Account Under Us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

export default FreeMembership;

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
    justifyContent: "center",
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
    marginTop: 120,
  },
});
// #66725a
//#a8d865
