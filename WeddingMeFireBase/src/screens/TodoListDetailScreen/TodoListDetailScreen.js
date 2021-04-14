import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import ToDoListItemScreen from '../TodoItemScreen/TodoItemScreen';
import { ScrollView } from 'react-native-gesture-handler';

//CODE FONCTIONNEL
class ToDoListDetailScreen extends React.Component {

  constructor(props) {
    super(props)
    this.timeGiven = ""
    this.state = {
      todos: [],
      texte: ""
    }
  }

  //Fonction setter
  setToDos(data){
    this.setState({todos : data})
  }

  componentDidMount(){
    this.timeGiven = this.props.route.params.time
    //Chargement des todos correspondant a la periode donnee
    this.loadToDos(this.timeGiven)

    //Differenciation de l'affichage en fonction des data
    if (this.timeGiven == "12m") {
        this.setState({texte : "12 mois avant"})
      }
      if (this.timeGiven == "9m") {
        this.setState({texte : "9 mois avant"})
      }
      if (this.timeGiven == "6m") {
        this.setState({texte : "6 mois avant"})
      }
      if (this.timeGiven == "4m") {
        this.setState({texte : "4 mois avant"})
      }
      if (this.timeGiven == "3m") {
        this.setState({texte : "3 mois avant"})
      }
      if (this.timeGiven == "2s") {
        this.setState({texte : "2 semaines avant"})
      }
      if (this.timeGiven == "3j") {
        this.setState({texte : "3 jours avant"})
      }
      if (this.timeGiven == "0j") {
        this.setState({texte : "Le jour J"})
      }
  }

  loadToDos(time){
    //Permet de charger les todos correspondant à la période donnée
    //a partir de la BDD
        firebase.
            firestore()
            .collection('todoListFixed')
            .where("Time", "==", time)
            .onSnapshot(
                (querySnapshot) => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    this.setToDos(newEntities)
                    console.log("Les new entities")
                    console.log(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
  }

  render() {
    return (
      <View style={styles.main_container}>
            <View style={styles.container_title}>
            <Text style={styles.title}> {this.state.texte}</Text>
            </View>
            <View style={styles.container_flatlist}>
              <FlatList
              data={this.state.todos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => <ToDoListItemScreen todo={item}/>}
              />
            </View>
      </View>
    )
  }
}

export default ToDoListDetailScreen