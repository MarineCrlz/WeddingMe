import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    //Conteneur principal
    container: {
        flex: 1,
        alignItems: 'center'

    },

    //TextInput
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

    //Image de fond
     background: {
         flex: 1,
         height: '100%',
         width: '100%'
         //alignSelf: "center",
         //margin: 30
     },

     //Conteneur du header
     header: {
        flexDirection: 'row',
        alignContent : 'space-around',
        justifyContent : 'flex-end',
        marginRight : 20,
        marginLeft : 20,
        marginTop : 20
     },

     //logo
     logo :{
     },

     //Conteneur de l'affichage d'accueil personnalisé
     message :{
         height : '20%',
         width : '100%',
         backgroundColor : '#f9dcc4',
         flexDirection : 'column',
         alignItems : 'center',
         justifyContent : 'center',
     },

     //Texte de l'affichage personnalisé
     text :{
        fontSize : 20,
        color : 'black',
     },
})