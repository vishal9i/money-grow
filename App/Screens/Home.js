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
import Screen from "../components/Screen";
import { Searchbar } from "react-native-paper";

const Home = ({ navigation }) => {
  const [refreshing, setrefreshing] = useState(false);
  const [blogdata, setblogdata] = useState();
  const [userType, setuserType] = useState();
  const [userdata, setuserdata] = useState();
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const getblogposts = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "free-blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success == true) {
          setblogdata(data.data);
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
        console.log(data);
        if (data.success) {
          setuserType(data.data.paid);
          setuserdata(data.data);
        } else {
          alert(data.message);
        }
      });
  };

  const handleView = (id, type) => {
    if (type == false) {
      navigation.navigate("App", { screen: "Blog", params: { bid: id } });
    } else {
      if (userType == type) {
        navigation.navigate("App", { screen: "Blog", params: { bid: id } });
      } else {
        // initiatePayment();
        navigation.navigate("Auth", { screen: "PaidMembership" });
      }
    }
  };

  const onRefresh = useCallback(() => {
    setrefreshing(true);
    wait(2000).then(() => {
      getblogposts();
      setrefreshing(false);
    });
  }, []);

  //searchhandler
  const [data, setData] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchresult, setSearchresult] = React.useState();

  const searchHandler = (prop) => {
    setSearchQuery(prop);
    if (searchQuery !== "") {
      const newArticleList = blogdata.filter((bname) => {
        return Object.values(bname)
          .join(" ")
          .toLocaleLowerCase()
          .includes(searchQuery.toLocaleLowerCase());
      });
      setSearchresult(newArticleList);
    } else {
      setSearchresult(data);
    }
  };
  //search handler ends

  useEffect(() => {
    getuserdata();
    getblogposts();
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/bg.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            flexDirection: "row",
            margin: 10,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/icon.png")}
            style={{ width: 50, height: 50, margin: 5 }}
          />
          <Searchbar
            style={{ width: "75%", backgroundColor: "gray" }}
            placeholder="Search"
            onChangeText={(text) => searchHandler(text)}
            value={searchQuery}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <FontAwesome
              style={styles.mx12}
              name="user"
              size={30}
              color="#005a97"
            />
          </TouchableOpacity>
        </View>

        {searchQuery.length < 1 ? (
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Latest Feed</Text>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              style={{ marginBottom: "25%" }}
            >
              {blogdata
                ? blogdata.map((item, index) => (
                    <TouchableOpacity
                      style={[styles.row, styles.my12]}
                      onPress={() => handleView(item._id, item.premium)}
                      key={index}
                    >
                      <Image
                        source={
                          item.premium == true
                            ? require("../assets/premium.jpg")
                            : require("../assets/free.png")
                        }
                        style={styles.img}
                      />
                      <View style={styles.textContainer}>
                        <Text style={styles.boxText}>{item.headline}</Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "80%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#4287f5",
                              fontSize: 12,
                            }}
                          >
                            {item.articleCategory}
                          </Text>
                          <Text
                            style={{
                              color: "#4287f5",
                              fontSize: 12,
                            }}
                          >
                            Publish Date : {item.published_date}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                : null}
            </ScrollView>
          </View>
        ) : (
          searchresult.map((item, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  style={{
                    margin: 10,
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 10,
                  }}
                  onPress={() => handleView(item._id, item.premium)}
                >
                  <Text style={{ color: "black" }}>{item.headline}</Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ImageBackground>
    </View>
  );
};

export default Home;

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
// #66725a
//#a8d865
