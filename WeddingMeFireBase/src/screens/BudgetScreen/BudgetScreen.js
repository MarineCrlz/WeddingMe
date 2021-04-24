import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import BudgetItem from '../../../components/BudgetItem/BudgetItem';

class BudgetScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        userId : '',
        user : '',
        budget: [],
        budgetEnd: 0,
    }
  }

  //Fonction navigation
  onAddBudget(){
      //Envoi sur la page d'ajout d'une dépense via le StackNavigator
      this.props.navigation.navigate("Ajouter une dépense", {user : this.state.userId , navigation : this.props.navigation})
  }

  //Fonctions setter
  setGuest(data){
      this.setState({guest : data})
  }

    setBudget(data){
        this.setState({budget : data})
    }
  
  setBudgetEnd(data){
      this.setState({budgetEnd : data})
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

                //Une fois le user chargé
                //on peut aller chercher ses dépenses
                this.loadTaskBudget()
                //Et aller actualiser les données d'affichage

                //Affichage différencié si le prénom du partenaire n'a pas été renseigné
                if(this.state.user.partner != ""){
                  const data = "Invités de " + this.state.user.partner
                  this.setPartnerAffichage(data)
                }
            }
        });
  }

  //Fonction qui permet de charger le budget
  //Requêtes No-SQL envoyées à la BDD Firestore
  loadTaskBudget(){
      firebase.
        firestore()
        .collection('budget')
        .where("IdUser", "==", this.state.userId)
        .onSnapshot(
            (querySnapshot) => {
                const newEntities = []
                querySnapshot.forEach(doc => {
                    const entity = doc.data()
                    entity.id = doc.id
                    newEntities.push(entity)
                });
            //On stocke les dépenses (éléments) du budget dans le state
            this.setBudget(newEntities)
            var budgetEnd = this.findBudgetEnd(newEntities)
            this.setBudgetEnd(budgetEnd)
            },
        error => {
            console.log(error)
        }
        )
  }

  //Fonction qui calcule le budget restant
  //a partir du budget initial renseigné par l'utilisateur
  //et la somme des dépenses prévues dans son budget
  //Le budget étant par défaut à 0, le résultat peut alors être négatif
  findBudgetEnd(data){
    var budgetEnd = this.state.user.budget
    data.forEach(item =>
      {
        budgetEnd = budgetEnd - item.Prix
      })
    return (budgetEnd)
  }

  //Fonction automatiquement lancée à l'ouverture du screen
  componentDidMount(){
    //Appel le chargement des données de l'user actuel
    this.fetchUser()
  }

  render() {

    //Recuperation des données pour faciliter les appels
    const navigation = this.props.navigation

    //Gestion de l'affichage des données
    var affichageBudget = "Budget total : " + this.state.user.budget + " €"
    var affichageBudgetEnd = "Budget restant : " + this.state.budgetEnd + " €"
    //Différenciation de l'affichage si le budget n'a pas été spécifié
    if(this.state.user.budget == "" | this.state.user.budget == 0)
    {
      var affichageBudget = "Budget total : non défini"
      var affichageBudgetEnd = "Budget nécessaire : " + this.state.budgetEnd*(-1) + " €"
    }

    return (
      <View style={styles.main_container}>
        <View style={styles.main_text}>
            <Text style={styles.title}>Mon Budget</Text>
        </View>
        <View style={styles.main_budget}>
          <View style={styles.budget_detail}>
            <Text style={styles.title_budget}>{affichageBudget}</Text>
          </View>
          <View style={styles.budget_detail}>
            <Text style={styles.title_budget}>{affichageBudgetEnd}</Text>
          </View>
        </View>
        <View style={styles.main_touchable}>
            <View style={styles.flatlist}>
            <ScrollView>
                <View style={styles.container_title_guest}>
                  <Text style={styles.title_guest}>Lieux</Text>
                </View>
                <FlatList
                data={this.state.budget.filter(budget => budget.Categorie == "Lieux")}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <BudgetItem budget={item} navigation = {navigation}/>}
                />

                <View style={styles.container_title_guest}>
                  <Text style={styles.title_guest}>Repas</Text>
                </View>
                <FlatList
                data={this.state.budget.filter(budget => budget.Categorie == "Repas")}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <BudgetItem budget={item} navigation = {navigation}/>}
                />

                <View style={styles.container_title_guest}>
                  <Text style={styles.title_guest}>Tenues</Text>
                </View>
                <FlatList
                data={this.state.budget.filter(budget => budget.Categorie == "Tenues")}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <BudgetItem budget={item} navigation = {navigation}/>}
                />

                <View style={styles.container_title_guest}>
                  <Text style={styles.title_guest}>Décoration</Text>
                </View>
                <FlatList
                data={this.state.budget.filter(budget => budget.Categorie == "Décoration")}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <BudgetItem budget={item} navigation = {navigation}/>}
                />

                <View style={styles.container_title_guest}>
                  <Text style={styles.title_guest}>Animation</Text>
                </View>
                <FlatList
                data={this.state.budget.filter(budget => budget.Categorie == "Animation")}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <BudgetItem budget={item} navigation = {navigation}/>}
                />

                <View style={styles.container_title_guest}>
                  <Text style={styles.title_guest}>Organisation</Text>
                </View>
                <FlatList
                data={this.state.budget.filter(budget => budget.Categorie == "Organisation")}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <BudgetItem budget={item} navigation = {navigation}/>}
                />

                <View style={styles.container_title_guest}>
                  <Text style={styles.title_guest}>Lune de miel</Text>
                </View>
                <FlatList
                data={this.state.budget.filter(budget => budget.Categorie == "Lune de miel")}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <BudgetItem budget={item} navigation = {navigation}/>}
                />

                <View style={styles.container_title_guest}>
                  <Text style={styles.title_guest}>Autres</Text>
                </View>
                <FlatList
                data={this.state.budget.filter(budget => budget.Categorie == "Autres")}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <BudgetItem budget={item} navigation = {navigation}/>}
                />
            </ScrollView>
            </View>
        </View>
        <View style={styles.container_button}>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => this.onAddBudget()}>
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

export default BudgetScreen