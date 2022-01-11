import { Text } from "react-native"
import firebase from 'firebase/app'
import 'firebase/firestore'
//import  'firebase/auth'

//import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({

})
const firestore = firebase.firestore();
//const auth = firebase.auth();

//regelt Kommunikation mit firebase Datenbank

function createFolder(name){
    //var uploadTask = storageRef.child('images/user1234/file.txt').put(file, metadata);
}

export function ParagraphTest(props){
    return(<Text>Hello Marina</Text>)    
}