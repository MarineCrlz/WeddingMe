// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, LoginScreen, RegistrationScreen } from "../screens";
import AccountScreen from "../screens/AccountScreen/AccountScreen";
import BudgetScreen from "../screens/BudgetScreen/BudgetScreen";
import Icon from 'react-native-vector-icons/Feather';
import ToDoListScreen from "../screens/TodoListScreen/TodoListScreen";
import ToDoListDetailScreen from "../screens/TodoListDetailScreen/TodoListDetailScreen";

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

    //test switched nav
    function GeneralNavigator() {
      return (
        <MainStack.Navigator>
          <Stack.Screen name="Auth" component={AuthNavigator}/>
          <Stack.Screen name="MainTab" component={MainTabNavigator}/>
        </MainStack.Navigator>
      );
    }
    function AuthNavigator(){
      return(
        <Stack.Navigator>
          <Stack.Screen name="Connexion" component={LoginScreen}/>
          <Stack.Screen name="Inscription" component={RegistrationScreen}/>
        </Stack.Navigator>
      );
    }

    function MainTabNavigator(){
      return(
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: "#fec89a",
            inactiveTintColor: "#222222"
          }}
        >
          <Tab.Screen 
            name = "Accueil" 
            component={HomeScreen}
            options= {{
              tabBarIcon: ({focused, color, size}) => (
                <Icon
                  name='home'
                  size={size ? size : 24}
                  color = {focused ? color : "#222222"}
                  focused={focused}
                  color={color}/>
              )
            }}
          />
          <Tab.Screen 
            name = "Budget" 
            component={BudgetScreen}
            options= {{
              tabBarIcon: ({focused, color, size}) => (
                <Icon
                  name='dollar-sign'
                  size={size ? size : 24}
                  color = {focused ? color : "#222222"}
                  focused={focused}
                  color={color}/>
              )
            }}
          />
          <Tab.Screen 
            name = "ToDo" 
            component={ToDoListScreen}
            options= {{
              tabBarIcon: ({focused, color, size}) => (
                <Icon
                  name='check-circle'
                  size={size ? size : 24}
                  color = {focused ? color : "#222222"}
                  focused={focused}
                  color={color}/>
              )
            }}
          />
          <Tab.Screen 
            name = "Invités" 
            component={AccountScreen}
            options= {{
              tabBarIcon: ({focused, color, size}) => (
                <Icon
                  name='users'
                  size={size ? size : 24}
                  color = {focused ? color : "#222222"}
                  focused={focused}
                  color={color}/>
              )
            }}
          />
          <Tab.Screen 
            name = "Prestataires" 
            component={AccountScreen}
            options= {{
              tabBarIcon: ({focused, color, size}) => (
                <Icon
                  name='search'
                  size={size ? size : 24}
                  color = {focused ? color : "#222222"}
                  focused={focused}
                  color={color}/>
              )
            }}
          />
        </Tab.Navigator>
      )
    }

    export default function MainNavigator(){
      return(
        <Stack.Navigator>
          <Stack.Screen name="Connexion" component={LoginScreen}/>
          <Stack.Screen name="Inscription" component={RegistrationScreen}/>
          <Stack.Screen name="WeddingMe" component={MainTabNavigator}/>
          <Stack.Screen name='Compte' component={AccountScreen}/>
          
          <Stack.Screen name='TodoListDetail' component={ToDoListDetailScreen}/>

        </Stack.Navigator>
      )
    }