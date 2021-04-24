import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  //Conteneur principal
  main_container: {
    flex: 1,
    borderColor: '#f9dcc4',
    backgroundColor: 'white',
    borderWidth: 2,
  },

  //Conteneur du Touchable Opacity
  main_touchable: {
    flex:1,
  },

  //Conteneur principal dans le Touchable Opacity
  touchable: {
    flex:1,
    flexDirection : 'row',
  },

  //Image affichée
  image: {
    width: 20,
    height: 20,
    margin: 10,
  },

  //Conteneur contenant : le conteneur d'intitule de la tâche et le prix
  container_infos: {
    flex : 4,
    flexDirection: 'row',
  },

  //Conteneur de l'intitule
  identity: {
      flex: 3,
      width: '100%',
      alignItems : 'center',
      justifyContent: 'center',
      paddingLeft : 15,
      flexWrap: 'wrap'
  },

  //Texte de l'intitule
  text_identity : {
    fontWeight: 'normal',
    fontSize: 17,
    paddingRight: 5,
    flexWrap: 'wrap',
  },

  //Conteneur du prix
  category : {
      flex : 1,
      width : '100%',
      alignItems : 'flex-start',
      justifyContent: 'center',
      paddingLeft : 5,
  },

  //Texte du prix
  text_category : {
    fontSize : 14,
    color : 'gray'
  },

  //Conteneur des infos relatives à l'état
  container_infosSpe: {
    flex : 1,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center'

  },

})