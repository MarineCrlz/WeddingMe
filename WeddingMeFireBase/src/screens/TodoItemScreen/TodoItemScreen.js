import React from 'react'
import { StyleSheet, View, Text, Image, Switch, Button } from 'react-native'
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import styles from './styles';
import { firebase } from '../../firebase/config'

//CODE FONCTIONNEL
//ATTENTION A DEPLACER DANS LES COMPONENTS
class ToDoListItemScreen extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        userId : "6vGNbejUocQK9QgDsm6FHCNCrLS2", //ATTENTION A MODIFIER
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

    loadStateCompleted(){
    //Permet de charger l'etat actuel de la todo
    //Cet etat est stocke sous la forme d'un champ "completed" situe dans la BDD Firestore
    const dataRef = firebase.firestore().collection('todoListState')
      dataRef
        .where("idTodo", "==", this.props.todo.id) //LIGNE DE TEST
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

    componentDidMount(){
      this.loadStateCompleted()
    }

    toggleSwitch() {
      //Est appelée lors du click sur le Switch
      //Met a jour la valeur de completed à partir de la valeur actuelle et les données dans la base de données
      const valActuelle = this.state.completed
      this.setCompleted(!valActuelle)
      this.updateCompletedFireStore(!valActuelle)
    }

    updateCompletedFireStore(data) {
      //Permet la mise à jour des variables dans la BDD
      firebase.
        firestore()
        .collection('todoListState')
        .doc(this.state.todoId)
        .update({
            completed : data
        })
    }

    render() {
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

export default ToDoListItemScreen