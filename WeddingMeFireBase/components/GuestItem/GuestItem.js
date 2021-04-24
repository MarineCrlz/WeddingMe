import React from 'react'
import { StyleSheet, View, Text, Image, Switch, Button } from 'react-native'
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import styles from './styles';
import { firebase } from '../../src/firebase/config'
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

class GuestItem extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        userId : '',
        todoId : '',
        completed : false,
        readState : [],
        speFood : false,
        categorie : ''
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
      this.props.navigation.navigate("Details sur l invité", {guest : data})
    }

    //Fonction automatiquement lancée à l'ouverture du screen
    componentDidMount(){
        //Appel le chargement des données l'user actuel
        this.fetchUser()

        //Actualisation des proprietes du state pour l'affichage
        //Niveau spécification alimentaires
        if (this.props.todo.SpeAlim == "")
        {
            this.setSpeFood(false)
        }
        else
        {
            this.setSpeFood(true)
        }
        //Niveau catégorie
        if (this.props.todo.Categorie == "Famille")
        {
            this.setCategorie("Famille")
        }
        if (this.props.todo.Categorie == "Amis")
        {
            this.setCategorie("Amis")
        }
        if (this.props.todo.Categorie == "Travail")
        {
            this.setCategorie("Travail")
        }
    }

    render() {
      //Chargement des visuels (nécessaire pour avoir un chemin définir quelque soit la valeur de la variable)

        //Stockage des différentes images
        const imgFree = require('../../assets/food-free.png')
        const imgLimit = require('../../assets/food-limit.png')
        const source = this.state.speFood

        //Condition pour l'affichage
        let image = this.state.speFood ? imgLimit : imgFree

        //Copie de la variable pour faciliter l'écriture des appels
        const todo = this.props.todo

        return (
          <View style={styles.main_container}>
            <TouchableOpacity style={styles.main_touchable} onPress = {() => this.displayedDetails(todo)}>
              <View style={styles.touchable}>
                <View style={styles.container_infos}>
                  <View style={styles.identity}>
                      <Text style={styles.text_identity}>{todo.Prenom} {todo.Nom}</Text>
                  </View>
                  <View style={styles.category}>
                      <Text style={styles.text_category}>{this.state.categorie}</Text>
                  </View>
                </View>
                <View style={styles.container_infosSpe}>
                  <Image
                    style={styles.image}
                    source={image}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )
    }
}

export default GuestItem