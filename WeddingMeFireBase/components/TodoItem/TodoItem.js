import React from 'react'
import { StyleSheet, View, Text, Image, Switch, Button } from 'react-native'
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import styles from './styles';
import { firebase } from '../../src/firebase/config'

class TodoItem extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        userId : "",
        todoId : '',
        completed : false,
        readState : [],
      }
    }

    //Fonctions setter
    setIdTodo(data){
      this.setState({todoId : data})
    }

    setReadState(data) {
      this.setState({readState : data})
    }

    setCompleted(data){
      this.setState({completed : data})
    }

    setUserId(data){
      this.setState({userId : data})
    }

    loadStateCompleted(){
    //Permet de charger l'etat actuel de la todo
    //Cet etat est stocke sous la forme d'un champ "completed" situe dans la BDD Firestore
    const dataRef = firebase.firestore().collection('todoListState')
      dataRef
        .where("idTodo", "==", this.props.todo.id)
        .where("idUser", "==", this.state.userId)
        .onSnapshot(
          (querySnapshot) => {
            const newEntities = []
            querySnapshot.forEach(doc => {
                const entity = doc.data()
                entity.id = doc.id
                newEntities.push(entity)
                //Attention, ici on va donc supposer qu'il n'y a bien qu'une seule donnée renvoyée
                //Si plusieurs, les données sont progressivement écrasées
                this.setCompleted(entity.completed)
                this.setIdTodo(entity.id)
            });
            this.setReadState(newEntities)
            //Si l'utilisateur n'a jamais cliqué sur cette section, les data referentes n'existent pas dans la BDD
            //On va donc les créer
            if (newEntities < 1)
            {
              const newTodo = dataRef
              .add(
                {
                  completed : false,
                  idTodo : this.props.todo.id,
                  idUser : this.state.userId,
                }
              )
              this.setCompleted(false)
              this.setIdTodo(newTodo.id)
            }
        },
        error => {
            console.log(error)
        }
        )
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

                //Une fois le user chargé
                //on peut aller chercher les informations sur la todo
                this.loadStateCompleted()
                //Et aller actualiser les données d'affichage
            }
        });
  }

    //Fonction automatiquement lancée à l'ouverture du screen
    componentDidMount(){
      //Appel le chargement des données l'user actuel
      this.fetchUser()
    }

    //Fonction de mise a jour de la valeur completed
    //a partir de la valeur actuelle et des données de la BDD
    toggleSwitch() {
      //Est appelée lors du click sur le Switch
      const valActuelle = this.state.completed
      this.setCompleted(!valActuelle)
      this.updateCompletedFireStore(!valActuelle)
    }

    //Fontcion qui met a jour la variable completed dans la BDD
    //Requêtes No-SQL envoyée à FireStore
    updateCompletedFireStore(data) {
      firebase.
        firestore()
        .collection('todoListState')
        .doc(this.state.todoId)
        .update({
            completed : data
        })
    }

    render() {

      //Recuperation des données pour faciliter les appels

        const todo = this.props.todo
        return (
          <View style={styles.main_container}>
            <View style={styles.infos_container}>
                <View style={styles.title_container}>
                  <Text style={styles.title_text}>{todo.Nom}</Text>
                </View>
                <Switch
                  trackColor={{ false : "#666666", true:"#abebc6"}}
                  thumbColor={this.state.completed ? "#2ecc71" : "#2e2e2d"}
                  value = {this.state.completed}
                  onValueChange={() => this.toggleSwitch()}
                />
            </View>
            <View style={styles.description_container}>
                <Text style={styles.description_text} numberOfLines={10}>{todo.Description}</Text>
            </View>
          </View>
        )
    }
}

export default TodoItem