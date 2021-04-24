import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  //Conteneur global
    main_container: {
        flex: 1,
        backgroundColor : '#f8edeb'
      },
    
  //Conteneur du titre de la vue
    main_text: {
      flex : 1,
      justifyContent : 'center',
      alignItems: 'center',
      backgroundColor : '#f9dcc4',
      marginBottom: 10

    },

  //Texte du titre de la vue
    text: {
      fontWeight: 'bold',
      fontSize: 20,
      color : '#ffff',
    },

    //ScrollView
    main_scroll: {
      width : '100%'
    },

    //Conteneur contenant le ScrollView et tous les view des TouchableOpacity
    main_touchable: {
      flex : 10,
      justifyContent : 'center',
      alignItems: 'center',
    },

    //Conteneur contenenat tous les TouchableOpacity
    container_touchable: {
      flex : 1,
    },

    //TouchableOpacity
    touchable: {
      flexDirection: 'row',
      alignItems : 'center',
      borderColor : '#f9dcc4',
      backgroundColor : '#ffff',
      borderRadius : 20,
      borderWidth : 2,
      marginRight : 10,
      marginLeft : 10,
      marginTop : 10,
      marginBottom : 10,
      paddingLeft: 10
    },

    //Image illustrant chaque catégorie
    image: {
      width: 50,
      height: 50,
      margin: 10,
    },

    //Texte de chaque catégorie
    title: {
      fontWeight: 'normal',
      fontSize: 17,
      flexWrap: 'wrap',
      paddingRight: 5,
      paddingLeft: 10
    },

})