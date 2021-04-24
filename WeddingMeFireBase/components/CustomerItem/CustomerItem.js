import React from 'react'
import { StyleSheet, View, Text, Image, Switch, Button } from 'react-native'
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import styles from './styles';
import { firebase } from '../../src/firebase/config'
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

class CustomerItem extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        userId : '',
        customerId : '',
        nomEntreprise : ''
      }
    }

    //Fonctions setter
    setEntreprise(data){
        this.setState({nomEntreprise : data})
    }

    setUserId(data){
      this.setState({userId : data})
    }

  //Fonction de récupération de l'user
  //Requêtes No-SQL envoyées à la BDD Firestore
    fetchUser(){
      firebase.
      firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then(firestoreDocument => {
              if (firestoreDocument.exists) {
                  const user = firestoreDocument.data()
                  this.setUserId(user.id)
              }
          });
    }

    //Fonction de navigation
    //Permet d'afficher la page de détail du prestataire sélectionné
    displayedDetails(data){
        this.props.navigation.navigate("Details du prestataire", {customer : data})
    }

    //Fonction automatiquement lancée à l'ouverture du screen
    componentDidMount(){
        //Appel le chargement des données l'user actuel
        this.fetchUser()
    }

    render() {
        //Copie de la variable pour faciliter l'écriture des appels
        const customer = this.props.customer

        return (
          <View style={styles.main_container}>
            <TouchableOpacity style={styles.main_touchable} onPress = {() => this.displayedDetails(customer)}>
              <View style={styles.touchable}>
                <View style={styles.container_infos}>
                  <View style={styles.identity}>
                      <Text style={styles.text_identity}>{customer.Nom} {customer.Prenom}</Text>
                  </View>
                  <View style={styles.category}>
                      <Text style={styles.text_category}>{customer.NomEntreprise}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )
    }
}

export default CustomerItem