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

    //Text du titre de la vue
    title: {
      fontWeight: 'bold',
      fontSize: 20,
      color : '#ffff',
    },

    //Budget total et restant

    //Conteneur contenant le view des budget (restant et total)
    main_budget : {
      paddingTop : 5,
      paddingBottom : 5,
      backgroundColor : 'white',
      paddingLeft : 15,
      borderBottomWidth : 3,
      borderColor: '#f9dcc4',
  },
    //Conteneur des budget (total et restant)
    budget_detail : {
        paddingTop : 5,
    },

    //Text du budget (total et restant)
    title_budget: {
        fontWeight: 'normal',
        fontSize: 17,
        color : 'gray',
      },

    //Commun

    //Conteneur du titre de chaque partie
    container_title_guest: {
      flex : 1,
      padding : 5,
      backgroundColor : '#f9dcc4'
    },

    //Titre de chaque partie
    title_guest: {
      fontSize : 15,
      color : 'white'
    },

    

    //Conteneur global contenant le scrollview et le conteneur des flatlist
    main_touchable: {
      flex : 10,
      width : '100%',
      justifyContent : 'flex-start',
      alignItems: 'center',
    },

    //Conteneur des différentes view avec flatlist
    flatlist: {
      width : '100%'
    },

    //Bouton

    //Conteneur du bouton d'ajout
    container_button: {
      flex : 1,
      height : '100%',
      width: '100%',
      alignItems : 'flex-end',
      alignContent : 'flex-end',
      justifyContent : 'flex-end',
      position : 'absolute'
    },

    //TouchableOpacity du bouton d'ajout
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

    //Image du bouton d'ajout
    image : {
      width : 30,
      height : 30
    },

})