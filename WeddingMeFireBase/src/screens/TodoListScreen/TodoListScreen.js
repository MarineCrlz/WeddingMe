import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

class ToDoListScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  //Fonction navigation
  displayedDetails(time){
    //Envoi sur la page de détail des todo de la période considérée via le Stack Navigator
      this.props.navigation.navigate("Détails des todo", {time : time})
  }
  
  render() {
    return (
      <View style={styles.main_container}>
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

            <View style={styles.container_touchable}>
            <TouchableOpacity style={styles.touchable} onPress = {() => this.displayedDetails("9m")}>
            {<Image
              style={styles.image}
              source={require('../../../assets/bouquet.png')}
              />}
            <Text style={styles.title}>9 mois avant le mariage</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.container_touchable}>
            <TouchableOpacity style={styles.touchable} onPress = {() => this.displayedDetails("6m")}>
            {<Image
              style={styles.image}
              source={require('../../../assets/clothes.png')}
              />}
            <Text style={styles.title}>6 mois avant le mariage</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.container_touchable}>
            <TouchableOpacity style={styles.touchable} onPress = {() => this.displayedDetails("4m")}>
            {<Image
              style={styles.image}
              source={require('../../../assets/wedding-car.png')}
              />}
            <Text style={styles.title}>4 mois avant le mariage</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.container_touchable}>
            <TouchableOpacity style={styles.touchable} onPress = {() => this.displayedDetails("3m")}>
            {<Image
              style={styles.image}
              source={require('../../../assets/wedding-rings.png')}
              />}
            <Text style={styles.title}>3 mois avant le mariage</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.container_touchable}>
            <TouchableOpacity style={styles.touchable} onPress = {() => this.displayedDetails("2s")}>
            {<Image
              style={styles.image}
              source={require('../../../assets/facial-treatment.png')}
              />}
            <Text style={styles.title}>2 semaines avant le mariage</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.container_touchable}>
            <TouchableOpacity style={styles.touchable} onPress = {() => this.displayedDetails("3j")}>
            {<Image
              style={styles.image}
              source={require('../../../assets/checklist.png')}
              />}
            <Text style={styles.title}>3 jours avant le mariage</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.container_touchable}>
            <TouchableOpacity style={styles.touchable} onPress = {() => this.displayedDetails("0j")}>
            {<Image
              style={styles.image}
              source={require('../../../assets/fireworks.png')}
              />}
            <Text style={styles.title}>Le jour J</Text>
            </TouchableOpacity>
            </View>

        </ScrollView>
        </View>
      </View>
    )
  }
}

export default ToDoListScreen