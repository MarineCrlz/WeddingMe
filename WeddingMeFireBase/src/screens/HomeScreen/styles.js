import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'

    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },

     background: {
         flex: 1,
         height: '100%',
         width: '100%'
         //alignSelf: "center",
         //margin: 30
     },

     header: {
        flexDirection: 'row',
        alignContent : 'space-around',
        justifyContent : 'space-between',
        marginRight : 20,
        marginLeft : 20,
        marginTop : 20
     },

     logo :{
        //position : 'absolute',
     },

     message :{
         height : '20%',
         width : '100%',
         backgroundColor : '#f9dcc4',
         flexDirection : 'column',
         alignItems : 'center',
         justifyContent : 'center',
         //alignContent : 'flex-end',
         //marginBottom : 50,
         //marginTop : 100
     },

     empty : {
        flex : 1
     }
})