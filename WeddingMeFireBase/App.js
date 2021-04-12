import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen, AccountScreen } from './src/screens'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }
 import {firebase} from './src/firebase/config'

//ajouté pour test
import Home, {GeneralNavigator } from "./src/navigation/StackNavigator"
import HomeImbriquee from './src/navigation/StackNavigator';
import MainNavigator from './src/navigation/StackNavigator';

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
        <MainNavigator/>
    </NavigationContainer>
  );
}