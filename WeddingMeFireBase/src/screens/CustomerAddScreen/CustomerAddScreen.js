import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

class CustomerAddScreen extends React.Component {

  constructor(props) {
    super(props)
    //Ici nous n'avons PAS besoin que ces donnees soient dans le state
    //Car elles n'affectent PAS l'affichage, donc inutile de faire le
    //setState et relancer le render à chaque fois
    //On les met donc en prop
    this.adresse = "",
    this.mail = "",
    this.nom = "",
    this.entreprise = "",
    this.portable = "",
    this.prenom = "",
    this.description = "",
    this.state = {
        user : "",
        userId: "",
        categorie : "",
    }
  }

  //Fonctions setter
    setDescription(data){
        this.description = data
    }

    setAdresse(data){
        this.adresse = data
    }

    setMail(data){
        this.mail = data
    }

    setNom(data){ 
        this.nom = data
    }

    setPrenom(data){ 
        this.prenom = data
    }

    setPortable(data){ 
        this.portable = data
    }

    setEntreprise(data){ 
        this.entreprise = data
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

    //Fonctions setter utilisées pour les boutons
    onCategoryPress(data){
        //actualise la valeur de la categorie
        this.setCategorie(data)
    }

    onAgePress(data){
        //actualise la valeur de l'age
        this.setAge(data)
    }

    onStatePress(data){
        //actualise la valeur de l'etat
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
                
                //On gère le cas où le nom du partner n'est pas saisi
                //en faisant un affichage différencié
                if (user.partner == "")
                {
                    const text = "La moitié de "
                    this.setPartner(text + user.fullName)
                }
            }
        });
  }

    //Fonction qui permet l'ajout du prestataire dans la BDD
    //Requêtes No-SQL envoyées à la BDD Firestore
    addCustomer(){
        firebase.
            firestore()
            .collection('customer')
            .add(
                {
                    Adresse : this.adresse,
                    Categorie : this.state.categorie,
                    Description : this.description,
                    Email : this.mail,
                    Nom : this.nom,
                    NomEntreprise : this.entreprise,
                    Portable : this.portable,
                    Prenom : this.prenom,
                    idUser : this.state.userId

                    //Ancien code
                    // Categorie : this.state.categorie,
                    // Description : this.description,
                    // Etat : this.state.etat,
                    // IdUser : this.state.userId,
                    // Intitule : this.intitule,
                    // Prix : this.prix,
                }
            )
    }
    
    //Fonction automatiquement lancée à l'ouverture du screen
    componentDidMount(){
        //Appel le chargement des données de l'user actuel
        this.fetchUser()
    }

  render() {
    //Chargement des différents styles (nécessaire pour avoir un style défini quelque soit la valeur de la variable)

    //Stockage des différents styles
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
            <ScrollView>
            <View style={styles.container_identity}>
                <View style={styles.container_titre}>
                    <Text style={styles.titre}>Indentité du prestataire</Text>
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
                    <TextInput
                        style={styles.input}
                        placeholder='Entreprise'
                        placeholderTextColor="#aaaaaa"                    
                        onChangeText={(text) => this.setEntreprise(text)}
                        value={this.state.entreprise}
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
                            onPress={() => this.onCategoryPress("Lieux")}
                            >
                            <Text style={styles.buttonTitle}>Lieux</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styleRepas}>
                            <TouchableOpacity
                                onPress={() => this.onCategoryPress("Repas")}
                                >
                                <Text style={styles.buttonTitle}>Repas</Text>
                            </TouchableOpacity>
                    </View>
                    <View style={styleAnimation}>
                        <TouchableOpacity
                            onPress={() => this.onCategoryPress("Animation")}
                            >
                            <Text style={styles.buttonTitle}>Animation</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styleTenue}>
                        <TouchableOpacity
                            onPress={() => this.onCategoryPress("Tenue")}
                            >
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
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        placeholderTextColor="#aaaaaa"                    
                        onChangeText={(text) => this.setMail(text)}
                        value={this.state.mail}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Portable'
                        placeholderTextColor="#aaaaaa"                    
                        onChangeText={(text) => this.setPortable(text)}
                        value={this.state.portable}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Adresse'
                        placeholderTextColor="#aaaaaa"                    
                        onChangeText={(text) => this.setAdresse(text)}
                        value={this.state.adresse}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>
            </View>
            <View style={styles.container_alim}>
                <View style={styles.container_titre}>
                    <Text style={styles.titre}>Détails de la prestation</Text>
                </View>
                <View style={styles.container_alim_description}>
                    <TextInput
                                style={styles.input}
                                placeholder='Description'
                                placeholderTextColor="#aaaaaa"                    
                                onChangeText={(text) => this.setDescription(text)}
                                value={this.state.description}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                </View>
            </View>
            <View style={styles.container_buttonAdd}>
                <TouchableOpacity
                    style={styles.buttonAdd}
                    onPress={() => this.addCustomer()}
                    >
                    <Text style={styles.buttonTitle}>Ajouter</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    )
  }
}

export default CustomerAddScreen