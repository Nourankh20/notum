import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import CarouselClass from "../components/carousel";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Camera, CameraType } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

export default function Course(props: CourseProps) {
  const [posts, SetPosts] = useState<post[]>();
  const [pressed, SetPress] = useState(false);

  const route = useRoute<RouteProps>();
  const { term } = route.params;
  const { student } = route.params;

  const cameraRef = useRef<Camera>(null);
  // const [type, setType] = useState(CameraType.back);

  const [hasCameraPermission, setHasCameraPermission] = useState<any>();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState<any>();
  const [photo, setPhoto] = useState<any>();

  const navigation = useNavigation();

  useEffect(() => {
    console.log("props.term :>> ", term);
    Promise.all([
      axios.get(`https://smd-server-notum.vercel.app/posts/${term}`),
    ]).then(([{ data: posts }]) => {
      if (posts) SetPosts(posts);
    });
  }, [pressed]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Course-page.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        {/* The logo and course name and code */}
        <View
          style={{
            flexDirection: "row",
          }}
        ></View>

        <View
          style={{
            top: 0,
            left: 0,
            position: "absolute",
            flexDirection: "row",
          }}
        >
          <Image
            resizeMode="contain"
            style={{
              width: 60,
              height: 60,
              margin: 30,
              marginRight: 15,
            }}
            source={require("../assets/cslogo.png")}
          />

          {/* The course code and name */}
          <View>
            <Text style={{ marginTop: 26, fontSize: 30, fontWeight: "bold" }}>
              ICS609
            </Text>

            <Text style={{ fontSize: 15, color: "grey", fontWeight: "bold" }}>
              Advanced Machine Learning
            </Text>
          </View>
        </View>

        <View
          style={{
            alignContent: "center",
            alignSelf: "center",
            position: "absolute",
            top: 0,
            marginTop: 80,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", padding: 5 }}
            onPress={() => {
              console.log("student", student);
              navigation.navigate(
                "Ranking" as never,
                {
                  term: term,
                } as never
              );
            }}
          >
            <Image
              resizeMode="cover"
              style={{
                width: 45,
                height: 45,
                alignSelf: "center",
                bottom: -15,
              }}
              source={require("../assets/crown.png")}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 30,
                alignSelf: "center",
              }}
            >
              View Ranking
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.scrollview}>
          <ScrollView style={{ width: "100%" }}>
            <View style={{ margin: -100 }} />

            {posts?.map((posts, index) => (
              <View style={styles.Loginbox} key={index}>
                <View style={{ flexDirection: "row" }} key={index}>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: "center",
                      margin: 10,
                    }}
                    source={require("../assets/cslogo.png")}
                  />

                  <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
                    {posts.username}, at {posts.timing}
                  </Text>
                </View>
                <CarouselClass images={[posts.image]} />

                <View
                  style={{
                    justifyContent: "space-between",
                    alignSelf: "center",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: "50%",
                      alignItems: "center",
                    }}
                    onPress={async () => {
                      if (pressed == false) {
                        console.log("posts._id", posts._id.toString());
                        await axios
                          .post(
                            `https://smd-server-notum.vercel.app/posts/likes/${posts._id.toString()}`
                          )
                          .then((res) => {
                            console.log("res", res.data);
                            SetPress(true);
                          })
                          .catch((error) => {
                            console.log("Api error");
                            alert(error.message);
                          });
                      }
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{
                        width: 25,
                        height: 25,
                        marginBottom: 10,
                      }}
                      source={require("../assets/raise-hand.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: "50%",
                      alignItems: "center",
                    }}
                  >
                    <Text>{posts.no_likes}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View style={{ margin: 180 }}>
              <Text> {} </Text>
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity
          style={{ left: "33%", bottom: "-7%" }}
          onPress={() => {
            console.log("student", student);
            navigation.navigate(
              "CreatePost" as never,
              {
                term: term,
                student: {
                  username: student.username,
                  userid: student.userid,
                },
              } as never
            );
          }}
        >
          <Image
            resizeMode="contain"
            style={{
              width: 45,
              height: 45,
              marginBottom: 10,
            }}
            source={require("../assets/plus.png")}
          />
        </TouchableOpacity>
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  Loginbox: {
    borderBottomColor: "black",
    borderBottomWidth: 5,
    borderWidth: 1,
    borderRadius: 19,
    backgroundColor: "white",
    bottom: -250,
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
    // padding:30
  },

  input: {
    borderBottomColor: "black",
    borderBottomWidth: 5,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 7,
    height: 45,
    paddingLeft: 15,
    marginTop: 15,
    justifyContent: "center",
  },

  button: {
    borderBottomColor: "black",
    // borderBottomWidth: 5,
    // borderWidth: 1,
    // padding: 15,
    // borderRadius: 20,
    backgroundColor: "white",
    height: 100,
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute",
    alignSelf: "center",
    width: "100%",
    marginTop: -25,
  },
  text: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  text2: {
    alignSelf: "center",
    fontSize: 20,
    // fontWeight:'bold',
    color: "white",
  },
  menu: {
    position: "absolute",
    width: 43,
    height: 18,
    // left: 32,
    // top: 67,
  },
  scrollview: {
    borderBottomColor: "black",
    borderBottomWidth: 5,
    borderWidth: 1,
    borderRadius: 19,
    backgroundColor: "white",
    bottom: -70,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 50,
    height: "65%",
    // marginBottom: 20,
    // padding:30
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  //   button:{},
});

type post = {
  userid: number;
  username: string;
  no_likes: number;
  no_downloads: number;
  timing: string;
  courseid: string;
  image: string;
  _id: string;
};

type RouteParams = {
  term: string;
  student: student;
};

type RouteProps = {
  params: RouteParams;
  name: string;
  key: string;
};

type CourseProps = {
  term: string;
  student: student;
};

type student = {
  username: string;
  userid: number;
};
