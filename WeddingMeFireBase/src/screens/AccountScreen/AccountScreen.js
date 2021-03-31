import React, {useState} from 'react'
import { Text, View, Image, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import { firebase } from '../../firebase/config'
import { useEffect, componentDidMount } from 'react';

export default function AccountScreen({navigation}) {
    const [userList, setUsers] = useState([])
    const [userName, setName] = useState('')
    const [userPartner, setPartner] = useState('')
    const [userBudget, setBudget] = useState('')

    //const ici codée en brut, mais sinon à récupérer directement dans le user transmis
    const idUser = "uS5qo0f9JAT6D8kkwnxDQmvon813"

    //Ici on fait le squelette de récupérations de données, normalement inutile pour cette page

    //Recuperation du user
    firebase.
        firestore()
            .collection('users')
            .doc(idUser)
            .get()
            .then(firestoreDocument => {
                console.log('User exists: ', firestoreDocument.exists);

                if (firestoreDocument.exists) {
                    console.log('User data firestore: ', firestoreDocument.data())
                    const user = firestoreDocument.data()

                    console.log("User : on devrait avoir les différentes infos")
                    console.log(user)
                    setName("Bah")
                    setPartner(user.partner)
                    setBudget(user.budget)
                    console.log("User name")
                    console.log(user.fullName)
                }
                console.log(userName)
            });

    //On récupère les données actuellement stockées
    // useEffect(() => {
    //     users
    //         .onSnapshot(
    //             console.log("Test users"),
    //             console.log(users),
    //             console.log("Test user"),
    //             console.log(user),

    //             querySnapshot => {
    //                 const loadedUser = []
    //                 querySnapshot.forEach(doc => {
    //                     const user = doc.data()
    //                     user.id = doc.id
    //                     loadedUser.push(user)
    //                     console.log(loadedUser)
    //                 });
    //                 setUsers(loadedUser)
    //             },
    //             error => {
    //                 console.log(error)
    //             }
    //         )
    //         console.log("Vue userList")
    //         console.log(userList)
    // }, [])

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
                        placeholder={JSON.stringify(userName)}
                        //onChangeText={(text) => this.keepTextInputChanged(text,fullName)}
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
