import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
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
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-elements";
import CarouselClass from "../components/carousel";
import { useRoute } from "@react-navigation/native";

export default function Ranking(props: CourseProps) {
  const [students, SetStudents] = useState<student[]>();
  const [posts, SetPosts] = useState();
  const route = useRoute<RouteProps>();
  const { term } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    Promise.all([
      axios.get(
        `https://smd-server-notum.vercel.app/posts/rank/${term.toString()}`
      ),
    ]).then(([{ data: res }]) => {
      if (res) {
        let sortedCompany = res.sort(
          (a: { likes: number }, b: { likes: number }) =>
            a.likes > b.likes ? -1 : 1
        );
        SetStudents(res);
      }
      console.log("res :>> ", res);
    });

    console.log("props.term :>> ", term);
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Course-page.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.text}> Ranking for {term} course</Text>
        <ScrollView style={{ marginBottom: 20, padding: 10 }}>
          {students?.map((student: student, index) => (
            <TouchableOpacity key={index}>
              <Card
                key={index}
                containerStyle={{
                  borderRadius: 20,
                  borderColor: "transparent",
                  padding: 35,
                  margin: 20,
                }}
              >
                <Card.Title
                  style={{ fontWeight: "bold", fontSize: 17, margin: 20 }}
                >
                  {student._id}
                </Card.Title>
                <Card.Divider />
                <Text
                  style={{
                    justifyContent: "center",
                    alignSelf: "center",
                    color: "#8B0D32",
                    fontSize: 17,
                  }}
                >
                  {student.likes}
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ImageBackground>
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
    fontSize: 25,
    fontWeight: "bold",
    margin: 10,
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
  //   button:{},
});

type student = {
  _id: string;
  likes: number;
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
};

type Course = {
  name: string;
  code: string;
  faculty: string;
};
