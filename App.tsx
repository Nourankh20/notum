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
import Login from "./screens/Login";
import Course from "./screens/Course";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./screens/Register";
import HomeScreen from "./screens/HomeScreen";
import CreatePost from "./screens/CreatePost";
import Ranking from "./screens/Ranking";

const Stack = createNativeStackNavigator();

export default function App() {

  React.useEffect
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name='SignIn' component={Login}  options={{headerShown:false}}/>
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='Course' component={Course}/>
        <Stack.Screen name='HomeScreen' component={HomeScreen}/>
        <Stack.Screen name='CreatePost' component={CreatePost}/>
        <Stack.Screen name='Ranking' component={Ranking}/>

      </Stack.Navigator>
    </NavigationContainer>
    //  <CreatePost/>
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
