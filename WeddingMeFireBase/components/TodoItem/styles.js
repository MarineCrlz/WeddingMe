import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  //Conteneur global
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#f9dcc4',
    backgroundColor: 'white',
    borderRadius : 20,
    borderWidth: 2,
    marginTop : 10,
    marginRight : 10,
    marginLeft : 10,
    marginBottom: 10
  },

  //Conteneur des informations essentielles (intitule, etat)
  infos_container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent : 'space-between',
    marginTop: 20,
  },

  //Conteneur de l'intitule
  title_container: {
    flex : 1,
    marginLeft : 15,
    marginRight : 10
  },

  //Texte de l'intitule
  title_text: {
    fontWeight: 'normal',
    fontSize: 18,
    paddingRight: 5,
    flexWrap: 'wrap',
  },

  //Conteneur de la description
  description_container: {
    flex: 7,
    margin : 10
  },

  //Texte de la description
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
})