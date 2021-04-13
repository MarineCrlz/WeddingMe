import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import ToDoListItemScreen from '../TodoItemScreen/TodoItemScreen';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

class ToDoListScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      todos12m: [],
      todos9m: [],
      todos6m: [],
      todos4m: [],
      todos3m: [],
      todos2s: [],
      todos3j: [],
      todos0j: [],
      //test : "",
    }
  }

  //FONCTION de test pour la modif du state
//   test(){
//     console.log(this.state.test)
//     if (this.state.test == ""){
//         this.setState({test : "Bonsoir"})
//     }
//     console.log(this.state.test)
//   }

  componentDidMount(){
    this.loadAllToDos()
  }

  setToDos(data, time){
      if (time == "12m") {
        this.setState({todos12m : data})
      }
      if (time == "9m") {
        this.setState({todos9m : data})
      }
      if (time == "6m") {
        this.setState({todos6m : data})
      }
      if (time == "4m") {
        this.setState({todos4m : data})
      }
      if (time == "3m") {
        this.setState({todos3m : data})
      }
      if (time == "2s") {
        this.setState({todos2s : data})
      }
      if (time == "3j") {
        this.setState({todos3j : data})
      }
      if (time == "0j") {
        this.setState({todos0j : data})
      }
  }

  loadAllToDos(){
    this.loadToDos("12m")
    // console.log("Donnees dans totos12") //TEST
    // console.log(this.state.todos12m) //TEST
    this.loadToDos("9m")
    this.loadToDos("6m")
    this.loadToDos("4m")
    this.loadToDos("3m")
    this.loadToDos("2s")
    this.loadToDos("3j")
    this.loadToDos("0j")
  }

  loadToDos(time){
        firebase.
            firestore()
            .collection('todoListFixed')
            .where("Time", "==", time)
            .onSnapshot(
                (querySnapshot) => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    this.setToDos(newEntities, time) //TEST
                    //this.setState({todos : newEntities})
                    //console.log("Les new entities")
                    //console.log(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
  }

//   loadToDosWithoutFilter(){
//     firebase.
//         firestore()
//         .collection('todoListFixed')
//         .where("Time", "==", time)
//         .onSnapshot(
//             (querySnapshot) => {
//                 const newEntities = []
//                 querySnapshot.forEach(doc => {
//                     const entity = doc.data()
//                     entity.id = doc.id
//                     newEntities.push(entity)
//                 });
//                 this.setToDos(newEntities)
//                 console.log("Les new entities")
//                 console.log(newEntities)
//             },
//             error => {
//                 console.log(error)
//             }
//         )
// }

displayedDetails(time){
    this.props.navigation.navigate("TodoListDetail", {time : time})
}
  render() {
    return (
      <View style={styles.main_container}>
        {/* <Button title='Come on baby' onPress={() => this.loadAllToDos()}/> */}
        {/* <Text>Quelle valeur de test ?{JSON.stringify(this.state.test)}</Text> */}
        {/* <Text>Quelle valeur de test ?{this.state.test}</Text> */}

        <View style={styles.main_text}>
          <Text style={styles.text}>Mes To Do List</Text>
        </View>

        <View style={styles.main_touchable}>
        <ScrollView style={styles.main_scroll}>
            <View style={styles.container_touchable}>
              <TouchableOpacity style={styles.touchable} onPress = {() => this.displayedDetails("12m")}>
                {<Image
                  style={styles.image}
                  source={require('../../../assets/route.png')}
                  />}
                <Text style={styles.title}>1 an avant le mariage</Text>
              </TouchableOpacity>
            </View>
            {/* <FlatList
            data={this.state.todos12m}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <ToDoListItemScreen todo={item}/>}
            //  onEndReachedThreshold={0.5}
            //   onEndReached={() => {
            //       if (this.page < this.totalPages) {
            //          this.loadToDos()
            //       }
            //   }}
            /> */}

            {/* <View style={styles.container_title}> */}
            <View style={styles.container_touchable}>
            <TouchableOpacity style={styles.touchable} onPress = {() => this.displayedDetails("9m")}>
            {<Image
              style={styles.image}
              source={require('../../../assets/bouquet.png')}
              />}
            <Text style={styles.title}>9 mois avant le mariage</Text>
            </TouchableOpacity>
            </View>

            {/* </View> */}
            {/* <FlatList
            data={this.state.todos9m}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <ToDoListItemScreen todo={item}/>}
            //onEndReachedThreshold={0.5}
            /> */}

            {/* <View style={styles.container_title}> */}

            <View style={styles.container_touchable}>
            <TouchableOpacity style={styles.touchable} onPress = {() => this.displayedDetails("6m")}>
            {<Image
              style={styles.image}
              source={require('../../../assets/clothes.png')}
              />}
            <Text style={styles.title}>6 mois avant le mariage</Text>
            </TouchableOpacity>
            </View>

            {/* </View> */}
            {/* <FlatList
            data={this.state.todos6m}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <ToDoListItemScreen todo={item}/>}
            //onEndReachedThreshold={0.5}
            /> */}

            {/* <View style={styles.container_title}> */}

            <View style={styles.container_touchable}>
            <TouchableOpacity style={styles.touchable} onPress = {() => this.displayedDetails("4m")}>
            {<Image
              style={styles.image}
              source={require('../../../assets/wedding-car.png')}
              />}
            <Text style={styles.title}>4 mois avant le mariage</Text>
            </TouchableOpacity>
            </View>

            {/* </View> */}
            {/* <FlatList
            data={this.state.todos4m}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <ToDoListItemScreen todo={item}/>}
            //onEndReachedThreshold={0.5}
            /> */}

            {/* <View style={styles.container_title}> */}

            <View style={styles.container_touchable}>
            <TouchableOpacity style={styles.touchable} onPress = {() => this.displayedDetails("3m")}>
            {<Image
              style={styles.image}
              source={require('../../../assets/wedding-rings.png')}
              />}
            <Text style={styles.title}>3 mois avant le mariage</Text>
            </TouchableOpacity>
            </View>

            {/* </View> */}
            {/* <FlatList
            data={this.state.todos3m}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <ToDoListItemScreen todo={item}/>}
            // onEndReachedThreshold={0.5}
            /> */}

            {/* <View style={styles.container_title}> */}

            <View style={styles.container_touchable}>
            <TouchableOpacity style={styles.touchable} onPress = {() => this.displayedDetails("2s")}>
            {<Image
              style={styles.image}
              source={require('../../../assets/facial-treatment.png')}
              />}
            <Text style={styles.title}>2 semaines avant le mariage</Text>
            </TouchableOpacity>
            </View>

            {/* </View> */}
            {/* <FlatList
            data={this.state.todos2s}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <ToDoListItemScreen todo={item}/>}
            //onEndReachedThreshold={0.5}
            /> */}

            {/* <View style={styles.container_title}> */}

            <View style={styles.container_touchable}>
            <TouchableOpacity style={styles.touchable} onPress = {() => this.displayedDetails("3j")}>
            {<Image
              style={styles.image}
              source={require('../../../assets/checklist.png')}
              />}
            <Text style={styles.title}>3 jours avant le mariage</Text>
            </TouchableOpacity>
            </View>

            {/* </View> */}
            {/* <FlatList
            data={this.state.todos3j}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <ToDoListItemScreen todo={item}/>}
            //onEndReachedThreshold={0.5}
            /> */}

            {/* <View style={styles.container_title}> */}

            <View style={styles.container_touchable}>
            <TouchableOpacity style={styles.touchable} onPress = {() => this.displayedDetails("0j")}>
            {<Image
              style={styles.image}
              source={require('../../../assets/fireworks.png')}
              />}
            <Text style={styles.title}>Le jour J</Text>
            </TouchableOpacity>
            </View>

            {/* </View> */}
            {/* <FlatList
            data={this.state.todos0j}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <ToDoListItemScreen todo={item}/>}
            //onEndReachedThreshold={0.5}
            /> */}
        </ScrollView>
        </View>
      </View>
    )
  }
}

export default ToDoListScreen