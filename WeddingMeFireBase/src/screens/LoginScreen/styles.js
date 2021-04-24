import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    //Conteneur principal
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f9dcc4'
    },

    //Image du logo WeddingMe
    logo: {
        flex: 1,
        height: 120,
        width: 120,
        alignSelf: "center",
        margin: 30
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

    //TouchableOpacity du bouton de connexion
    button: {
        backgroundColor: '#fec89a',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },

    //Texte du TouchableOpacity
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },

    //Conteneur du footer
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    //Texte du footer
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },

    //Texte du footer avec lien vers la page d'inscription
    footerLink: {
        color: "#ffff",
        fontWeight: "bold",
        fontSize: 16
    }
})