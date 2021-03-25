import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import styles from './styles';

class Loading extends React.Component {
    componentDidMount() {
        const isLoggdeIn = false;
        this.props.navigation.navigate(isLoggdeIn ? "App" : "LoginScreen");
    }

    onLoginPress() {
    navigation.navigate('LoginScreen', {
        user:user,
    });
    }

    render() {
        return(
            <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/logoWeddingMe.png')}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Appuyer pour continuer</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
        )

    }
}