
import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyABz-LvD_oarQ4GGeQm_glp3WOs5qxIRxU',
  authDomain: 'weddingme-13746.firebaseapp.com',
  databaseURL: 'https://weddingme-13746.firebaseio.com',
  projectId: 'weddingme-13746',
  storageBucket: 'weddingme-13746.appspot.com',
  messagingSenderId: '735298178567',
  appId: '1:735298178567:android:7d359a9b6ff13a7c98a4a2',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };