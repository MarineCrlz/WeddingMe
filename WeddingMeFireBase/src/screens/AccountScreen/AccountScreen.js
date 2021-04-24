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

        // //Pour le stest on le met en sourdine
        this.lieu = this.props.route.params.user.venue,
        this.prenom = this.props.route.params.user.fullName,
        this.partenaire = this.props.route.params.user.partner,
        this.budget = this.props.route.params.user.budget,
        this.date = this.props.route.params.user.date,
        this.mail = this.props.route.params.user.email,

        this._lieu = "",
        this._prenom = "",
        this._partenaire = "",
        this._budget = "",
        this._date = "",
        this._mail = "",
        this.state = {
            user : '',
            userId: '',
            //partenaire: '',
            //test
            // lieu : this.props.route.params.user.venue,
            // prenom : this.props.route.params.user.fullName,
            // partenaire : this.props.route.params.user.partner,
            // budget : this.props.route.params.user.budget,
            // date : this.props.route.params.user.date,
            // mail : this.props.route.params.user.email,
        }
      }

    //A TESTER
    // setInfosUser(user){
    //     this.setState({lieu : user.venue})
    //     this.setState({prenom : user.fullName})
    //     this.setState({partenaire : user.partner})
    //     this.setState({budget : user.budget})
    //     this.setState({date : user.date})
    //     this.setState({mail : user.email})
    // }

    //Fonctions setter
    setVenue(data){
        //avant : this._lieu = data
        this.lieu = data
    }

    setName(data){
        this.prenom = data
    }

    setPartner(data){
        this.partenaire = data
    }

    setBudget(data){
        this.budget = data
    }

    setDate(data){
        this.date = data
    }

    setMail(data){
        this.mail = data
    }

    setUser(data){
    this.setState({user : data})
    }

    setUserId(data){
    this.setState({userId : data})
    }

    setNewBudget(data){
        this.budget = data
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

                    //CODE A TESTER
                    //this.setInfosUser(user)


                    //this.setNewBudget(user.budget)
                    //this.budget = user.budget
                }
            });
    }

  //Fonction automatiquement lancée à l'ouverture du screen
    componentDidMount(){
    //Appel le chargement des données de l'user actuel
    this.fetchUser()

    console.log(this.props)
    }

  //Fonction de modification de la dépense
  //Recuperation des éléments à modifier
  //puis Requêtes No-SQL envoyées à la BDD Firestore
  updateDataAccount(){
    //TEST
    // var newLieu = this.state.lieu
    // var newPrenom = this.state.prenom
    // var newPartenaire = this.state.partenaire
    // var newBudget = this.state.budget
    // var newDate = this.state.date
    // var newMail = this.state.mail

    var newLieu = this.lieu
    var newPrenom = this.prenom
    var newPartenaire = this.partenaire
    var newBudget = this.budget
    var newDate = this.date
    var newMail = this.mail

    //on n'envoie que les éléments modifiés par l'utilisateur
      if (this._lieu != "")
      {
        newLieu = this._lieu
      }
      if (this._prenom != "")
      {
        newPrenom = this._prenom
      }
      if (this._partenaire != "")
      {
        newPartenaire= this._partenaire
      }
      if (this._budget != "")
      {
        newBudget= this._budget
      }
      if (this._date != "")
      {
        newDate= this._date
      }
      if (this._mail != "")
      {
        newMail= this._mail
      }
    //fonction de modification
    this.updateAccount(newLieu, newPrenom, newPartenaire, newBudget, newDate, newMail)
  }

  //Fonction de modification de la dépense
  //Requêtes No-SQL envoyées à la BDD Firestore
  updateAccount(Lieu, Prenom, Partenaire, Budget, Date, Mail){
    firebase.
      firestore()
          .collection('users')
          .doc(this.state.userId)
          .update({
              budget : Budget,
              date : Date,
              email : Mail,
              fullName : Prenom,
              partner : Partenaire,
              venue : Lieu
          })
          .then(() => {
              //this.props.navigation.goBack();
              this.props.navigation.navigate('WeddingMe', {screen : 'Accueil', params: {user:this.state.user}})
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
                        //avant : this.state.prenom
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
// }
// export default function AccountScreen({navigation}) {
//     //Variables contenant les actuellement en mémoire dans FireBase
//     const [uid, setID] = useState('')
//     const [userName, setName] = useState('')
//     const [userPartner, setPartner] = useState('')
//     const [userBudget, setBudget] = useState('')
//     const [userVenue, setVenue] = useState('')
//     const [userDate, setDate] = useState('')
//     const [userMail, setMail] = useState('')

//     //Variables vides, utilisées pour conserver les valeurs initiales en mémoire
//     const [name, _setName] = useState('')
//     const [partner, _setPartner] = useState('')
//     const [budget, _setBudget] = useState('')
//     const [venue, _setVenue] = useState('')
//     const [date, _setDate] = useState('')
//     const [mail, _setMail] = useState('')

//     //Recuperation du user
//     firebase.
//         firestore()
//             .collection('users')
//             .doc(firebase.auth().currentUser.uid)
//             .get()
//             .then(firestoreDocument => {
//                 //console.log('User exists: ', firestoreDocument.exists);
//                 if (firestoreDocument.exists) {
//                     const user = firestoreDocument.data()
//                     setID(user.id)
//                     console.log("Donne infos id")
//                     console.log(user.id)
//                     console.log(uid)
//                     setName(user.fullName)
//                     setPartner(user.partner)
//                     setBudget(user.budget)
//                     setVenue(user.venue)
//                     setDate(user.date)
//                     setMail(user.email)
//                 }
//             });

//     //ATTENTION ici modification temporaire du code : on reprend systématiquement les news valeurs
//     //Besoin donc que tout soit rempli à chaque fois
//     const sendData = () => {
//         updateData()
//         firebase.
//             firestore()
//                 .collection('users')
//                 .doc(uid)
//                 .update ({
//                     date : date,
//                     email : mail,
//                     fullName : name,
//                     partner : partner,
//                     venue : venue,
//                 });
//         console.log('Quelles donnees sont envoyées ?')
//         console.log(userDate)
//         console.log(userMail)
//         console.log(userName)
//         console.log(userPartner)
//         console.log(userVenue)
//     }

//     //Pour éviter d'avoir des champs vides
//     //ATTENTION modification du champ dans la boucle if ne fonctionne pas ?...
//     const updateData = () => {
//         if (name !== "") {
//             setName(name)
//             console.log(userName)
//             console.log("Name non nul")
//             console.log(name)
//             console.log(userName)
//         }
//         if (partner !== "") {
//             setPartner(partner)
//             console.log("partner non nul")
//             console.log(partner)
//             console.log(userPartner)
//         }
//         if (budget !== "") {
//             setBudget(budget)
//             console.log("budget non nul")
//             console.log(budget)
//         }
//         if (venue !== "") {
//             setVenue(venue)
//             console.log("venue non nul")
//             console.log(venue)
//         }
//         if (date !== "") {
//             setDate(date)
//             console.log("date non nul")
//             console.log(date)
//         }
//         if (mail !== "") {
//             setMail(mail)
//             console.log("mail non nul")
//             console.log(mail)
//         }
//     }

//     return (

//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text>Mon compte</Text>
//             </View>
//             <View //ATTENTION RAJOUT DE CODE ICI
//             >
//                 <Text>
//                     Attention, si vous voulez modifier un champ, il vous est demandé de renoter également l'ensemble des champs présents.</Text>
//             </View>
//             <View style={styles.donnees}>
//                 <View style={styles.donneesSpe}>
//                     <Text>Prénom</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder={JSON.stringify(userName)}
//                         placeholderTextColor="#aaaaaa"
//                         onChangeText={(text) => _setName(text)}
//                         value={name}
//                     />
//                 </View>
//                 <View style={styles.donneesSpe}>
//                     <Text>Partenaire</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder={JSON.stringify(userPartner)}
//                         placeholderTextColor="#aaaaaa"
//                         value={partner}
//                         onChangeText={(text) => _setPartner(text)}
//                     />
//                 </View>
//                 <View style={styles.donneesSpe}>
//                     <Text>Budget total</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder={JSON.stringify(userBudget)}
//                         placeholderTextColor="#aaaaaa"
//                         value={budget}
//                         onChangeText={(text) => _setBudget(text)}
//                     />
//                 </View>
//                 <View style={styles.donneesSpe}>
//                     <Text>Lieu du mariage</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder={JSON.stringify(userVenue)}
//                         placeholderTextColor="#aaaaaa"
//                         value={venue}
//                         onChangeText={(text) => _setVenue(text)}
//                     />
//                 </View>
//                 <View style={styles.donneesSpe}>
//                     <Text>Date du mariage</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder={JSON.stringify(userDate)}
//                         placeholderTextColor="#aaaaaa"
//                         value={date}
//                         onChangeText={(text) => _setDate(text)}
//                     />
//                 </View>
//                 <View style={styles.donneesSpe}>
//                     <Text>Adresse mail</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder={JSON.stringify(userMail)}
//                         placeholderTextColor="#aaaaaa"
//                         value={mail}
//                         onChangeText={(text) => _setMail(text)}
//                     />
//                 </View>
//             </View>
//             <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => sendData()}
//                     >
//                     <Text style={styles.buttonTitle}>Modifier</Text>
//             </TouchableOpacity>
//         </View>

//     )
//     }
