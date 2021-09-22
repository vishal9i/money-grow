import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Screen from "../components/Screen";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../Config.json";
import * as ImagePicker from "expo-image-picker";

const Profile = ({ navigation }) => {
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
        console.log(data);
        if (data.success) {
          setuserdata(data.data);
        } else {
          alert(data.message);
        }
      });
  };

  //Upload Image Starts from here

  const updateimage = async (image) => {
    const token = await AsyncStorage.getItem("token");
    // const cleanurl = image.replace('file://', '');
    // console.log(image, token);
    const imagedata = new FormData();
    imagedata.append("profilePic", {
      type: "image/jpg",
      uri: image,
      name: "profile.jpg",
    });

    fetch(BASE_URL + "upload-image", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        userid: token,
      },
      body: imagedata,
    })
      .then((res) => res.json())
      .then((data) => {
        data.success == true ? null : alert("image not uploaded try again !");
        getuserdata();
      })
      .catch((e) => console.log(e));
  };

  // const getimage = async () => {
  //   const proimage = await AsyncStorage.getItem("image");
  //   setproimage(proimage);
  // };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  // getimage();
  // getbalace();
  // console.log(image);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      updateimage(result.uri);
    }
  };
  //update image ends here
  const handlelogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Auth", { screen: "Login" });
  };
  useEffect(() => {
    getuserdata();
  }, []);
  return (
    <Screen>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back-sharp" size={24} color="#005a97" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => pickImage()}
        >
          <ImageBackground
            source={require("./../assets/avater.jpg")}
            style={styles.avater}
          >
            <Image
              source={userdata ? { uri: userdata.avatar } : null}
              style={{
                height: 100,
                width: 100,
                overflow: "hidden",
                borderRadius: 50,
              }}
            />
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.titleText}>{userdata ? userdata.name : null}</Text>
        <View>
          <View style={styles.box}>
            <Text style={styles.boxText}>
              {userdata ? userdata.phone : null}
            </Text>
          </View>

          {/* <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate("App", { screen: "contactus" })}
          >
            <Text style={styles.boxText}>About Us</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate("App", { screen: "contactus" })}
          >
            <Text style={styles.boxText}>Help and Support</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate("App", { screen: "contactus" })}
          >
            <Text style={styles.boxText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate("App", { screen: "contactus" })}
          >
            <Text style={styles.boxText}>Terms and Conditions</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.box} onPress={() => handlelogout()}>
            <Entypo name="log-out" size={24} color="gray" />
            <Text style={styles.boxText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

export default Profile;

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
    marginVertical: 5,
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
    color: "#a3a2a2",
    fontSize: 16,
    fontWeight: "bold",
  },
  linearBackground: {
    padding: 16,
    paddingHorizontal: 20,
    paddingVertical: 60,
    borderRadius: 24,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    marginTop: "10%",
    borderRadius: 50,
    overflow: "hidden",
  },
  avater: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#b0b6c1",
    overflow: "hidden",
  },
  icon: {
    position: "absolute",
    bottom: -10,
    right: 140,
  },
  titleText: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#070a35",
  },
});
// #66725a
//#a8d865
