import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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

  // image: {
  //   width: 50,
  //   height: 50,
  //   margin: 10,
  //   backgroundColor: 'gray'
  // },

  infos_container: {
    flex: 1,
    width: '100%',
    //backgroundColor : 'blue',
    flexDirection: 'row',
    justifyContent : 'space-between',
    marginTop: 20,
    //flexWrap: 'wrap',
  },

  title_container: {
    flex : 1,
    //flexWrap : 'wrap',
    //backgroundColor : 'red',
    marginLeft : 15,
    marginRight : 10
  },

  title_text: {
    fontWeight: 'normal',
    fontSize: 18,
    //flex: 1,
    paddingRight: 5,
    //paddingLeft: 5
    flexWrap: 'wrap',

  },

  description_container: {
    flex: 7,
    margin : 10
  },

  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
})