import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  //Conteneur global
  //Contient : le ScrollView, et dedans : 
  //le containeur de l'intitule
  //le containeur de la categorie
  //le containeur de l'etat
  //le containeur du prix
  //le conteneur de la description
  //le conteneur des boutons de modification et de suppression
    main_container: {
        flex: 1,
        marginTop: 10,
        backgroundColor : '#f8edeb',
        justifyContent: 'space-evenly',

    },

    //Styles communs :

    //ScrollView
    main_scroll: {
    },

    //Conteneur titre de chaque partie
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

    //TextInput présent dans identité et spe alimentaires
    input: {
        flex : 1,
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 16
    },

    //Image chargée
    image: {
        width: 20,
        height: 20,
        margin: 10,
    },

    //TouchableOpacity commun à groupe, invité par et spe alimentaires
    //(non sélectionné)
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

    //Texte du TouchableOpacity
    buttonTitle: {
        fontWeight: 'normal',
        fontSize: 14,
        color : 'black',
    },

    //Identité :

    //Conteneur global identité
    container_identity: {
        flex : 2,
        marginTop : 10,
        marginRight: 10,
        marginLeft : 10,
    },

    //Conteneur des inputs d'identité
    container_input : {
      marginLeft : 10,
      marginRight : 30,
    },

    container_input_image : {
        flexDirection : 'row',
        width : '100%',
        alignItems : 'center',
      },

    //Age

  //Container global age
    container_age: {
        flex : 1,
        marginTop : 10,
        marginRight: 10,
        marginLeft : 10,
    },

    //TouchableOpacity d'age
    container_age_choice : {
        flex : 2,
        flexDirection : 'row',
    },

    //Grouge

    //Conteneur global groupe (famille, amis, travail)
    container_category : {
        flex : 1,
        justifyContent : 'space-around',
        marginTop : 10,
        marginRight: 10,
        marginLeft : 10,
    },

    //Conteneur de tous les TouchableOpacity de groupe
    container_category_choice : {
        flex : 2,
        flexDirection : 'row',
    },

    //Invitation/Affiliation

    //Container invitation (user, partner, commun)
    container_invitation : {
        flex : 1,
        marginTop : 10,
        marginRight: 10,
        marginLeft : 10,
    },

    //Conteneur de tous les TouchableOpacity d'invitation
    container_invitation_choice : {
        flex : 2,
        flexDirection : 'row',
    },

    //Specifications alimentaires

    //Conteneur global spe alimentaires
    container_alim : {
        flex : 2,
        marginTop : 10,
        marginRight: 10,
        marginLeft : 10,
    },

    //Conteneur de tous les TouchableOpacity des spécifications alimentaires
    container_alim_choice : {
        flex : 1,
        flexDirection : 'row',
    },

    //Conteneur de la description des spe alimentaires
    container_alim_description : {
        flex : 2,
        justifyContent : 'center',
        alignContent : 'center',
    },

    //Bouton

  //Conteneur des boutons
    container_button : {
        flex : 1,
        marginBottom : 10,
        justifyContent: 'space-evenly',
        flexDirection : 'row',
    },

    //TouchableOpacity du bouton Modifier
    buttonUpdate: {
        flex: 1,
        width: '100%',
        backgroundColor : '#fec89a',
        marginRight: 30,
        marginTop: 20,
        height : 48,
        borderRadius: 5,
        alignContent : 'center',
        alignItems : 'center',
        justifyContent : 'center',
    },

    //TouchableOpacity du bouton Supprimer
    buttonSupp: {
        flex: 1,
        width: '100%',
        backgroundColor : '#bb0000',
        marginRight: 30,
        marginTop: 20,
        height : 48,
        borderRadius: 5,
        alignContent : 'center',
        alignItems : 'center',
        justifyContent : 'center',
    },

    //Texte du bouton Supprimer
    buttonTitleUpSupp: {
        fontWeight: 'bold',
        fontSize: 20,
        color : '#ffff',
    },



})