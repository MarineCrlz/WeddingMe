import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

class CustomerDetailScreen extends React.Component {

  constructor(props) {
    super(props)
    //Ici nous n'avons PAS besoin que ces donnees soient dans le state
    //Car elles n'affectent PAS l'affichage, donc inutile de faire le
    //setState et relancer le render à chaque fois
    //On les met donc en prop
    this.adresse = this.props.route.params.customer.Adresse,
    this.mail = this.props.route.params.customer.Email,
    this.nom = this.props.route.params.customer.Nom,
    this.entreprise = this.props.route.params.customer.NomEntreprise,
    this.portable = this.props.route.params.customer.Portable,
    this.prenom = this.props.route.params.customer.Prenom,
    this.description = this.props.route.params.customer.Description,
    this.customerId = this.props.route.params.customer.id,

    //Nouvelles donnees recueillies
    this._adresse = ""
    this._mail = ""
    this._nom = ""
    this._entreprise = ""
    this._portable = ""
    this._prenom = ""
    this._description = ""
    this.state = {
        user : "",
        categorie : this.props.route.params.customer.Categorie,
    }
  }

  //Fonctions setter
    setDescription(data){
        this.description = data
    }

    setAdresse(data){
        this.adresse = data
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

    setMail(data){ 
        this.mail = data
    }

    setNom(data){ 
        this.nom = data
    }

    setEntreprise(data){ 
        this.entreprise = data
    }

    setPortable(data){ 
        this.portable = data
    }

    setPrenom(data){ 
        this.prenom = data
    }

    //Fonctions setter utilisées pour les boutons
    onCategoryPress(data){
        this.setCategorie(data)
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
  updateDataCustomer(){
    var newAdresse = this.adresse
    var newMail= this.mail
    var newNom= this.nom
    var newEntreprise= this.entreprise
    var newPortable= this.portable
    var newPrenom= this.prenom
    var newDescription = this.description
    //on n'envoie que les éléments modifiés par l'utilisateur
      if (this._adresse != "")
      {
        newAdresse = this._adresse
      }
      if (this._mail != "")
      {
        newMail = this._mail
      }
      if (this._nom != "")
      {
        newNom = this._nom
      }
      if (this._entreprise != "")
      {
        newEntreprise = this._entreprise
      }
      if (this._portable != "")
      {
        newPortable = this._portable
      }
      if (this._prenom != "")
      {
        newPrenom = this._prenom
      }
      if (this._description != "")
      {
        newDescription = this._description
      }
    //fonction de modification
    this.updateCustomer(newAdresse, newMail, newNom, newEntreprise, newPortable, newPrenom, newDescription)
  }

  //Fonction de modification de la dépense
  //Requêtes No-SQL envoyées à la BDD Firestore
  updateCustomer(adresse, mail, nom, entreprise, portable, prenom, description){
      firebase.
        firestore()
            .collection('customer')
            .doc(this.props.route.params.customer.id)
            .update({
                Adresse : adresse,
                Categorie : this.state.categorie,
                Description : description,
                Email : mail,
                Nom : nom,
                NomEntreprise : entreprise,
                Portable : portable,
                Prenom : prenom,
                IdUser : this.props.route.params.customer.idUser
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
  suppCustomer(){
    firebase.
        firestore()
        .collection('customer')
        .doc(this.props.route.params.customer.id)
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
    console.log("Affichage props")
    console.log(this.props)
  }

  render() {

    //Chargement des différents styles (nécessaire pour avoir un style défini quelque soit la valeur de la variable)

      const styleChosen = styles.touchable_chosen
      const styleNotChosen = styles.touchable

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
                    <Text style={styles.titre}>Identité du prestataire</Text>
                </View>
                <View style={styles.container_input}>
                    <View style={styles.container_input_image}>
                        <Image
                        style={styles.image}
                        source={require('../../../assets/name.png')}
                        />
                        <TextInput
                        style={styles.input}
                        placeholder= {this.nom}
                        placeholderTextColor="#aaaaaa"                    
                        onChangeText={(text) => this.setNom(text)}
                        value={this.state.nom}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    </View>
                    <View style={styles.container_input_image}>
                        <Image
                        source={require('../../../assets/name.png')}
                        style={styles.image}
                        />
                        <TextInput
                        style={styles.input}
                        placeholder= {this.prenom}
                        placeholderTextColor="#aaaaaa"                    
                        onChangeText={(text) => this.setPrenom(text)}
                        value={this.state.prenom}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    </View>
                    <View style={styles.container_input_image}>
                        <Image
                            source={require('../../../assets/entreprise.png')}
                            style={styles.image}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder= {this.entreprise}
                            placeholderTextColor="#aaaaaa"                    
                            onChangeText={(text) => this.setEntreprise(text)}
                            value={this.state.entreprise}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>
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
            <View style={styles.container_identity}>
                <View style={styles.container_titre}>
                    <Text style={styles.titre}>Contact</Text>
                </View>
                <View style={styles.container_input}>
                    <View style={styles.container_input_image}>
                        <Image
                            source={require('../../../assets/mail.png')}
                            style={styles.image}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder= {this.mail}
                            placeholderTextColor="#aaaaaa"                    
                            onChangeText={(text) => this.setMail(text)}
                            value={this.state.mail}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.container_input_image}>
                        <Image
                            source={require('../../../assets/phone.png')}
                            style={styles.image}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder= {this.portable}
                            placeholderTextColor="#aaaaaa"                    
                            onChangeText={(text) => this.setPortable(text)}
                            value={this.state.portable}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.container_input_image}>
                        <Image
                            source={require('../../../assets/location.png')}
                            style={styles.image}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder= {this.adresse}
                            placeholderTextColor="#aaaaaa"                    
                            onChangeText={(text) => this.setAdresse(text)}
                            value={this.state.adresse}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>
                </View>
            </View>
            <View style={styles.container_alim}>
                <View style={styles.container_titre}>
                    <Text style={styles.titre}>Détails de la prestation</Text>
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
                    onPress={() => this.updateDataCustomer()}
                    >
                    <Text style={styles.buttonTitleUpSupp}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonSupp}
                    onPress={() => this.suppCustomer()}
                    >
                    <Text style={styles.buttonTitleUpSupp}>Supprimer</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    )
  }
}

export default CustomerDetailScreen