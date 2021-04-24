import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Fonction de navigation
    const onFooterLinkPress = () => {
        //Conduit à la page de connexion via le StackNavigator
        navigation.navigate('Inscription')
    }

    //Fonction de connexion de l'user avec mot de passe et identifiant
    //et création des éléments relatifs dans la BDD
    //Requêtes No-SQL envoyées au service Authentification de FireBase
    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("Nous sommes désolés mais ce compte n'existe pas.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        console.log(user)
                        navigation.navigate('WeddingMe', {screen : 'Accueil', params: {user:user}
                        })
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/logoWeddingMe.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Identifiant'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Mot de passe'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Connexion</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Pas encore de compte ? <Text onPress={onFooterLinkPress} style={styles.footerLink}>M'inscrire</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}