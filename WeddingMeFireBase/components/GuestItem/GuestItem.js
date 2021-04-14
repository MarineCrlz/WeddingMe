import React from 'react'
import { StyleSheet, View, Text, Image, Switch, Button } from 'react-native'
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import styles from './styles';
//import { firebase } from '../../firebase/config'
import Icon from 'react-native-vector-icons/Feather';

class GuestItem extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        userId : "6vGNbejUocQK9QgDsm6FHCNCrLS2", //ATTENTION A MODIFIER
        todoId : '',
        completed : false,
        readState : [],
        speFood : false,
        categorie : ''
      }
    }

    setSpeFood(data){
        this.setState({speFood : data})
    }

    setCategorie(data){
        this.setState({categorie : data})
    }

    componentDidMount(){
        // const images = {
        //     imgFree : require('../../assets/food-free.png'),
        //     imgLimit : require('../../assets/food-limit.png')
        // }
        // if (this.props.todo.SpeAlim == "")
        // {
        //     this.setSpeFood(images.imgFree)
        // }
        // else
        // {
        //     this.setSpeFood(images.imgLimit)
        // }

        if (this.props.todo.SpeAlim == "")
        {
            this.setSpeFood(false)
        }
        else
        {
            this.setSpeFood(true)
        }

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

    // componentDidMount(){
    //   //this.loadStateCompleted()
    // }

    // toggleSwitch() {
    //   //Est appelée lors du click sur le Switch
    //   //Met a jour la valeur de completed à partir de la valeur actuelle et les données dans la base de données
    //   const valActuelle = this.state.completed
    //   this.setCompleted(!valActuelle)
    //   this.updateCompletedFireStore(!valActuelle)
    // }

    // updateCompletedFireStore(data) {
    //   //Permet la mise à jour des variables dans la BDD
    //   firebase.
    //     firestore()
    //     .collection('todoListState')
    //     .doc(this.state.todoId)
    //     .update({
    //         completed : data
    //     })
    // }

    render() {
        const imgFree = require('../../assets/food-free.png')
        const imgLimit = require('../../assets/food-limit.png')
        const source = this.state.speFood

        let image = this.state.speFood ? imgLimit : imgFree

        const todo = this.props.todo
        return (
          <View style={styles.main_container}>
              <View style={styles.container_infos}>
                <View style={styles.identity}>
                    <Text style={styles.text_identity}>{todo.Prenom} {todo.Nom}</Text>
                </View>
                <View style={styles.category}>
                    <Text style={styles.text_category}>{this.state.categorie}</Text>
                </View>
              </View>
              <View style={styles.container_infosSpe}>
                {/* <Text style={styles.text_category}>{this.state.categorie}</Text> */}
                <Image
                  style={styles.image}
                  source={image}
                />
              </View>
            
            {/* <View style={styles.infos_container}>
            </View> */}
            {/* <View style={styles.description_container}>
                <Text style={styles.description_text}>{todo.Prenom}</Text>
                <Text style={styles.description_text}>{todo.Nom}</Text>
            </View> */}
          </View>
        )
    }
}

export default GuestItem