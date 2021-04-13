import React from 'react'
import { StyleSheet, View, Text, Image, Switch } from 'react-native'
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import styles from './styles';
import { firebase } from '../../firebase/config'


class ToDoListItemScreen extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        userId : "6vGNbejUocQK9QgDsm6FHCNCrLS2",
        completed : false,
        readState : [],
      }
    }

    setReadState(data) {
      this.setState({readState : data})
    }

    setCompleted(data){
      this.setState({completed : data})

      //TEST
      console.log("Maj completed")
      console.log(this.state.completed)
    }

    loadStateCompleted(){
    //Permet de charger l'etat actuel de la todo
    //Cet etat est stocke sous la forme d'un champ "completed"
    //situe dans la BDD Firestore

      firebase.
        firestore()
        .collection('todoListState')
        .where("idTodo", "==", this.props.todo.id) //LIGNE DE TEST
        .where("idUser", "==", this.state.userId)
        .onSnapshot(
          (querySnapshot) => {
            const newEntities = []
            querySnapshot.forEach(doc => {
                const entity = doc.data()
                newEntities.push(entity)
                //Attention, ici on va donc supposer qu'il n'y a
                //bien qu'une seule donnée renvoyée
                //Si plusieurs, les données sont progressivement écrasées
                this.setCompleted(entity.completed)
            });
            this.setReadState(newEntities)
        },
        error => {
            console.log(error)
        }
        )
      //PARTIE TESTEE ACTUELLEMENT
      // if(this.state.readState.length < 2) {
      //   //Mise à jour de la donnee completed
      //   this.setCompleted(this.state.readState.completed)
      //   console.log("Tout va bien")
      //   console.log(this.state.completed)
      //   console.log("Pourquoi s'arrêter maintenant ?")
      //   console.log(this.state.readState.idTodo)
      //   console.log(this.state.readState)
      // }

    }

    componentDidMount(){
      //this.loadStateCompleted()

      // console.log("_____________________________________")
      // this.setReadState(this.props.todo)
      // console.log(this.state.readState)

      // this.setCompleted(false)
      // console.log(this.state.completed)

      // this.setCompleted(false)
      // console.log(this.state.tellMe)

      // console.log("_____________________________________")

      this.loadStateCompleted()
    }

    toggleSwitch() {
      //Ce morceau de code fonctionne seul
      //MAIS lors du toggle on a "undefined is not an object (evaluating 'this.state.completed')"
      const valActuelle = this.state.completed
      this.setCompleted(!valActuelle)
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
                  onValueChange={this.toggleSwitch}
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