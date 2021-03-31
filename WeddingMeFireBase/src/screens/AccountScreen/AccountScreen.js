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
    const [userVenue, setVenue] = useState('')
    const [userDate, setDate] = useState('')
    const [userMail, setMail] = useState('')


    //Recuperation du user
    firebase.
        firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then(firestoreDocument => {
                //console.log('User exists: ', firestoreDocument.exists);
                if (firestoreDocument.exists) {
                    const user = firestoreDocument.data()
                    setName(user.fullName)
                    setPartner(user.partner)
                    setBudget(user.budget)
                    setVenue(user.venue)
                    setDate(user.date)
                    setMail(user.email)
                }
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
                <View style={styles.donneesSpe}>
                    <Text>Prénom</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={JSON.stringify(userName)}
                        placeholderTextColor="#aaaaaa"
                        //onChangeText={(text) => this.keepTextInputChanged(text,fullName)}
                    />
                </View>
                <View style={styles.donneesSpe}>
                    <Text>Partenaire</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={JSON.stringify(userPartner)}
                        placeholderTextColor="#aaaaaa"
                        //onChangeText={(text) => this.keepTextInputChanged(text,fullName)}
                    />
                </View>
                <View style={styles.donneesSpe}>
                    <Text>Budget total</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={JSON.stringify(userBudget)}
                        placeholderTextColor="#aaaaaa"
                        //onChangeText={(text) => this.keepTextInputChanged(text,fullName)}
                    />
                </View>
                <View style={styles.donneesSpe}>
                    <Text>Lieu du mariage</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={JSON.stringify(userVenue)}
                        placeholderTextColor="#aaaaaa"
                        //onChangeText={(text) => this.keepTextInputChanged(text,fullName)}
                    />
                </View>
                <View style={styles.donneesSpe}>
                    <Text>Date du mariage</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={JSON.stringify(userDate)}
                        placeholderTextColor="#aaaaaa"
                        //onChangeText={(text) => this.keepTextInputChanged(text,fullName)}
                    />
                </View>
                <View style={styles.donneesSpe}>
                    <Text>Adresse mail</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={JSON.stringify(userMail)}
                        placeholderTextColor="#aaaaaa"
                        //onChangeText={(text) => this.keepTextInputChanged(text,fullName)}
                    />
                </View>
            </View>
            <TouchableOpacity
                    style={styles.button}
                    //onPress={() => onLoginPress()}
                    >
                    <Text style={styles.buttonTitle}>Modifier</Text>
            </TouchableOpacity>
        </View>
    )
    }
