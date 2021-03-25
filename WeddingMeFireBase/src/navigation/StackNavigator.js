// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, LoginScreen, RegistrationScreen } from "../screens";
import AccountScreen from "../screens/AccountScreen/AccountScreen";
import MenuScreen from "../screens/MenuScreen/MenuScreen";
import BudgetScreen from "../screens/BudgetScreen/BudgetScreen";

const Stack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
  };

function MainStackNavigator() {
    return (
    <Stack.Navigator >
        <Stack.Screen name="Accueil" component={HomeScreen} />
        <Stack.Screen name="Compte" component={AccountScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    );
  }

  function LoginStackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Connexion" component={LoginScreen} />
        <Stack.Screen name="Inscription" component={RegistrationScreen} />     
      </Stack.Navigator>
    );
    }

    function TabNavigator() {
      return (
        <Tab.Navigator>
          <Tab.Screen name = "MainStack" component={MainStackNavigator}/>
          <Tab.Screen name = "Compte" component={AccountScreen}/>
        </Tab.Navigator>
      );
    }

    function GeneralNavigator() {
      return (
        <MainStack.Navigator>
          <Stack.Screen name="Auth" component={LoginStackNavigator}/>
          <Stack.Screen name ="Main" component={TabNavigator}/>
        </MainStack.Navigator>
      );
    }

    //CA FONCTIOOOOOOOOOOOOOONNE en mode export default
    function Home() {
      return (
        <Tab.Navigator>
          <Tab.Screen name = "Menu" component={MenuScreen}/>
          <Tab.Screen name = "Compte" component={AccountScreen}/>
        </Tab.Navigator>
      );
    }

    export default function HomeImbriquee(){
      return (
        <Stack.Navigator>
          <Stack.Screen name="Budget" component={BudgetScreen}/>
          <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
      )
    }