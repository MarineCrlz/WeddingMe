import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

class GuestDetailScreen extends React.Component {

  constructor(props) {
    super(props)
    //Ici nous n'avons PAS besoin que ces donnees soient dans le state
    //Car elles n'affectent PAS l'affichage, donc inutile de faire le
    //setState et relancer le render à chaque fois
    //On les met donc en prop
    this.nom = "",
    this.prenom = "",
    this.age = "",
    this.speAlimDescription = "",
    this.state = {
        user : '',
        userId: '',
        categorie : "",
        invitation : "",
        speAlim : false,
        age : ""
    }
  }

  //Fonctions setter
  setNom(data){
      this.nom = data
  }

  setPrenom(data){
      this.prenom = data
  }

  setSpeAlimDescription(data){
      this.speAlimDescription = data
  }
  
  setSpeAlim(data){
      this.setState({speAlim : data})
  }

  setCategorie(data){
    this.setState({categorie : data})
}

setPartner(data){
    this.setState({partnerName : data})
}

setInvitation(data){
    this.setState({invitation : data})
}

setAge(data){
    this.setState({age : data})
}

setUser(data){
    this.setState({user : data})
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
                this.setUser(user)
                
                //on gère le cas où le nom du partner n'est pas saisi
                if (user.partner == "")
                {
                    const text = "La moitié de "
                    this.setPartner(text + user.fullName)
                }
            }
        });
  }

  //Fonction de suppresion de l'invité
  //Requêtes No-SQL envoyées à la BDD Firestore
    suppGuest(){
        firebase.
            firestore()
            .collection('guest')
            .doc(this.props.route.params.guest.id)
            .delete()
            .then(() => {
                this.props.navigation.goBack();
                console.log("Document successfully deleted!");
                
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
    }

  //Fonction automatiquement lancée à l'ouverture du screen
    componentDidMount(){
        //Appel le chargement des données de l'user actuel
        this.fetchUser()
      }

  render() {

      //Recuperation données pour simplifier ensuite les appels
      const guest = this.props.route.params.guest

    //Chargement des différents styles (nécessaire pour avoir un style défini quelque soit la valeur de la variable)
      const styleChosen = styles.touchable_chosen
      const styleNotChosen = styles.touchable

      //Affichage differencié des specifications aliementaires
      let styleSpeYes = guest.SpeAlim ? styleChosen : styleNotChosen
      let styleSpeNo = guest.SpeAlim ? styleNotChosen : styleChosen

      //Affichage différencié de l'age
      const AgeEnfant = (guest.Age == "Enfant")
      let styleEnfant = AgeEnfant ? styleChosen : styleNotChosen
      let styleAdulte = AgeEnfant ? styleNotChosen : styleChosen
    
      //Affichage différencié du groupe
      const GroupeFamille = (guest.Categorie == "Famille")
      const GroupeAmis = (guest.Categorie == "Amis")
      const GroupeTravail = (guest.Categorie == "Travail")
      let styleFamille = GroupeFamille ? styleChosen : styleNotChosen
      let styleAmis = GroupeAmis ? styleChosen : styleNotChosen
      let styleTravail = GroupeTravail ? styleChosen : styleNotChosen

      //Affichage différencié de l'affiliation/invitation
      const InvitUser = (guest.Affiliation == this.state.user.fullName)
      const InvitPartner = (guest.Affiliation == this.state.user.partner | guest.Affiliation == "")
      //on gère le cas où des invités sont saisis avant ou après modification de la saisie du partenaire
      //et donc cas où le partner a un prenom et celui ou il est note ""
      const InvitCouple = (guest.Affiliation == "couple")
      let styleUser = InvitUser ? styleChosen : styleNotChosen
      let stylePartner = InvitPartner ? styleChosen : styleNotChosen
      let styleCouple = InvitCouple ? styleChosen : styleNotChosen
    
      //Affichage différencié dans le cas où le partenaire n'est pas saisi
        var textPartner = this.state.user.partner
        if (this.state.user.partner == "")
        {
            textPartner = "Sa moitié"
        }

    return (
        <View style={styles.main_container}>
            <ScrollView style={styles.main_scroll}>
            <View style={styles.container_identity}>
                <View style={styles.container_titre}>
                    <Text style={styles.titre}>Identité</Text>
                </View>
                <View style={styles.container_input}>
                    <Text style={styles.input}>
                        {guest.Nom}
                    </Text>
                    <Text style={styles.input}>
                        {guest.Prenom}
                    </Text>
                </View>
            </View>
            <View style={styles.container_age}>
                <View style={styles.container_titre}>
                    <Text style={styles.titre}>Age</Text>
                </View>
                <View style={styles.container_age_choice}>
                    <View style={styleAdulte}>
                        <TouchableOpacity>
                            <Text style={styles.buttonTitle}>Adulte</Text>
                        </TouchableOpacity>
                    </View>
                        <View style={styleEnfant}>
                            <TouchableOpacity>
                                <Text style={styles.buttonTitle}>Enfant</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
            <View style={styles.container_category}>
                <View style={styles.container_titre}>
                    <Text style={styles.titre}>Groupe</Text>
                </View>
                <View style={styles.container_category_choice}>
                    <View style={styleFamille}>
                        <TouchableOpacity>
                            <Text style={styles.buttonTitle}>Famille</Text>
                        </TouchableOpacity>
                    </View>
                        <View style={styleAmis}>
                            <TouchableOpacity>
                                <Text style={styles.buttonTitle}>Amis</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styleTravail}>
                            <TouchableOpacity>
                                <Text style={styles.buttonTitle}>Travail</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
            <View style={styles.container_invitation}>
                <View style={styles.container_titre}>
                    <Text style={styles.titre}>Invité par</Text>
                </View>
                <View style={styles.container_invitation_choice}>
                    <View style={styleUser}>
                        <TouchableOpacity>
                            <Text style={styles.buttonTitle}>{this.state.user.fullName}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={stylePartner}>
                        <TouchableOpacity>
                            <Text style={styles.buttonTitle}>{textPartner}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styleCouple}>
                        <TouchableOpacity>
                            <Text style={styles.buttonTitle}>Le couple</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.container_alim}>
                <View style={styles.container_titre}>
                    <Text style={styles.titre}>Spécifications alimentaires</Text>
                </View>
            <View style={styles.container_alim_choice}>
                <View style={styleSpeYes}>
                    <TouchableOpacity>
                        <Text style={styles.buttonTitle}>Oui</Text>
                    </TouchableOpacity>
                </View>
                <View style={styleSpeNo}>
                    <TouchableOpacity>
                        <Text style={styles.buttonTitle}>Non</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container_alim_description}>
                    <Text style={styles.input}>
                        {guest.SpeAlimDescription}
                    </Text>
            </View>
            </View>
            <View style={styles.container_buttonSupp}>
                <TouchableOpacity
                    style={styles.buttonSupp}
                    onPress={() => this.suppGuest()}
                    >
                    <Text style={styles.buttonTitleSupp}>Supprimer</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    )
  }
}

export default GuestDetailScreen