import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";


export default function Login() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [userid, setuserid] = useState("");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Welcome-page.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Image
          resizeMode="cover"
          style={{ width: 200, height: 200, position: "absolute", top: "22%" }}
          source={require("../assets/Logo.png")}
        />
        <View style={styles.Loginbox}>

          <View style={styles.input}>
            <TextInput
              placeholder="Username.."
              onChangeText={(userid: string) => {
                setuserid(userid);
              }}
              value={userid}
            ></TextInput>
          </View>

          <View style={styles.input}>
            <TextInput
              placeholder="Password.."
              onChangeText={(password: string) => {
                setPassword(password);
              }}
              value={password}
              textContentType="password"
            ></TextInput>
          </View>

          <View style={styles.button}>

            <TouchableOpacity
              onPress={async () => {
                const user = {
                  userid: Number(userid),
                  password: password,
                };
    

                const response = await axios.post(
                  "https://smd-server-notum.vercel.app/user/login",
                  user
                );
                if (response.data) {
                  // console.log('first', response.data)
                  // SyncStorage.set('faculty', response.data.faculty);
                  navigation.navigate("HomeScreen" as never, {
                    term: response.data.faculty,
                  } as never);
                }
                else{
                  alert('Wrong inputs')
                }
              }}
            >
              <Text style={styles.text}>Sign in</Text>
            </TouchableOpacity>

          </View>


          <Text style={styles.text2}>Don't have an account?</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register" as never)}
          >
            <Text
              style={{
                alignSelf: "center",
                color: "white",
                textDecorationLine: "underline",
                fontStyle: "italic",
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "center",
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
    borderBottomWidth: 5,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 7,
    height: 40,
    marginTop: 40,
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
});


type CourseProps = {
  term: string;
}
