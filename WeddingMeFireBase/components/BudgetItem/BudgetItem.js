import React from 'react'
import { StyleSheet, View, Text, Image, Switch, Button } from 'react-native'
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import styles from './styles';
import { firebase } from '../../src/firebase/config'
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

class BudgetItem extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        userId : '',
        etat : '',
      }
    }

    //Fonctions setter
    setSpeFood(data){
        this.setState({speFood : data})
    }

    setCategorie(data){
        this.setState({categorie : data})
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
    //Permet d'afficher la page de détail de la dépense sélectionnée
    displayedDetails(data){
      this.props.navigation.navigate("Details sur la dépense", {budget : data})
    }

    //Fonction automatiquement lancée à l'ouverture du screen
    componentDidMount(){
        //Appel le chargement des données de l'user actuel
        this.fetchUser()
    }

    render() {
      //Chargement des visuels (nécessaire pour avoir un chemin définir quelque soit la valeur de la variable)
      
        //Stockage des différentes images
        const imgNeutral = require('../../assets/neutral.png')
        const imgDone = require('../../assets/done.png')
        const imgLoad = require('../../assets/reload.png')
        const imgWarning = require('../../assets/warning.png')

        //Mise en place de variables pour savoir quelle image afficher
        const taskBudget = this.props.budget
        const etatDone = (taskBudget.Etat == "Paye")
        const etatLoad = (taskBudget.Etat == "En cours")
        const etatWarning = (taskBudget.Etat == "A faire")

        //Initialisation de l'image
        var img = imgNeutral

        //Condition pour l'affichage
        if (etatDone == true)
        {
          var img = imgDone
        }
        if (etatLoad == true)
        {
          var img = imgLoad
        }
        if (etatWarning == true)
        {
          var img = imgWarning
        }

        //Recuperation de variable pour l'affichage du prix
        const prix = taskBudget.Prix + " €"

        return (
          <View style={styles.main_container}>
            <TouchableOpacity style={styles.main_touchable} onPress = {() => this.displayedDetails(taskBudget)}>
              <View style={styles.touchable}>
                <View style={styles.container_infos}>
                  <View style={styles.identity}>
                      <Text style={styles.text_identity}>{taskBudget.Intitule}</Text>
                  </View>
                  <View style={styles.category}>
                      <Text style={styles.text_category}>{prix}</Text>
                  </View>
                </View>
                <View style={styles.container_infosSpe}>
                  <Image
                    style={styles.image}
                    source={img}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )
    }
}

export default BudgetItem