import React from 'react'
import { Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

export default function BudgetScreen({navigation}) {

    const onLoginPress = () => {
        navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            <Text>Mon budget</Text>
            <TouchableOpacity
                    style={styles.button}
                    //onPress={() => onLoginPress()}
                    >
                    <Text style={styles.buttonTitle}>Touche moi</Text>
                </TouchableOpacity>
        </View>
    )
}