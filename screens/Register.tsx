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

export default function Register() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Welcome-page.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Image
          resizeMode="cover"
          style={{ width: 200, height: 200, position: "absolute", top: "10%" }}
          source={require("../assets/Logo.png")}
        />
        <View style={styles.Loginbox}>
          <View style={styles.input}>
            <TextInput placeholder="Username.."></TextInput>
          </View>
          <View style={styles.input}>
            <TextInput placeholder="Password.."></TextInput>
          </View>
          <View style={styles.input}>
            <TextInput placeholder="User Id.."></TextInput>
          </View>
          <View style={styles.input}>
            <TextInput placeholder="Faculty.."></TextInput>
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Course" as never)}
            >
              <Text style={styles.text}>
                Sign Up
                </Text>
            </TouchableOpacity>
          </View>
     
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
    height: 45,
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
