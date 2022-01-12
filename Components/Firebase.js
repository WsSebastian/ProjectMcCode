import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';

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
    static content;
    static data;

    static init(){
    if(firebase.apps.length === 0){
        firebase.initializeApp(config);
    }

    Firebase.db = firebase.firestore();
    Firebase.content = Firebase.db.collection('test');
    
    }


    static getContents(){
        //const content = db.collection('test');
        //const query = Firebase.content.
        Firebase.db.collection('test').onSnapshot((snapshot) => {
            const query = [];
            snapshot.forEach((doc) => query.push({...doc.data(), id: doc.id}));
            Firebase.data = query;
        });

        //const [collection] = useCollectionData(query);
        return Firebase.data
    }

}