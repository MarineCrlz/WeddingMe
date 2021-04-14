import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'row',
    //width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#f9dcc4',
    backgroundColor: 'white',
    // borderRadius : 20,
    borderWidth: 2,
    
    // marginTop : 10,
    // marginRight : 10,
    // marginLeft : 10,
    // marginBottom: 10
  },

  image: {
    width: 20,
    height: 20,
    margin: 10,
    //backgroundColor: 'gray'
  },

  container_infos: {
    flex : 2,
    //backgroundColor : 'blue',
    justifyContent : 'center',
    alignContent: 'center',
    alignItems : 'center'
  },

  identity: {
      flex: 2,
      width: '100%',
      //backgroundColor : 'green',
      alignItems : 'center'
  },

  category : {
      flex : 1,
      width : '100%',
      //marginTop : 10,
      alignItems : 'flex-start',
      //backgroundColor : 'yellow'
  },

  container_infosSpe: {
    flex : 1,
    flexDirection : 'row',
    justifyContent : 'space-evenly',
    alignItems : 'center'

  },

  text_category : {
    fontSize : 14,
    color : 'gray'
  },

  text_identity : {
    fontWeight: 'normal',
    fontSize: 18,
    //flex: 1,
    paddingRight: 5,
    //paddingLeft: 5
    flexWrap: 'wrap',
  },
  
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