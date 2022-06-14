import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

export default function CreatePost() {

  const navigation = useNavigation();
  const cameraRef = useRef<Camera>();
  const [hasCameraPermission, setHasCameraPermission] = useState<any>();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState<any>();
  const [photo, setPhoto] = useState<any>();
  const route = useRoute<RouteProps>();
  const { term } = route.params;
  const { student } = route.params;
  useEffect(() => {
    (async () => {
      // prompt the user for camera permission
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      console.log("cameraPermission.status  :>> ", cameraPermission.status);
      setHasCameraPermission(cameraPermission.status === "granted");

      // prompt the user for access to media library
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return (
      <SafeAreaView>
        <Text>Requesting permission...</Text>
      </SafeAreaView>
    );
  } else if (!hasCameraPermission) {
    return (
      <SafeAreaView>
        <Text>Permission for camera not granted.</Text>
      </SafeAreaView>
    );
  }

  const takePicture = async () => {
    const pictureOptions = {
      quality: 0,
      base64: true,
    };
    const newPhoto = await cameraRef.current.takePictureAsync(pictureOptions);
    setPhoto(newPhoto);
  };

  if (photo) {
    const sharePicture = () =>
      shareAsync(photo.uri).then(() => setPhoto(undefined));
    const postPicture = async () => {
      var today = new Date();
      var time =  today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() ;
      const post = {
        userid:student.userid,
        username:student.username,
        no_like:0,
        no_downloads:0,
        timing: time,
        courseid:term,
        image: "data:image/jpg;base64," + photo.base64
      }

      console.log('student :>> ', student);
      // console.log('post :>> ', post.username);
      const res = await axios.post(
        `https://smd-server-notum.vercel.app/posts/post`,post,{}
      ).then((res)=>{
        console.log('res :>> ', res);
        navigation.navigate("Course" as never, {
           term: term,student:{ 
            username: student.username,
            userid: student.userid
          }
        } as never);
      });
    };
    const savePicture = () =>
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() =>
        setPhoto(undefined)
      );

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={styles.button}>
            <Button
              title="Share"
              onPress={() => {
                sharePicture();
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Post"
              onPress={() => {
                postPicture();
              }}
            />
          </View>
          {hasMediaLibraryPermission && (
            <View style={styles.button}>
              <Button
                title="Save"
                onPress={() => {
                  savePicture();
                }}
              />
            </View>
          )}
          <View style={styles.button}>
            <Button title="Discard" onPress={() => setPhoto(undefined)} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.button}>
        <Button
          title="Take a Picture"
          onPress={() => {
            takePicture();
          }}
        />
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
  },

  Loginbox: {
    borderBottomColor: "black",
    borderBottomWidth: 5,
    borderWidth: 1,
    padding: 15,
    borderRadius: 19,
    backgroundColor: "#8B0D32",
    bottom: "-20%",
    width: "90%",
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
    padding: 15,
    borderRadius: 10,
    // backgroundColor: "white",
    margin: 15,
    // height: 70,
    justifyContent: "center",
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
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});

type student = {
  username: string;
  userid: number;
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
