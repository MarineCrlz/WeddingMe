import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  //Conteneur principal
    main_container: {
        flex: 1,
        backgroundColor : "#f8edeb"
      },

    //Texte de l'intitule
      title: {
        fontWeight: 'bold',
        fontSize: 20,
        color : '#ffff',
        flexWrap: 'wrap',
        paddingRight: 5,
        paddingLeft: 10
      },

      //Conteneur de l'intitule
      container_title: {
          flex : 1,
          borderBottomColor : '#f9dcc4',
          backgroundColor : '#f9dcc4',
          marginBottom : 10,
          alignItems : 'center',
          justifyContent: 'center'
      },

      //Conteneur de la flatlist de todo
      container_flatlist: {
        flex : 9,
    }
})