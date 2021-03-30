import React from 'react'
import { Text, View, Image, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';


class AccountScreen extends React.Component {
    
    constructor (props) {
        super(props)
        }

    keepTextInputChanged(text,position) {
        //user.position = text
    }

    updateText() {

    }

    render(){
        console.log(this.props)
            return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Mon compte</Text>
            </View>
            <View style={styles.donnees}>
                <View style={styles.prenom}>
                    <Text>Mon prénom</Text>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Jaune'
                        //placeholder={JSON.stringify(user.fullName)}
                        onChangeText={(text) => this.keepTextInputChanged(text,fullName)}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => updateText()}
            />
        </View>
    )
    }

}

export default AccountScreen;