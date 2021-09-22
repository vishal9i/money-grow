import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  ImageBackground,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../Config.json";

const Blog = ({ route, navigation }) => {
  const [post, setpost] = useState();
  const { bid } = route.params;
  const getblogpost = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "blog", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userid: token,
        blogid: bid,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success == true) {
          setpost(data.data);
        } else {
          alert(data.message);
        }
      });
  };
  useEffect(() => {
    getblogpost();
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/bg.png")}
        style={{ width: "100%", height: "100%", paddingTop: "10%" }}
      >
        <View
          style={{
            flexDirection: "row",
            margin: 10,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="ios-arrow-back-sharp" size={24} color="#005a97" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <FontAwesome
              style={styles.mx12}
              name="user"
              size={30}
              color="#005a97"
            />
          </TouchableOpacity>
        </View>

        {post ? (
          <View style={styles.box}>
            <Text style={styles.boxTitle}>{post.headline}</Text>
            <ScrollView style={{ marginBottom: "30%" }}>
              <View style={{ padding: 10 }}>
                <Text style={{ color: "white" }}>{post.body}</Text>
              </View>
            </ScrollView>
          </View>
        ) : null}
      </ImageBackground>
    </View>
  );
};

export default Blog;

const styles = StyleSheet.create({
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
    backgroundColor: "rgba(8, 9, 53, 0.7)",
    height: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
  },
  boxTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "400",
    paddingVertical: 24,
    alignSelf: "center",
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
    marginTop: 24,
  },
  boxText: {
    color: "#fff",
    width: "90%",
  },
  textContainer: {
    width: "90%",
    marginLeft: 12,
  },
  my12: {
    marginVertical: 12,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
