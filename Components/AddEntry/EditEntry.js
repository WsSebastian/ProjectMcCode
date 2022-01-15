import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, TextInput, Button, Pressable,} from "react-native";
import db from "../Database/firebase.config";
import {styles} from "../../App";

export function EditEntry({route, navigation}) {
    const props = route.params;
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState("Buch");

    const [folders, setFolders] = useState([]);
    const [folder, setFolder] = useState({
        label: props.title,
        value: props.id
    });

    function saveEntry() {

        db.collection(props.user).doc(props.folder).collection("inhalt").doc(props.content.id).set({
            title: title,
            description: description
        }).then(() => {
            console.log('Item edited!');
        })
        navigation.goBack();
    }

    function deleteEntry(){
        db.collection(props.user).doc(props.folder).collection('inhalt').doc(props.content.id).delete().then(() => {
            console.log('Folder deleted!');
        });
        navigation.goBack();
    }

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{props.content.title}:</Text>
            <View className="form" style={styles.container}>
                <Text style={styles.textSmall}>
                    Name:
                    {'\n'}
                </Text>
                <TextInput style={styles.textInput} placeholder={props.title} onChangeText={text=>setTitle(text)} keyboardType='default'/>
                <Text style={styles.textSmall}>
                    {'\n'}
                    Beschreibung:
                    {'\n'}
                </Text>
                <TextInput style={styles.textInput} placeholder={props.description} onChangeText={text=>setDescription(text)}  keyboardType='default'/>
                <Text>{'\n'}</Text>
                <Pressable style={styles.button} onPress={saveEntry}>
                    <Text style={styles.textSmall}>Ändern</Text>
                </Pressable>
                <View style={styles.deleteContainer}>

                    <Pressable style={styles.deleteButton} onPress={deleteEntry}>
                        <Text style={styles.textSmall}>Eintrag löschen</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

