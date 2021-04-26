import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        width : '100%',
        alignItems: 'center',
        backgroundColor: '#f9dcc4'
    },

    header: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center'
    },

    donnees:{
        marginTop: 30,
        justifyContent : 'space-between'

    },

    donneesSpe: {
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent : "space-between",
        marginBottom: 20
    },

    input: {
        height: 48,
        borderRadius: 5,
        backgroundColor: 'white',
        marginBottom: 10,
        marginLeft : 30,
        paddingLeft: 16,
        width: '50%'
    },

    button: {
        backgroundColor: '#fec89a',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        width: 200 
    },
})