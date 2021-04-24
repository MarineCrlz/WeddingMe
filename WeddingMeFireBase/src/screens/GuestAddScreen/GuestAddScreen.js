import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

class GuestAddScreen extends React.Component {

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
        user : "",
        userId: "",
        categorie : "",
        invitation : "init", //initialisation pour différencier du cas où le partenaire n'est pas saisi
        speAlim : false,
        age : "",
        partner: "",
    }
  }

  //Fonctions setter
  setUser(data){
    this.setState({user : data})
    }

    setUserId(data){
        this.setState({userId : data})
    }

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

    setInvitation(data){
        this.setState({invitation : data})
    }
    
    setAge(data){
        this.setState({age : data})
    }

    setPartner(data){
        this.setState({partner : data})
    }

    //Fonction setter utilisées pour les boutons
    onCategoryPress(data){
        //actualise la valeur de la categorie
        this.setCategorie(data)
    }

    onAgePress(data){
        //actualise la valeur de la categorie
        this.setAge(data)
    }

  onInvitationPress(data){
        //actualise la valeur de l'affiliation
        if (data == "user")
        {
            this.setInvitation(this.state.user.fullName)
        }
        if (data == "partner")
        {
            this.setInvitation(this.state.user.partner)
        }
        if (data == "couple")
        {
            this.setInvitation("couple")
        }
    }

    onAlimPress(data){
        //actualise la valeur des specifications alimentaires
        if (data == true)
        {
            this.setSpeAlim(true)
        }
        if (data == false)
        {
            this.setSpeAlim(false)
        }
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
            }
        });
  }

    //Fonction qui permet l'ajout du budget dans la BDD
    //Requêtes No-SQL envoyées à la BDD Firestore
    addGuest(){
        firebase.
            firestore()
            .collection('guest')
            .add(
                {
                    Affiliation : this.state.invitation,
                    Age : this.state.age,
                    Categorie : this.state.categorie,
                    Nom : this.nom,
                    Prenom : this.prenom,
                    SpeAlim : this.state.speAlim,
                    SpeAlimDescription : this.speAlimDescription,
                    idUser : this.state.userId
                }
            )
            .then(() => {
                this.props.navigation.goBack();
                console.log("Document successfully add!");
                
            }).catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    //Fonction automatiquement lancée à l'ouverture du screen
    componentDidMount(){
        //Appel le chargement des données de l'user actuel
        this.fetchUser()
      }

  render() {
    //Chargement des visuels (nécessaire pour avoir un style défini quelque soit la valeur de la variable)

    //Stockage des différents styles
      const styleChosen = styles.touchable_chosen
      const styleNotChosen = styles.touchable

    //Mise en place de variables pour savoir quel style afficher
        //pour les specifiations alimentaires
    
      let styleSpeYes = this.state.speAlim ? styleChosen : styleNotChosen
      let styleSpeNo = this.state.speAlim ? styleNotChosen : styleChosen

        //pour l'age
      const AgeEnfant = (this.state.age == "Enfant")
      const AgeAdulte = (this.state.age == "Adulte")
      let styleEnfant = AgeEnfant ? styleChosen : styleNotChosen
      let styleAdulte = AgeAdulte ? styleChosen : styleNotChosen

        //pour la categorie
      const GroupeFamille = (this.state.categorie == "Famille")
      const GroupeAmis = (this.state.categorie == "Amis")
      const GroupeTravail = (this.state.categorie == "Travail")
      let styleFamille = GroupeFamille ? styleChosen : styleNotChosen
      let styleAmis = GroupeAmis ? styleChosen : styleNotChosen
      let styleTravail = GroupeTravail ? styleChosen : styleNotChosen

        //pour l'affiliation
      const InvitUser = (this.state.invitation == this.state.user.fullName)
      const InvitPartner = (this.state.invitation == this.state.user.partner)
      const InvitCouple = (this.state.invitation == "couple")
      let styleUser = InvitUser ? styleChosen : styleNotChosen
      let stylePartner = InvitPartner ? styleChosen : styleNotChosen
      let styleCouple = InvitCouple ? styleChosen : styleNotChosen

      //Recuperation variable
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
                    <TextInput
                        style={styles.input}
                        placeholder='Nom'
                        placeholderTextColor="#aaaaaa"                    
                        onChangeText={(text) => this.setNom(text)}
                        value={this.state.nom}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Prenom'
                        placeholderTextColor="#aaaaaa"                    
                        onChangeText={(text) => this.setPrenom(text)}
                        value={this.state.prenom}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>
            </View>
            <View style={styles.container_age}>
                <View style={styles.container_titre}>
                    <Text style={styles.titre}>Age</Text>
                </View>
                <View style={styles.container_age_choice}>
                    <View style={styleAdulte}>
                        <TouchableOpacity
                            onPress={() => this.onAgePress("Adulte")}>
                            <Text style={styles.buttonTitle}>Adulte</Text>
                        </TouchableOpacity>
                    </View>
                        <View style={styleEnfant}>
                            <TouchableOpacity
                                onPress={() => this.onAgePress("Enfant")}>
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
                        <TouchableOpacity
                            onPress={() => this.onCategoryPress("Famille")}>
                            <Text style={styles.buttonTitle}>Famille</Text>
                        </TouchableOpacity>
                    </View>
                        <View style={styleAmis}>
                            <TouchableOpacity
                                onPress={() => this.onCategoryPress("Amis")}>
                                <Text style={styles.buttonTitle}>Amis</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styleTravail}>
                            <TouchableOpacity
                                onPress={() => this.onCategoryPress("Travail")}>
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
                        <TouchableOpacity
                            onPress={() => this.onInvitationPress("user")}>
                            <Text style={styles.buttonTitle}>{this.state.user.fullName}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={stylePartner}>
                        <TouchableOpacity
                            onPress={() => this.onInvitationPress("partner")}>
                            <Text style={styles.buttonTitle}>{textPartner}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styleCouple}>
                        <TouchableOpacity
                            onPress={() => this.onInvitationPress("couple")}>
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
                    <TouchableOpacity
                        onPress={() => this.onAlimPress(true)}>
                        <Text style={styles.buttonTitle}>Oui</Text>
                    </TouchableOpacity>
                </View>
                <View style={styleSpeNo}>
                    <TouchableOpacity
                        onPress={() => this.onAlimPress(false)}>
                        <Text style={styles.buttonTitle}>Non</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container_alim_description}>
                <TextInput
                            style={styles.input}
                            placeholder='Description'
                            placeholderTextColor="#aaaaaa"                    
                            onChangeText={(text) => this.setSpeAlimDescription(text)}
                            value={this.state.speAlimDescription}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
            </View>
            </View>
            <View style={styles.container_buttonAdd}>
                <TouchableOpacity
                    style={styles.buttonAdd}
                    onPress={() => this.addGuest()}
                    >
                    <Text style={styles.buttonTitle}>Ajouter</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    )
  }
}

export default GuestAddScreen