import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  //Conteneur principal
    main_container: {
        flex: 1,
        marginTop: 10,
        backgroundColor : '#f8edeb',
        justifyContent: 'space-evenly',

    },

    //ScrollView
    main_scroll: {
      //justifyContent: 'space-evenly',
    },

  //Commun aux différentes views

  //Conteneur titre de chaque partie
    container_titre : {
      flex : 5,
      marginBottom : 10,
    },

  //Texte titre
    titre : {
      fontSize : 16,
      fontWeight: 'normal',
      marginLeft: 10,
    },

  //TextInput présent dans identité et spe alimentaires
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 16
  },

  //TouchableOpacity commun à groupe, invité par et spe alimentaires
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

  //TouchableOpacity selectionne
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

  //Identite :

  //Conteneur identité
    container_identity: {
      flex : 2,
      marginTop : 10,
      marginRight: 10,
      marginLeft : 10,
    },

    //Conteneur des TextInput identité
    container_input : {
      marginLeft : 30,
      marginRight : 30,
    },

    //Age :

  //Conteneur global age
  container_age: {
    flex : 1,
    marginTop : 10,
    marginRight: 10,
    marginLeft : 10,
  },

  //Conteneur des Touchables Opacity de l'age
  container_age_choice : {
    flex : 2,
    flexDirection : 'row',
  },

  //Categorie :

  //Container global du groupe (famille, amis, travail)
  container_category : {
    flex : 1,
    justifyContent : 'space-around',
    marginTop : 10,
    marginRight: 10,
    marginLeft : 10,
  },

  //Conteneur des Touchable Opacity de l'age
  container_category_choice : {
    flex : 2,
    flexDirection : 'row',
  },

  //Invitation/Affiliation

  //Container global de l'invitation (user, partner, commun)
  container_invitation : {
    flex : 1,
    marginTop : 10,
    marginRight: 10,
    marginLeft : 10,
  },

  //Conteneur des Touchable Opacity de l'invitation
  container_invitation_choice : {
    flex : 2,
    flexDirection : 'row',
  },

  //Specifications alimentaires

  //Conteneur global des spe alimentaires
  container_alim : {
    flex : 2,
    marginTop : 10,
    marginRight: 10,
    marginLeft : 10,
  },

  //Conteneur des Touchable Opacity des specifications alimentaires
  container_alim_choice : {
    flex : 1,
    flexDirection : 'row',
  },

  //Conteneur du TextInput de la description des specifications alimentaires
  container_alim_description : {
    flex : 2,
    justifyContent : 'center',
    alignContent : 'center',
  },

  //Conteneur du bouton Ajouter
  container_buttonAdd : {
    flex : 1,
    marginBottom : 10,
    alignContent : 'center',
    justifyContent: 'center',
  },

  //TouchableOpacity du bouton Ajouter
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

  //Titre du bouton Ajouter
  buttonTitleAdd: {
    fontWeight: 'bold',
    fontSize: 20,
    color : '#ffff',
  },



})