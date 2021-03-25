import React from 'react'
import { Text, View, Image, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import { NavigationContainer } from '@react-navigation/native'
import { useReducer } from 'react';

const HomeScreen = ({route, navigation}) => {
    const { user } = route.params;

// const HomeScreen = ({navigation}) => {
    const onAccountPress = () => {
        navigation.navigate('Compte')
    }

    const onMenuPress = () => {
        navigation.navigate('Menu')
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
                onPress={onMenuPress}>
                    <Image
                        style={styles.logo}
                        source={require('../../../assets/menu.png')}
                    />                
                </TouchableOpacity>
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
                <Text>Bienvenue {JSON.stringify(user.fullName)}</Text>
            </View>
        </View>
    )
}

export default HomeScreen;