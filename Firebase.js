import firebase from 'firebase';
import 'firebase/firestore';

const config ={
    apiKey: "AIzaSyDs855GrQZb_jGGyxhrykmZP2QMTKJlO10",
    authDomain: "projectmc-be2e1.firebaseapp.com",
    projectId: "projectmc-be2e1",
    storageBucket: "projectmc-be2e1.appspot.com",
    messagingSenderId: "853126378470",
    appId: "1:853126378470:web:c0edd8b418f596f8db9c27"
}

export default class Firebase{
    static db;

    static init(){
    if(firebase.apps.length === 0){
        firebase.initializeApp(config);
    }
    Firebase.db = firebase.firestore();
    
    }
}