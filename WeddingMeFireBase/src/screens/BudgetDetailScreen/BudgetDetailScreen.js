import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

class BudgetDetailScreen extends React.Component {

  constructor(props) {
    super(props)
    //Ici nous n'avons PAS besoin que ces donnees soient dans le state
    //Car elles n'affectent PAS l'affichage, donc inutile de faire le
    //setState et relancer le render à chaque fois
    //On les met donc en prop
    this.intitule = this.props.route.params.budget.Intitule,
    this.prix = this.props.route.params.budget.Prix.toString(),
    this.description = this.props.route.params.budget.Description,
    this.userId = this.props.route.params.budget.IdUser,
    this.budgetId = this.props.route.params.budget.id,

    //Nouvelles donnees recueillies
    this._intitule = ""
    this._prix = 0
    this._description = ""
    this.state = {
        user : "",
        categorie : this.props.route.params.budget.Categorie,
        etat : this.props.route.params.budget.Etat,
    }
  }

  //Fonctions setter
    setDescription(data){
        this.description = data
    }

    setIntitule(data){
        this.intitule = data
    }

    setEtat(data){
        this.setState({etat : data})
    }

    setUser(data){
        this.setState({user : data})
    }

    setUserId(data){
        this.setState({userId : data})
    }

    setCategorie(data){
        this.setState({categorie : data})
    }

    setPrix(data){ 
        this.prix = data
    }

    //Fonctions setter utilisées pour les boutons
    onCategoryPress(data){
        this.setCategorie(data)
    }

    onAgePress(data){
        this.setAge(data)
    }

    onStatePress(data){
        this.setEtat(data)
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

  //Fonction de modification de la dépense
  //Recuperation des éléments à modifier
  //puis Requêtes No-SQL envoyées à la BDD Firestore
  updateDataBudget(){
    var newIntitule = this.intitule
    var newPrix = this.prix
    var newDescription = this.description
    //on n'envoie que les éléments modifiés par l'utilisateur
      if (this._intitule != "")
      {
        newIntitule = this._intitule
      }
      if (this._prix != "")
      {
        convert = parseInt(this._prix)
        newPrix = convert
      }
      if (this._description != "")
      {
        newDescription = this._description
      }
    //fonction de modification
    this.updateBudget(newIntitule, newPrix, newDescription)
  }

  //Fonction de modification de la dépense
  //Requêtes No-SQL envoyées à la BDD Firestore
  updateBudget(intitule, prix, description){
      firebase.
        firestore()
            .collection('budget')
            .doc(this.props.route.params.budget.id)
            .update({
                Prix : prix,
                Intitule : intitule,
                Categorie : this.state.categorie,
                Description : description,
                Etat : this.state.etat,
                IdUser : this.props.route.params.budget.IdUser

            })
            .then(() => {
                this.props.navigation.goBack();
                console.log("Document successfully updated!");
                
            }).catch((error) => {
                console.error("Error updating document: ", error);
            });
  }

  //Fonction de suppression de la dépense
  //Requêtes No-SQL envoyées à la BDD Firestore
  suppBudget(){
    firebase.
        firestore()
        .collection('budget')
        .doc(this.props.route.params.budget.id)
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

    //Chargement des différents styles (nécessaire pour avoir un style défini quelque soit la valeur de la variable)

      const styleChosen = styles.touchable_chosen
      const styleNotChosen = styles.touchable

      //Affichage différencié de l'état
      const StateDone = (this.state.etat == "Paye")
      const StateLoad = (this.state.etat == "En cours")
      const StateWarning = (this.state.etat == "A faire")
      
      let styleDone = StateDone ? styleChosen : styleNotChosen
      let styleLoad = StateLoad ? styleChosen : styleNotChosen
      let styleWarning = StateWarning ? styleChosen : styleNotChosen

      //Affichage différencié de la catégorie
      const CategorieLieux = (this.state.categorie == "Lieux")
      const CategorieAnimation = (this.state.categorie == "Animation")
      const CategorieRepas = (this.state.categorie == "Repas")
      const CategorieTenue = (this.state.categorie == "Tenue")
      const CategorieDecoration = (this.state.categorie == "Decoration")
      const CategorieOrganisation = (this.state.categorie == "Organisation")
      const CategorieAutre = (this.state.categorie == "Autre")

      let styleLieux = CategorieLieux ? styleChosen : styleNotChosen
      let styleAnimation = CategorieAnimation ? styleChosen : styleNotChosen
      let styleRepas = CategorieRepas ? styleChosen : styleNotChosen
      let styleTenue = CategorieTenue ? styleChosen : styleNotChosen
      let styleDecoration = CategorieDecoration ? styleChosen : styleNotChosen
      let styleOrganisation = CategorieOrganisation ? styleChosen : styleNotChosen
      let styleAutre = CategorieAutre ? styleChosen : styleNotChosen

    return (
        <View style={styles.main_container}>
            <ScrollView style={styles.main_scroll}>
            <View style={styles.container_identity}>
                <View style={styles.container_titre}>
                    <Text style={styles.titre}>Intitule de la dépense</Text>
                </View>
                <View style={styles.container_input}>
                    <TextInput
                        style={styles.input}
                        placeholder= {this.intitule}
                        placeholderTextColor="#aaaaaa"                    
                        onChangeText={(text) => this.setIntitule(text)}
                        value={this.state.intitule}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>
            </View>
            <View style={styles.container_category}>
                <View style={styles.container_titre}>
                    <Text style={styles.titre}>Catégorie</Text>
                </View>
                <View style={styles.container_category_choice}>
                    <View style={styleLieux}>
                        <TouchableOpacity
                            onPress={() => this.onCategoryPress("Lieux")}>
                            <Text style={styles.buttonTitle}>Lieux</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styleRepas}>
                            <TouchableOpacity
                                onPress={() => this.onCategoryPress("Repas")}>
                                <Text style={styles.buttonTitle}>Repas</Text>
                            </TouchableOpacity>
                    </View>
                    <View style={styleAnimation}>
                        <TouchableOpacity
                            onPress={() => this.onCategoryPress("Animation")}>
                            <Text style={styles.buttonTitle}>Animation</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styleTenue}>
                        <TouchableOpacity
                            onPress={() => this.onCategoryPress("Tenue")}>
                            <Text style={styles.buttonTitle}>Tenue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container_category_choice}>
                    <View style={styleDecoration}>
                        <TouchableOpacity
                            onPress={() => this.onCategoryPress("Decoration")}>
                            <Text style={styles.buttonTitle}>Décoration</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styleOrganisation}>
                        <TouchableOpacity
                            onPress={() => this.onCategoryPress("Organisation")}>
                            <Text style={styles.buttonTitle}>Organisation</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styleAutre}>
                        <TouchableOpacity
                            onPress={() => this.onCategoryPress("Autre")}>
                            <Text style={styles.buttonTitle}>Autre</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.container_invitation}>
                <View style={styles.container_titre}>
                    <Text style={styles.titre}>Etat</Text>
                </View>
                <View style={styles.container_category_choice}>
                    <View style={styleDone}>
                        <TouchableOpacity
                            onPress={() => this.onStatePress("Paye")}>
                            <Text style={styles.buttonTitle}>Payé</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styleLoad}>
                        <TouchableOpacity
                            onPress={() => this.onStatePress("En cours")}>
                            <Text style={styles.buttonTitle}>En cours</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styleWarning}>
                        <TouchableOpacity
                            onPress={() => this.onStatePress("A faire")}
                            >
                            <Text style={styles.buttonTitle}>A payer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.container_alim}>
                <View style={styles.container_titre}>
                    <Text style={styles.titre}>Prix de la dépense</Text>
                </View>
                <View style={styles.container_alim_description}>
                    <TextInput
                            style={styles.input}
                            placeholder={this.prix}
                            placeholderTextColor="#aaaaaa"                    
                            onChangeText={(text) => this.setPrix(text)}
                            value={this.state.prix}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                </View>
            </View>
            <View style={styles.container_alim}>
                <View style={styles.container_titre}>
                    <Text style={styles.titre}>Détails de la dépense</Text>
                </View>
                <View style={styles.container_alim_description}>
                    <TextInput
                                style={styles.input}
                                placeholder= {this.description}
                                placeholderTextColor="#aaaaaa"                    
                                onChangeText={(text) => this.setDescription(text)}
                                value={this.state.description}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                </View>
            </View>
            <View style={styles.container_button}>
                <TouchableOpacity
                    style={styles.buttonUpdate}
                    onPress={() => this.updateDataBudget()}
                    >
                    <Text style={styles.buttonTitleUpSupp}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonSupp}
                    onPress={() => this.suppBudget()}
                    >
                    <Text style={styles.buttonTitleUpSupp}>Supprimer</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    )
  }
}

export default BudgetDetailScreen