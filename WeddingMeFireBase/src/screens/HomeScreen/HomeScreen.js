import React from 'react'
import { Text, View, Image, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import { firebase } from '../../firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import { useEffect, useState, useReducer } from 'react';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user : ''
            // user: this.props.route.params.user
        }
    }

    setUser(data){
        this.setState({user : data})
    }

    //Fonction automatiquement lancée à l'ouverture du screen
    componentDidMount(){
        //Appel le chargement des données de l'user actuel
        this.fetchUser()
    }

    //Fonction de récupération de l'user
    //Requêtes No-SQL envoyées à la BDD Firestore
    fetchUser(){
        //console.log("fetch user activated")
        firebase.
        firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then(firestoreDocument => {
                if (firestoreDocument.exists) {
                    const user = firestoreDocument.data()
                    this.setUser(user)
                    //this.setState({user : user})
                }
            });        
    }

    //Fonction navigation
    onAccountPress() {
        var newUser = this.state.user
        //Conduit à la page du compte via le StackNavigator
        this.props.navigation.navigate('Compte', {user : newUser})
    }

    render(){
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.background}
                    source={require('../../../assets/couple_kiss.jpg')}
                >
                <View style={styles.header}>
                    <TouchableOpacity 
                    style={styles.menu}
                    onPress={() => this.onAccountPress()}>
                        <Image
                            style={styles.logo}
                            source={require('../../../assets/account.png')}
                        />                
                    </TouchableOpacity>
                </View>
                </ImageBackground>
                <View style={styles.message}>
                    <Text style={styles.text}>Bienvenue {JSON.stringify(this.state.user.fullName)}</Text>
                    {/* <Text style={styles.text}>Bienvenue {JSON.stringify(this.state.user.fullName)}</Text> */}
                </View>
            </View>
        )
    }
}

export default HomeScreen;

// const HomeScreen = ({route, navigation}) => {

//     //Recuperation du user dans les props
//     const { user } = route.params;
//     //const [currentUser, setCurrentUser] = useState('')

//     //Fonction navigation
//     const onAccountPress = () => {
//         //Conduit à la page du compte via le StackNavigator
//         navigation.navigate('Compte', {user : user})
//     }

//     return (
//         <View style={styles.container}>
//             <ImageBackground
//                 style={styles.background}
//                 source={require('../../../assets/couple_kiss.jpg')}
//             >
//             <View style={styles.header}>
//                 <TouchableOpacity 
//                 style={styles.menu}
//                 onPress={onAccountPress}>
//                     <Image
//                         style={styles.logo}
//                         source={require('../../../assets/account.png')}
//                     />                
//                 </TouchableOpacity>
//             </View>
//             </ImageBackground>
//             <View style={styles.message}>
//                 <Text style={styles.text}>Bienvenue {JSON.stringify(user.fullName)}</Text>
//             </View>
//         </View>
//     )
// }

// export default HomeScreen;