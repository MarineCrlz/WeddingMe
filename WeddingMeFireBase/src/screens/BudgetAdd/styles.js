import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  //Conteneur principal
  //Contient : le ScrollView, et dedans : 
  //le containeur de l'intitule
  //le containeur de la categorie
  //le containeur de l'etat
  //le containeur du prix
  //le conteneur de la description
  //le conteneur du bouton d'ajout
    main_container: {
        flex: 1,
        marginTop: 10,
        backgroundColor : '#f8edeb',
        justifyContent: 'space-evenly',

    },

    //Styles communs : 

    //Conteneur des titres
    container_titre : {
      flex : 5,
      marginBottom : 10,
    },

    //Texte des titres
    titre : {
      fontSize : 16,
      fontWeight: 'normal',
      marginLeft: 10,
    },

    //Conteneur du TextInput
    container_input : {
      marginLeft : 30,
      marginRight : 30,
    },

    //TextInput
    input: {
      height: 48,
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: 'white',
      marginTop: 5,
      marginBottom: 5,
      paddingLeft: 16
    },

    //TouchableOpacity (non sélectionné)
    touchable : {
      flex : 1,
      backgroundColor : 'white',
      justifyContent : 'center',
      alignItems : 'center',
      borderColor: '#f8edeb',
      borderWidth: 1,
      borderBottomWidth : 2,
      paddingTop : 10,
      paddingBottom : 10,
    },

    //TouchableOpacity (sélectionné)
    touchable_chosen : {
      flex : 1,
      backgroundColor : '#f9dcc4',
      justifyContent : 'center',
      alignItems : 'center',
      borderColor: '#f8edeb',
      borderWidth: 1,
      borderBottomWidth : 2,
      paddingTop : 10,
      paddingBottom : 10,
    },

    //Texte TouchableOpacity
    buttonTitle: {
      fontWeight: 'normal',
      fontSize: 14,
      color : 'black',
    },

    //Intitule :

    //Conteneur de l'intitule
    container_identity: {
      flex : 2,
      marginTop : 10,
      marginRight: 10,
      marginLeft : 10,
    },

    //Categorie :

    //Conteneur principal de la catégorie
    container_category : {
      flex : 1,
      justifyContent : 'space-around',
      marginTop : 10,
      marginRight: 10,
      marginLeft : 10,
    },

    //Conteneur de tous les TouchableOpacity de la catégorie
    container_category_choice : {
      flex : 2,
      flexDirection : 'row',
    },

    //Etat :

    //Container de l'etat
    container_invitation : {
      flex : 1,
      marginTop : 10,
      marginRight: 10,
      marginLeft : 10,
    },

    //Conteneur de tous les TouchableOpacity de l'etat
    container_invitation_choice : {
      flex : 2,
      flexDirection : 'row',
    },

    //Prix :

    //Container du prix
    container_alim : {
      flex : 2,
      marginTop : 10,
      marginRight: 10,
      marginLeft : 10,
    },

    //Conteneur de tous les TouchableOpacity du prix
    container_alim_choice : {
      flex : 1,
      flexDirection : 'row',
    },

    container_alim_description : {
      flex : 2,
      justifyContent : 'center',
      alignContent : 'center',
    },

    //Bouton Ajouter

    //Container du bouton
    container_buttonAdd : {
      flex : 1,
      marginBottom : 10,
      alignContent : 'center',
      justifyContent: 'center',
    },

    //Bouton Ajouter
    buttonAdd: {
      backgroundColor : '#fec89a',
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height : 48,
      borderRadius: 5,
      alignContent : 'center',
      alignItems : 'center',
      justifyContent : 'center',
    },

    //Texte bouton ajouter
    buttonTitleAdd: {
      fontWeight: 'bold',
      fontSize: 20,
      color : '#ffff',
    },
})