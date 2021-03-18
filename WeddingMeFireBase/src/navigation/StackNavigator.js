// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen, LoginScreen, RegistrationScreen } from "../screens";
import AccountScreen from "../screens/AccountScreen/AccountScreen";
import MenuScreen from "../screens/MenuScreen/MenuScreen";

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
  };

const MainStackNavigator = () => {
    return (
    <Stack.Navigator >
        <Stack.Screen name="Identification" component={LoginStackNavigator}/>
        <Stack.Screen name="Accueil" component={HomeScreen} />
        <Stack.Screen name="Compte" component={AccountScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    );
  }

  const LoginStackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Connexion" component={LoginScreen} />
        <Stack.Screen name="Inscription" component={RegistrationScreen} />
        <Stack.Screen name="Accueil" component={HomeScreen} />
        <Stack.Screen name="Compte" component={AccountScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />       
      </Stack.Navigator>
    );
    }

export { MainStackNavigator, LoginStackNavigator};