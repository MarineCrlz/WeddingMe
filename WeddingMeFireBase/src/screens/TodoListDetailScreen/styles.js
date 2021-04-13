import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor : "#f8edeb"
        //marginTop: 10,
        //backgroundColor: 'red'
      },

      loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      },

      title: {
        fontWeight: 'bold',
        fontSize: 20,
        color : '#ffff',
        //flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5,
        paddingLeft: 10
      },

      image: {
        width: 50,
        height: 50,
        margin: 10,
        //backgroundColor: 'gray'
      },

      container_title: {
          flex : 1,
          borderBottomColor : '#f9dcc4',
          backgroundColor : '#f9dcc4',
          //borderRadius : 30,
          // borderBottomWidth : 2,
          marginBottom : 10,
          alignItems : 'center',
          justifyContent: 'center'
          //backgroundColor : 'pink'
      },

      container_flatlist: {
        //borderBottomColor : '#fec89a',
        //backgroundColor : '#f9dcc4',
        //borderRadius : 30,
        flex : 9,
        //borderBottomWidth : 5,
        //backgroundColor : 'pink'
    }
})