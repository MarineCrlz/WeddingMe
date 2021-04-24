import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function RegistrationScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    //Fonction de navigation
    const onFooterLinkPress = () => {
        //Conduit à la page de connexion via le StackNavigator
        navigation.navigate('Connexion')
    }

    //Fonction de création de l'user à partir des données saisies
    //et création des éléments relatifs dans la BDD
    //Requêtes No-SQL envoyées au service Authentification de FireBase
    const onRegisterPress = () => {
        //verification du mot de passe
        if (password !== confirmPassword) {
            alert("Les mots de passe ne sont pas identiques.")
            return
        }
        //Creation de l'utilisateur
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    //initialisation des données que l'utilisateur pourra modifier plus tard (partner, date...)
                    id: uid,
                    email,
                    fullName,
                    partner: "",
                    venue: "",
                    date : "",
                    budget: 0,
                };
                //Recuperation des elements du budget stockés en dur dans la BDD
                //Via requêtes No-SQL
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        const user = data
                        firebase
                        .firestore()
                        .collection('budgetFixed')
                        .onSnapshot(
                            (querySnapshot) => {
                                const newEntities = []
                                querySnapshot.forEach(doc => {
                                    const entity = doc.data()
                                    entity.id = doc.id
                                    newEntities.push(entity)
                                    //pour chaque élément récupéré, on créé une copie 
                                    //qui sera liée au profil de l'utilisateur
                                    createTaskBudget(entity, user)
                                });
                                //une fois la récupération effectuée, l'utilisateur est envoyé sur l'accueil
                                navigation.navigate('WeddingMe', {screen : 'Accueil', params: {user:user}})
                            },
                        )
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
        });
    }

    //Fonction de creation d'une dépense dans la collection budget
    //Requêtes No-SQL envoyées à la BDD Firestore
    const createTaskBudget = (entity, user) => {
        const userBudget = firebase.firestore().collection('budget')
        userBudget
            .add(
                {
                    Prix : entity.Prix,
                    Intitule : entity.Intitule,
                    Categorie : entity.Categorie,
                    Description : entity.Description,
                    Etat : entity.Etat,
                    IdUser : user.id
                },
                error => {
                    console.log(error)
                }
            )
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
                    placeholder='Prénom'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
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
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirmation du mot de passe'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Créer un compte</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Déjà un compte ? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Me connecter</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}