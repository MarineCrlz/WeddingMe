import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import GuestItem from '../../../components/GuestItem/GuestItem';
import CustomerItem from '../../../components/CustomerItem/CustomerItem';


class CustomerScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        userId : '',
        user : '',
        partnerAffichage : "Invités de sa moitié",
        customer: [],
    }
  }

  //Fonction navigation
  onAddCustomer(){
      //Envoi sur la page d'ajout d'un invité via le StackNavigator
      this.props.navigation.navigate("Ajouter un prestataire", {user : this.state.userId , navigation : this.props.navigation})
  }

  //Fonctions setter
  setFilter(data){
      this.setState({filter : data})
  }

  setCustomer(data){
      this.setState({customer : data})
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

                //Une fois le user chargé, on peut aller chercher les prestataires correspondant
                this.loadCustomer()
            }
        });
  }

  //Fonction qui permet de charger les invités
  //Requêtes No-SQL envoyées à la BDD Firestore
  loadCustomer(){
      firebase.
        firestore()
        .collection('customer')
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
            this.setCustomer(newEntities)
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
            <Text style={styles.title}>Mes Prestataires</Text>
        </View>
        <View style={styles.main_touchable}>
            <View style={styles.flatlist}>
            <ScrollView>
                <View style={styles.container_title_customer}>
                  <Text style={styles.title_customer}>Lieux</Text>
                </View>
                <FlatList
                data={this.state.customer.filter(customer => customer.Categorie == "Lieux")}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <CustomerItem customer={item} navigation = {navigation}/>}
                />

                <View style={styles.container_title_customer}>
                  <Text style={styles.title_customer}>Repas</Text>
                </View>
                <FlatList
                data={this.state.customer.filter(customer => customer.Categorie == "Repas")}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <CustomerItem customer={item} navigation = {navigation}/>}
                />

                <View style={styles.container_title_customer}>
                  <Text style={styles.title_customer}>Tenues</Text>
                </View>
                <FlatList
                data={this.state.customer.filter(customer => customer.Categorie == "Tenue")}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <CustomerItem customer={item} navigation = {navigation}/>}
                />

                <View style={styles.container_title_customer}>
                  <Text style={styles.title_customer}>Décoration</Text>
                </View>
                <FlatList
                data={this.state.customer.filter(customer => customer.Categorie == "Decoration")}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <CustomerItem customer={item} navigation = {navigation}/>}
                />

                <View style={styles.container_title_customer}>
                  <Text style={styles.title_customer}>Animation</Text>
                </View>
                <FlatList
                data={this.state.customer.filter(customer => customer.Categorie == "Animation")}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <CustomerItem customer={item} navigation = {navigation}/>}
                />

                <View style={styles.container_title_customer}>
                  <Text style={styles.title_customer}>Organisation</Text>
                </View>
                <FlatList
                data={this.state.customer.filter(customer => customer.Categorie == "Organisation")}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <CustomerItem customer={item} navigation = {navigation}/>}
                />

                <View style={styles.container_title_customer}>
                  <Text style={styles.title_customer}>Autres</Text>
                </View>
                <FlatList
                data={this.state.customer.filter(customer => customer.Categorie == "Autre")}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <CustomerItem customer={item} navigation = {navigation}/>}
                />
            </ScrollView>
            </View>
        </View>
        <View style={styles.container_button}>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => this.onAddCustomer()}>
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

export default CustomerScreen