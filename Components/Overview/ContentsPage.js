import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, TextInput, Pressable, ScrollView} from "react-native";
import db from '../Database/firebase.config';
import {styles} from "../../App";

export function ContentsPage({route, navigation}){

    const props = route.params;

    const [contents, setContents] = useState([]);
    const [newName, setNewName] = useState();

    useEffect(() => {
        return db.collection(props.user).doc(props.folder).collection('inhalt').onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
            console.log(postData);  // <------
            setContents(postData);
        });
    }, []);

    function editEntry(content) {

        navigation.navigate('Bearbeiten', {
            content: content,
            folder: props.folder
        })
    }

    function editName(){
        db.collection(props.user).doc(props.folder).set({
            title: newName
        }).then(() => {
            console.log('Folder edited!');
        })
    }

    function deleteFolder(){

        contents.forEach((content) => db.collection(props.user).doc(props.folder).collection('inhalt').doc(content.id).delete());
        db.collection(props.user).doc(props.folder).delete().then(() => {
            console.log('Folder deleted!');
        });
        navigation.goBack();
    }


    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.title}:</Text>
            <ScrollView className="App" style={styles.container}>
                {
                    contents && contents.map(content=>{
                        return(
                            <Text style={styles.textSmallBorder} key={content.title} onPress={() => editEntry(content)}>
                                <Text style={styles.text}>Name: {content.title}</Text>
                                <Text>{'\n'}Beschreibung: {content.description}</Text>
                            </Text>
                        )
                    })
                }
            </ScrollView>
            <View style={styles.deleteContainer}>
                <TextInput style={styles.textInput} placeholder="Neuer Name" onChangeText={text=>setNewName(text)} />
                <Pressable style={styles.button} onPress={editName}>
                    <Text style={styles.textSmall}>Name Ändern</Text>
                </Pressable>
                <Pressable style={styles.deleteButton} onPress={deleteFolder}>
                    <Text style={styles.textSmall}>Ordner Löschen</Text>
                </Pressable>
            </View>
        </View>
    );

}
