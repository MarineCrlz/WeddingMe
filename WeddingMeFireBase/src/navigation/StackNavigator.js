import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, LoginScreen, RegistrationScreen } from "../screens";
import AccountScreen from "../screens/AccountScreen/AccountScreen";
import BudgetScreen from "../screens/BudgetScreen/BudgetScreen";
import Icon from 'react-native-vector-icons/Feather';
import ToDoListScreen from "../screens/TodoListScreen/TodoListScreen";
import ToDoListDetailScreen from "../screens/TodoListDetailScreen/TodoListDetailScreen";
import GuestScreen from "../screens/GuestScreen/GuestScreen";
import GuestAddScreen from "../screens/GuestAddScreen/GuestAddScreen";
import GuestDetailScreen from "../screens/GuestDetailScreen/GuestDetailScreen";
import BudgetAddScreen from "../screens/BudgetAdd/BudgetAdd";
import BudgetDetailScreen from "../screens/BudgetDetailScreen/BudgetDetailScreen";
import CustomerAddScreen from "../screens/CustomerAddScreen/CustomerAddScreen";
import CustomerDetailScreen from "../screens/CustomerDetailScreen/CustomerDetailScreen";
import CustomerScreen from "../screens/CustomerScreen/CustomerScreen";

//Définition des différents navigateurs
const Stack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

//Définition du style des navigateurs
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

    //Définition du TabNavigator (la barre de navigation)
    function MainTabNavigator(){
      return(
        <Tab.Navigator
        //Définition de l'aspect visuel des icones
        //en fonction de la sélection
          tabBarOptions={{
            activeTintColor: "#fec89a",
            inactiveTintColor: "#222222"
          }}
        >
          <Tab.Screen 
          //Icone pour l'accueil
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
          //Icone pour les todo list
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
          //Icone pour le budget
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
          //Icone pour les invités
            name = "Invités" 
            component={GuestScreen}
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
          //Icone pour les prestataires
            name = "Prestataires" 
            component={CustomerScreen}
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

        //Définiton de l'ensemble des liens possibles via la navigation Stack
        //et intégration du TabNavigator

        //Avec les pages de Connexion et Inscription, le TabNavigator
        //et les différents liens accessibles une fois la connexion effectuée
        //via des boutons
        <Stack.Navigator>
          <Stack.Screen name="Connexion" component={LoginScreen}/>
          <Stack.Screen name="Inscription" component={RegistrationScreen}/>

          <Stack.Screen name="WeddingMe" component={MainTabNavigator}/>

          <Stack.Screen name='Compte' component={AccountScreen}/>
          <Stack.Screen name='TodoListDetail' component={ToDoListDetailScreen}/>
          <Stack.Screen name='Ajouter un invité' component={GuestAddScreen}/>
          <Stack.Screen name='Details sur l invité' component={GuestDetailScreen}/>
          <Stack.Screen name='Ajouter une dépense' component={BudgetAddScreen}/>
          <Stack.Screen name='Details sur la dépense' component={BudgetDetailScreen}/>

          <Stack.Screen name='Ajouter un prestataire' component={CustomerAddScreen}/>
          <Stack.Screen name='Details du prestataire' component={CustomerDetailScreen}/>
        </Stack.Navigator>
      )
    }