import React, {useState} from 'react'
import { Text, View, Image, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import { firebase } from '../../firebase/config'
import { useEffect, componentDidMount } from 'react';

export default function AccountScreen({navigation}) {
    //Variables contenant les actuellement en mémoire dans FireBase
    const [uid, setID] = useState('')
    const [userName, setName] = useState('')
    const [userPartner, setPartner] = useState('')
    const [userBudget, setBudget] = useState('')
    const [userVenue, setVenue] = useState('')
    const [userDate, setDate] = useState('')
    const [userMail, setMail] = useState('')

    //Variables vides, utilisées pour conserver les valeurs initiales en mémoire
    const[name, _setName] = useState('')
    const [partner, _setPartner] = useState('')
    const [budget, _setBudget] = useState('')
    const [venue, _setVenue] = useState('')
    const [date, _setDate] = useState('')
    const [mail, _setMail] = useState('')

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
                    setID(user.id)
                    console.log("Donne infos id")
                    console.log(user.id)
                    console.log(uid)
                    setName(user.fullName)
                    setPartner(user.partner)
                    setBudget(user.budget)
                    setVenue(user.venue)
                    setDate(user.date)
                    setMail(user.email)
                }
            });

    //ATTENTION ici modification temporaire du code : on reprend systématiquement les news valeurs
    //Besoin donc que tout soit rempli à chaque fois
    const sendData = () => {
        updateData()
        firebase.
            firestore()
                .collection('users')
                .doc(uid)
                .update ({
                    date : date,
                    email : mail,
                    fullName : name,
                    partner : partner,
                    venue : venue,
                });
        console.log('Quelles donnees sont envoyées ?')
        console.log(userDate)
        console.log(userMail)
        console.log(userName)
        console.log(userPartner)
        console.log(userVenue)
    }

    //Pour éviter d'avoir des champs vides
    //ATTENTION modification du champ dans la boucle if ne fonctionne pas ?...
    const updateData = () => {
        if (name !== "") {
            setName(name)
            console.log(userName)
            console.log("Name non nul")
            console.log(name)
            console.log(userName)
        }
        if (partner !== "") {
            setPartner(partner)
            console.log("partner non nul")
            console.log(partner)
            console.log(userPartner)
        }
        if (budget !== "") {
            setBudget(budget)
            console.log("budget non nul")
            console.log(budget)
        }
        if (venue !== "") {
            setVenue(venue)
            console.log("venue non nul")
            console.log(venue)
        }
        if (date !== "") {
            setDate(date)
            console.log("date non nul")
            console.log(date)
        }
        if (mail !== "") {
            setMail(mail)
            console.log("mail non nul")
            console.log(mail)
        }
    }

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
            <View //ATTENTION RAJOUT DE CODE ICI
            >
                <Text>
                    Attention, si vous voulez modifier un champ, il vous est demandé de renoter également l'ensemble des champs présents.</Text>
            </View>
            <View style={styles.donnees}>
                <View style={styles.donneesSpe}>
                    <Text>Prénom</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={JSON.stringify(userName)}
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => _setName(text)}
                        value={name}
                        //onChangeText={(text) => this.keepTextInputChanged(text,fullName)}
                    />
                </View>
                <View style={styles.donneesSpe}>
                    <Text>Partenaire</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={JSON.stringify(userPartner)}
                        placeholderTextColor="#aaaaaa"
                        value={partner}
                        onChangeText={(text) => _setPartner(text)}
                        //onChangeText={(text) => this.keepTextInputChanged(text,fullName)}
                    />
                </View>
                <View style={styles.donneesSpe}>
                    <Text>Budget total</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={JSON.stringify(userBudget)}
                        placeholderTextColor="#aaaaaa"
                        value={budget}
                        onChangeText={(text) => _setBudget(text)}
                        //onChangeText={(text) => this.keepTextInputChanged(text,fullName)}
                    />
                </View>
                <View style={styles.donneesSpe}>
                    <Text>Lieu du mariage</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={JSON.stringify(userVenue)}
                        placeholderTextColor="#aaaaaa"
                        value={venue}
                        onChangeText={(text) => _setVenue(text)}
                        //onChangeText={(text) => this.keepTextInputChanged(text,fullName)}
                    />
                </View>
                <View style={styles.donneesSpe}>
                    <Text>Date du mariage</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={JSON.stringify(userDate)}
                        placeholderTextColor="#aaaaaa"
                        value={date}
                        onChangeText={(text) => _setDate(text)}
                        //onChangeText={(text) => this.keepTextInputChanged(text,fullName)}
                    />
                </View>
                <View style={styles.donneesSpe}>
                    <Text>Adresse mail</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={JSON.stringify(userMail)}
                        placeholderTextColor="#aaaaaa"
                        value={mail}
                        onChangeText={(text) => _setMail(text)}
                        //onChangeText={(text) => this.keepTextInputChanged(text,fullName)}
                    />
                </View>
            </View>
            <TouchableOpacity
                    style={styles.button}
                    //onPress={() => onLoginPress()}
                    onPress={() => sendData()}
                    >
                    <Text style={styles.buttonTitle}>Modifier</Text>
            </TouchableOpacity>
        </View>
    )
    }
