import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import GuestItem from '../../../components/GuestItem/GuestItem';

class GuestScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        userId : '',
        user : '',
        partnerAffichage : "Invités de sa moitié",
        guest: [],
        guestFilter: [],
        guestUser: [],
        guestPartner: [],
        guestBoth : [],
        filter : ""
    }
  }

  //Fonction navigation
  onAddGuest(){
      //Envoi sur la page d'ajout d'un invité via le StackNavigator
      this.props.navigation.navigate("Ajouter un invité", {user : this.state.userId , navigation : this.props.navigation})
  }

  //Fonctions setter
  setFilter(data){
      this.setState({filter : data})
  }

  setGuest(data){
      this.setState({guest : data})
  }

  setGuestFilter(data){
    this.setState({guestFilter : data})
    }

    setGuestUser(data){
        this.setState({guestUser : data})
    }

    setGuestPartner(data){
        this.setState({guestPartner : data})
    }

    setGuestBoth(data){
        this.setState({guestBoth : data})
    }

    setUserId(data){
      this.setState({userId : data})
  }

  setUser(data){
      this.setState({user : data})
  }

  setPartnerAffichage(data){
    this.setState({partnerAffichage : data})
}

  //Fonction qui permet de filtrer les invités affichés 
  //en fonction de la catégorie (filtre) sélectionnée
  useFilter(filter){
    //On filtre
    const newGuestFilter = this.state.guest.filter(guest => guest.Categorie == filter)
    //On actualise le tableau des invités filtrés
    this.setGuestFilter(newGuestFilter)
    //On appelle la fonction d'affichage (user, partner, couple)
    this.useCoupleFilter(newGuestFilter)
  }

  //Fonction qui permet de filter les invités affichés dans chaque
  //catégorie (Invités par l'utilisateur, son partenaire ou le couple)
  //à partir des invités filtrés par catégorie (tous, travail, famille...)
  useCoupleFilter(data){
      //On filtre les invités de l'utilisateur
      const newGuestUser = data.filter(guest => guest.Affiliation == this.state.user.fullName)
      //On actualise les données
      this.setGuestUser(newGuestUser)

      //On filtre les invités de son partenaire
      //Et on prend en compte le cas où la saisie d'un ou des invités serait faite 
      //avant ou après modification des données sur le partner (donc risque de cas
      //où des invités ont "" ou un prenom dans le champ partner)
      const newGuestPartner = data.filter(guest => guest.Affiliation == this.state.user.partner || guest.Affiliation == "")
      //On actualise les données
      this.setGuestPartner(newGuestPartner)

      //On filtre les invités du couple
      const newGuestBoth = data.filter(guest => guest.Affiliation == "couple")
      //On actualise les données
      this.setGuestBoth(newGuestBoth)
  }

  //Fonction qui permet d'activer les différents filtres
  displayedGuest(filter){
    //Mise à jour des données
    this.setFilter(filter) 
    //Cas où l'utilisateur veut une catégorie précise
    if(filter != "all")
    {
      //On utilise la fonction de filtrage complète
      this.useFilter(filter)
    }
    if(filter == "all")
    {
        //On récupère l'ensemble des invités de l'utilisateur, non filtrés
        //qui étaient stockées
        this.useCoupleFilter(this.state.guest)
        //On applique le filtre d'affichage sur ces données
        this.setGuestFilter(this.state.guest)
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

                //Une fois le user chargé, on peut aller chercher les guests correspondant
                this.loadGuest()
                //Et aller actualisé les données d'affichage
                if(this.state.user.partner != ""){
                  const data = "Invités de " + this.state.user.partner
                  this.setPartnerAffichage(data)
                }
            }
        });
  }

  //Fonction qui permet de charger les invités
  //Requêtes No-SQL envoyées à la BDD Firestore
  loadGuest(){
      firebase.
        firestore()
        .collection('guest')
        .where("idUser", "==", this.state.userId)
        .onSnapshot(
            (querySnapshot) => {
                const newEntities = []
                querySnapshot.forEach(doc => {
                    const entity = doc.data()
                    entity.id = doc.id
                    newEntities.push(entity)
                });
            //On stocke tous les invités dans le state
            //Permet de toujours avoir une sauvegarde non filtrée
            this.setGuest(newEntities)
            //On stocke cette liste dans le state guest filter (sera modifié ensuite)
            this.setGuestFilter(newEntities)
            //On va différencier les invités du couple, de l'user et de son partenaire dans l'affichage
            this.useCoupleFilter(this.state.guestFilter)
            },
        error => {
            console.log(error)
        }
        )
  }

  //Fonction automatiquement lancée à l'ouverture du screen
  componentDidMount(){
    //Appel le chargement des données de l'user actuel
    this.fetchUser()
  }

  render() {

    //Recuperation des données pour faciliter les appels
    const navigation = this.props.navigation

    return (
      <View style={styles.main_container}>
        <View style={styles.main_text}>
            <Text style={styles.title}>Mes Invites</Text>
        </View>
        <View style={styles.container_choice}>
            <View style={styles.container_choice_done}>
              <TouchableOpacity onPress = {() => this.displayedGuest("all")}>
                  <Text style={styles.text}> Tous</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.container_choice_done}>
              <TouchableOpacity onPress = {() => this.displayedGuest("Famille")}>
                  <Text style={styles.text}> Famille </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.container_choice_done}>
              <TouchableOpacity onPress = {() => this.displayedGuest("Amis")}>
                  <Text style={styles.text}> Amis </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.container_choice_done}>
              <TouchableOpacity onPress = {() => this.displayedGuest("Travail")}>
                  <Text style={styles.text}> Travail </Text>
              </TouchableOpacity>
            </View>
        </View>
        <View style={styles.main_touchable}>
            <View style={styles.flatlist}>
            <ScrollView>
                <View style={styles.container_title_guest}>
                  <Text style={styles.title_guest}>Invités de {this.state.user.fullName}</Text>
                </View>
                <FlatList
                data={this.state.guestUser}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <GuestItem todo={item} navigation = {navigation}/>}
                />

                <View style={styles.container_title_guest}>
                  <Text style={styles.title_guest}>{this.state.partnerAffichage}</Text>
                </View>
                <FlatList
                data={this.state.guestPartner}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <GuestItem todo={item} navigation = {navigation}/>}
                />

                <View style={styles.container_title_guest}>
                  <Text style={styles.title_guest}>Invités du couple</Text>
                </View>
                <FlatList
                data={this.state.guestBoth}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <GuestItem todo={item} navigation = {navigation}/>}
                />
            </ScrollView>
            </View>
        </View>
        <View style={styles.container_button}>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => this.onAddGuest()}>
              <Image
                  style={styles.image}
                  source={require('../../../assets/add.png')}
                  />
            </TouchableOpacity>

        </View>
      </View>
    )
  }
}

export default GuestScreen