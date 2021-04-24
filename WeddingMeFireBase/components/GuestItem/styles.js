import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  //Conteneur principal
  main_container: {
    flex: 1,
    borderColor: '#f9dcc4',
    backgroundColor: 'white',
    borderWidth: 2,
  },

  //Style du Touchable Opacity
  main_touchable: {
    flex:1,
  },

  //Conteneur principal du Touchable Opacity
  touchable: {
    flex:1,
    flexDirection : 'row',
  },

  //Image chargée
  image: {
    width: 20,
    height: 20,
    margin: 10,
  },

  //Conteneur contenant : le conteneur avec l'identité de l'invité
  //et celui de sa catégorie
  container_infos: {
    flex : 2,
    justifyContent : 'center',
    alignContent: 'center',
    alignItems : 'center'
  },

  //Conteneur de l'identité
  identity: {
      flex: 2,
      width: '100%',
      alignItems : 'center',
      marginTop : 15
  },

  //Texte de l'identité
  text_identity : {
    fontWeight: 'normal',
    fontSize: 18,
    paddingRight: 5,
    flexWrap: 'wrap',
  },

  //Conteneur de la catégorie
  category : {
      flex : 1,
      width : '100%',
      alignItems : 'flex-start',
      paddingLeft : 5
  },

  //Texte de la catégorie
  text_category : {
    fontSize : 14,
    color : 'gray'
  },

  //Conteneur des informations supplémentaires 
  //(ici spécifications alimentaires)
  container_infosSpe: {
    flex : 1,
    flexDirection : 'row',
    justifyContent : 'space-evenly',
    alignItems : 'center'

  },
})