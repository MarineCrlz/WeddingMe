import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

class BudgetAddScreen extends React.Component {

  constructor(props) {
    super(props)
    //Ici nous n'avons PAS besoin que ces donnees soient dans le state
    //Car elles n'affectent PAS l'affichage, donc inutile de faire le
    //setState et relancer le render à chaque fois
    //On les met donc en prop
    this.intitule = "",
    this.prix = 0,
    this.description = "",
    this.state = {
        user : "",
        userId: "",
        categorie : "",
        etat : "",
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

    //Fonction qui permet l'ajout du budget dans la BDD
    //Requêtes No-SQL envoyées à la BDD Firestore
    addBudget(){
        firebase.
            firestore()
            .collection('budget')
            .add(
                {
                    Categorie : this.state.categorie,
                    Description : this.description,
                    Etat : this.state.etat,
                    IdUser : this.state.userId,
                    Intitule : this.intitule,
                    Prix : this.prix,
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

      //Mise en place de variables pour savoir quel style afficher
      const StateDone = (this.state.etat == "Paye")
      const StateLoad = (this.state.etat == "En cours")
      const StateWarning = (this.state.etat == "A faire")
      
      //Condition pour l'affichage
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
            <ScrollView>
            <View style={styles.container_identity}>
                <View style={styles.container_titre}>
                    <Text style={styles.titre}>Intitule de la dépense</Text>
                </View>
                <View style={styles.container_input}>
                    <TextInput
                        style={styles.input}
                        placeholder='Intitule'
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
                            onPress={() => this.onStatePress("A faire")}>
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
                            placeholder='Prix'
                            placeholderTextColor="#aaaaaa"                    
                            onChangeText={(text) => this.setPrix(text)}
                            value={this.prix}
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
                    onPress={() => this.addBudget()}
                    >
                    <Text style={styles.buttonTitle}>Ajouter</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    )
  }
}

export default BudgetAddScreen