import React, {useState} from 'react'
import { Text, View, Image, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import { firebase } from '../../firebase/config'
import { useEffect, componentDidMount } from 'react';

class AccountScreen extends React.Component {

    constructor(props) {
        super(props)
        //Ici nous n'avons PAS besoin que ces donnees soient dans le state
        //Car elles n'affectent PAS l'affichage, donc inutile de faire le
        //setState et relancer le render à chaque fois
        //On les met donc en prop
        this.lieu = this.props.route.params.user.venue,
        this.prenom = this.props.route.params.user.fullName,
        this.partenaire = this.props.route.params.user.partner,
        this.budget = this.props.route.params.user.budget,
        this.date = this.props.route.params.user.date,
        this.mail = this.props.route.params.user.email,

        //Nouvelles donnees
        this._lieu = "",
        this._prenom = "",
        this._partenaire = "",
        this._budget = "",
        this._date = "",
        this._mail = "",
        this.state = {
            user : '',
            userId: '',
        }
      }

    //Fonctions setter
    setVenue(data){
        this._lieu = data
    }

    setName(data){
        this._prenom = data
    }

    setPartner(data){
        this._partenaire = data
    }

    setBudget(data){
        this._budget = data
    }

    setDate(data){
        this._date = data
    }

    setMail(data){
        this._mail = data
    }

    setUser(data){
    this.setState({user : data})
    }

    setUserId(data){
    this.setState({userId : data})
    }

    setNewBudget(data){
        this._budget = data
    }

    //Fonction de récupération de l'user
    //Requêtes No-SQL envoyées à la BDD Firestore
    //Ne sera appelé que lors de la modification, 
    //pour envoyer le nouvel user à l'accueil
    fetchUser(){
        firebase.
        firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then(firestoreDocument => {
                if (firestoreDocument.exists) {
                    const user = firestoreDocument.data()
                    this.props.navigation.navigate('WeddingMe', {screen : 'Accueil', params: {user:firestoreDocument.data()}})
                }
            });
    }

  //Fonction de modification de la dépense
  //Recuperation des éléments à modifier
  //puis Requêtes No-SQL envoyées à la BDD Firestore
  updateDataAccount(){
    var newLieu = this.lieu
    var newPrenom = this.prenom
    var newPartenaire = this.partenaire
    var newBudget = this.budget
    var newDate = this.date
    var newMail = this.mail

    //on n'envoie que les éléments modifiés par l'utilisateur
      if (this._lieu != "" && this._lieu != this.lieu)
      {
        newLieu = this._lieu
      }
      if (this._prenom != "" && this._prenom != this.prenom)
      {
        newPrenom = this._prenom
      }
      if (this._partenaire != "" && this._partenaire != this.partenaire)
      {
        newPartenaire= this._partenaire
      }
      if (this._budget != "" && this._budget != this.budget)
      {
        newBudget= this._budget
      }
      if (this._date != "" && this._date != this.date)
      {
        newDate= this._date
      }
      if (this._mail != "" && this._mail != this.mail)
      {
        newMail= this._mail
      }
    //appel de la fonction de modification
    this.updateAccount(newLieu, newPrenom, newPartenaire, newBudget, newDate, newMail)
  }

  //Fonction de modification de la dépense
  //Requêtes No-SQL envoyées à la BDD Firestore
  updateAccount(Lieu, Prenom, Partenaire, Budget, Date, Mail){
    firebase.
      firestore()
          .collection('users')
          .doc(this.props.route.params.user.id)
          .update({
              budget : Budget,
              date : Date,
              email : Mail,
              fullName : Prenom,
              partner : Partenaire,
              venue : Lieu
          })
          .then(() => {
              //Recuperation du user pour qu'il soit envoyé à l'accueil
              this.fetchUser()
              console.log("Document successfully updated!");
              
          }).catch((error) => {
              console.error("Error updating document: ", error);
          });
    }

    render(){
        return(
            <View style={styles.container}>
            <View style={styles.header}>
                <Text>Mon compte</Text>
            </View>
            <View style={styles.donnees}>
                <View style={styles.donneesSpe}>
                    <Text>Prénom</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={JSON.stringify(this.prenom)}
                        placeholderTextColor="#aaaaaa"                    
                        onChangeText={(text) => this.setName(text)}
                        value={this.state.prenom}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.donneesSpe}>
                    <Text>Partenaire</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={JSON.stringify(this.partenaire)}
                        placeholderTextColor="#aaaaaa"                    
                        onChangeText={(text) => this.setPartner(text)}
                        value={this.state.partner}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.donneesSpe}>
                    <Text>Budget total</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={JSON.stringify(this.budget)}
                        placeholderTextColor="#aaaaaa"                    
                        onChangeText={(text) => this.setBudget(text)}
                        value={this.state.budget}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.donneesSpe}>
                    <Text>Lieu du mariage</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={JSON.stringify(this.lieu)}
                        placeholderTextColor="#aaaaaa"                    
                        onChangeText={(text) => this.setVenue(text)}
                        value={this.state.lieu}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.donneesSpe}>
                    <Text>Date du mariage</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={JSON.stringify(this.date)}
                        placeholderTextColor="#aaaaaa"                    
                        onChangeText={(text) => this.setDate(text)}
                        value={this.state.date}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.donneesSpe}>
                    <Text>Adresse mail</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={JSON.stringify(this.mail)}
                        placeholderTextColor="#aaaaaa"                    
                        onChangeText={(text) => this.setMail(text)}
                        value={this.state.mail}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>
            </View>
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.updateDataAccount()}
                    >
                    <Text style={styles.buttonTitle}>Modifier</Text>
            </TouchableOpacity>
        </View>
        )
    }

}

export default AccountScreen