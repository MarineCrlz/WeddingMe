import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    //Conteneur global
    main_container: {
        flex: 1,
        backgroundColor : '#f8edeb'
      },
      
    //Conteneur du titre global
    main_text: {
      flex : 1,
      justifyContent : 'center',
      alignItems: 'center',
      backgroundColor : '#f9dcc4',
      borderBottomWidth : 2,
      borderColor: '#f8edeb'
    },

    //Text du titre global de la vue
    title: {
      fontWeight: 'bold',
      fontSize: 20,
      color : '#ffff',
    },

    //Conteneur contenant toutes les vues des TouchableOpacity de chaque filtre
    container_choice : {
      flex : 1,
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'space-around',
    },

    //Conteneur des TouchableOpacity des filtres
    container_choice_done : {
      flex : 1,
      height: '100%',
      backgroundColor : 'white',
      justifyContent : 'center',
      alignItems : 'center',
      borderColor: '#f8edeb',
      borderWidth: 1,
      borderBottomWidth : 2,
    },

    //Conteneur du titre de chaque catégorie
    container_title_guest: {
      flex : 1,
      padding : 5,
      backgroundColor : '#f9dcc4'
    },

    //Titre de chaque catégorie
    title_guest: {
      fontSize : 15,
      color : 'white'
    },

    //Text de chaque TouchableOpacity
    text: {
        fontWeight: 'normal',
        fontSize: 15,
        color : 'gray',
      },

    //Conteneur contenant le ScrollView et tous les TouchableOpacity des catégories
    main_touchable: {
      flex : 10,
      width : '100%',
      justifyContent : 'flex-start',
      alignItems: 'center',
      //backgroundColor: 'red'
    },

    //Conteneur de la view avec tous les TouchableOpacity
    flatlist: {
      width : '100%'
    },

    //Bouton d'ajout

    //Conteneur du bouton
    container_button: {
      flex : 1,
      height : '100%',
      width: '100%',
      alignItems : 'flex-end',
      alignContent : 'flex-end',
      justifyContent : 'flex-end',
      position : 'absolute'
    },

    //Image du bouton
    image : {
      width : 30,
      height : 30
    },

    //TouchableOpacity du bouton
    button: {
      backgroundColor : '#fec89a',
      margin : 30,
      height : 70,
      width : 70,
      borderRadius : 50,
      borderColor: '#f7ab7e',
      borderWidth : 3,
      alignContent : 'center',
      alignItems : 'center',
      justifyContent : 'center',

    },

})