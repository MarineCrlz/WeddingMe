import { firebase } from './config'

//FICHIER INUTILE A ENLEVER
class FireBaseAPI {

    fetchUser(){
        const user = ''
        firebase.
        firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then(firestoreDocument => {
                if (firestoreDocument.exists) {
                    user = firestoreDocument.data()
                    // this.setUserId(user.id)
                    // this.setUser(user)
                    console.log("Infos user")
                    console.log(user)
                    return(user)
                }
            });
      }

      loadGuest(){
          firebase.
            firestore()
            .collection('guest')
            .where("idUser", "==", this.state.userId)
            .onSnapshot(
                (querySnapshot) => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                this.setGuest(newEntities)
                this.setGuestFilter(newEntities)
                this.useCoupleFilter(this.state.guestFilter)
                //TEST
                console.log("Affichage des guests")
                console.log(newEntities)
                console.log(this.state.guestUser)
                },
            error => {
                console.log(error)
            }
            )
            console.log("Qui sont les guests user ?")
            console.log(this.state.guestUser)
      }

    
}

export default FireBaseAPI


