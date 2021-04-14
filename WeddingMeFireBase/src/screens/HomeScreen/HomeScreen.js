import React from 'react'
import { Text, View, Image, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import { NavigationContainer } from '@react-navigation/native'
import { useReducer } from 'react';

//CODE FONCTIONNEL
const HomeScreen = ({route, navigation}) => {

    //Recuperation du user
    const { user } = route.params;

    //Fonction navigation
    const onAccountPress = () => {
        navigation.navigate('Compte')
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.background}
                source={require('../../../assets/couple_kiss.jpg')}
            >
            <View style={styles.header}>
                <TouchableOpacity 
                style={styles.menu}
                onPress={onAccountPress}>
                    <Image
                        style={styles.logo}
                        source={require('../../../assets/account.png')}
                    />                
                </TouchableOpacity>
            </View>
            </ImageBackground>
            <View style={styles.message}>
                <Text style={styles.text}>Bienvenue {JSON.stringify(user.fullName)}</Text>
            </View>
        </View>
    )
}

export default HomeScreen;