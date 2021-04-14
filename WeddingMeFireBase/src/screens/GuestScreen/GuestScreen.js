import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import ToDoListItemScreen from '../TodoItemScreen/TodoItemScreen';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import GuestItem from '../../../components/GuestItem/GuestItem';

class GuestScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        userId : "6vGNbejUocQK9QgDsm6FHCNCrLS2", //ATTENTION A MODIFIER
        userName : "Marine",
        userPartner : "Quentin",
        guest: [],
        guestFilter: [],
        guestUser: [],
        guestPartner: [],
        guestBoth : [],
        filter : ""
    }
  }

//   //Fonction navigation
//   displayedDetails(time){
//       this.props.navigation.navigate("TodoListDetail", {time : time})
//   }

  //Fonctions setter
  setFilter(data){ //2
      this.setState({filter : data})
  }

  setGuest(data){
      this.setState({guest : data})
  }

  setGuestFilter(data){ //4
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

  useFilter(filter){ //FONCTIONNE //3
    const newGuestFilter = this.state.guest.filter(guest => guest.Categorie == filter)
    this.setGuestFilter(newGuestFilter)
    this.useCoupleFilter(newGuestFilter)
  }

//   useCoupleFilter(data, filter){
//     const newGuest = data.filter(guest => guest.Affiliation == filter)
//     return newGuest
//   }

  useCoupleFilter(data){
      const newGuestUser = data.filter(guest => guest.Affiliation == this.state.userName)
      this.setGuestUser(newGuestUser)

      if (this.state.userPartner != "")
      {
        const newGuestPartner = data.filter(guest => guest.Affiliation == this.state.userPartner)
        this.setGuestPartner(newGuestPartner)
      }

      const newGuestBoth = data.filter(guest => guest.Affiliation == "")
      this.setGuestBoth(newGuestBoth)
  }

  displayedGuest(filter){ //FONCTIONNE(AIT) //1
    this.setFilter(filter) 
    if(filter != "all")
    {
        this.useFilter(filter)
    }
    if(filter == "all")
    {
        this.useCoupleFilter(this.state.guest)
        this.setGuestFilter(this.state.guest)
    }
  }

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
            this.setGuest(newEntities)
            this.setGuestFilter(newEntities)
            this.useCoupleFilter(this.state.guestFilter)
            // this.setGuestUser(guestUser)
            //TEST
            console.log("Affichage des guests")
            console.log(newEntities)
            console.log(this.state.guestUser)
            },
        error => {
            console.log(error)
        }
        )
        console.log("Qui sont les guests user ?")
        console.log(this.state.guestUser)
  }

  componentDidMount(){
    this.loadGuest()
  }

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.main_text}>
            <Text style={styles.title}>Mes Invites</Text>
        </View>
        <View style={styles.container_choice}>
            <TouchableOpacity onPress = {() => this.displayedGuest("all")}>
                <Text style={styles.text}> Tous</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => this.displayedGuest("Famille")}>
                <Text style={styles.text}> Famille </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => this.displayedGuest("Amis")}>
                <Text style={styles.text}> Amis </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => this.displayedGuest("Travail")}>
                <Text style={styles.text}> Travail </Text>
            </TouchableOpacity>
        </View>
        <View style={styles.main_touchable}>
            <View style={styles.flatlist}>
            <ScrollView>
                {/* <FlatList
                data={this.state.guestFilter}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <GuestItem todo={item}/>}
                /> */}
                <Text>Invités de Marine</Text>
                <FlatList
                data={this.state.guestUser}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <GuestItem todo={item}/>}
                />
                <Text>Invités de sa moitiée</Text>
                <FlatList
                data={this.state.guestPartner}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <GuestItem todo={item}/>}
                />
                <Text>Invités du couple</Text>
                <FlatList
                data={this.state.guestBoth}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <GuestItem todo={item}/>}
                />
            </ScrollView>
            </View>
        </View>
      </View>
    )
  }
}

export default GuestScreen