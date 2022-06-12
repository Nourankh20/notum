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
import axios from 'axios';

import CarouselClass from "../components/carousel";

export default function Course() {
  const data = [
    {
      StudentName: "Nouran Khaled",
      Timing: "02/06/2022 13:51 pm",
      image:[
        'https://i.pinimg.com/originals/4e/97/6e/4e976e639deade3c575f2187c9f020fc.jpg',
        'https://i.pinimg.com/originals/8d/de/8c/8dde8c9847bd802c01d6dca1e66a5843.jpg',
        'https://i.pinimg.com/236x/e2/54/a2/e254a2b75c6d954d6d8d4bf7e8cc0d99.jpg'
    ]
    },

    {
      StudentName: "Mohamed Mazen",
      Timing: "02/06/2022 13:51 pm",
      image:[
        'https://i.pinimg.com/originals/4e/97/6e/4e976e639deade3c575f2187c9f020fc.jpg',
        // 'https://i.pinimg.com/originals/8d/de/8c/8dde8c9847bd802c01d6dca1e66a5843.jpg',
        'https://i.pinimg.com/236x/e2/54/a2/e254a2b75c6d954d6d8d4bf7e8cc0d99.jpg'
    ]
    },
       {
      StudentName: "Nouran Khaled",
      Timing: "02/06/2022 13:51 pm",
      image:[
        'https://i.pinimg.com/originals/4e/97/6e/4e976e639deade3c575f2187c9f020fc.jpg',
        'https://i.pinimg.com/originals/8d/de/8c/8dde8c9847bd802c01d6dca1e66a5843.jpg',
        'https://i.pinimg.com/236x/e2/54/a2/e254a2b75c6d954d6d8d4bf7e8cc0d99.jpg'
    ]
    },

    {
      StudentName: "Mohamed Mazen",
      Timing: "02/06/2022 13:51 pm",
      image:[
        ''
    ]
    },

  ];

  const [course, SetCourse] = useState();
  const [posts, SetPosts] = useState();


  // useEffect(() => {
  //   Promise.all([
  //     axios.get(`http://192.168.1.12:3000/posts/`),])
  //          .then(([{ data: postsResults }]) => {
  //              if (postsResults) SetPosts(postsResults);
  //           }
  //    );
  // }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Course-page.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        {/* Menu and logo in header
        <View
          style={{
            position: "absolute",
            top: 0,
            // marginTop: 35,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity>
            <Image
              resizeMode="stretch"
              style={{
                width: 45,
                height: 30,
                right: 0,
                position: "absolute",
                // marginTop: 5,
                // marginLeft: 45,
              }}
              source={require("../assets/menu.png")}
            />
          </TouchableOpacity>

          <Image
            resizeMode="cover"
            style={{
              width: 50,
              height: 50,
              left: 0,
              position: "absolute",
            }}
            source={require("../assets/Logo.png")}
          />
        </View> */}

        {/* The logo and course name and code */}
        <View
          style={{
            flexDirection: "row",
            // alignSelf:'center'
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
              marginRight:15,
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
          <TouchableOpacity style={{ flexDirection: "row",padding:5 }}>
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
          <View style={{ margin: -100 }}/>

          {
              data?.map((student,index)=>(
                <View style={styles.Loginbox} key={index}>
                <View style={{ flexDirection: "row" }}>
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
                    {student.StudentName}, at {student.Timing}
                  </Text>
                </View>
                <CarouselClass images={student.image} />
                
                <View style={{justifyContent:'space-between',alignSelf:'center',flexDirection:'row'}}>
                  <TouchableOpacity style={{
                      width: '50%',
                      alignItems:'center'
                    }}>
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
                  <TouchableOpacity  style={{
                      width: '50%',
                      alignItems:'center'
                    }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      marginBottom: 10,
                    }}
                    source={require("../assets/cloud-computing.png")}
                  /></TouchableOpacity>
                </View>
              </View>
              ))
             
            }

            <View style={{ margin: 180 }}>
              <Text> {   } </Text>
            </View>
          {/* </ScrollView> */}
        </ScrollView>
        </View>
        
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
    justifyContent:'center',
    marginBottom:50,
    height:"65%"
    // marginBottom: 20,
    // padding:30
  },
  //   button:{},
});


type student = {
  StudentName: string;
  Timing: string;
  // addressFmt: string;
  image: string[];
};