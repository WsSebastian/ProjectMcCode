import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, TextInput, Button, Pressable, Image} from "react-native";
import RNPickerSelect from 'react-native-picker-select';

import db from "../Database/firebase.config";
import {styles} from "../../App";

export function AddEntry({route, navigation}) {
    const props = route.params;
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState("Buch");

    const [folders, setFolders] = useState([]);
    const [folder, setFolder] = useState({
        label: props.title,
        value: props.id
    });
//Retrieving all folders from firestore
    useEffect(() => {
        console.log(route.params, props.user);
        return db.collection(props.user).onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach((folder) => postData.push({ ...folder.data(), id: folder.id }));
            console.log(postData);

            const result = [];
            postData.forEach((folder) => result.push({
                label: folder.title,
                value: folder.id,
            }));
            setFolders(result);
            console.log(folders);
        });
    }, []);

//Upload Entry into firestore
    function saveEntry() {
        console.log(title, description, category, folder)
        //event.preventDefault();
        db.collection(props.user).doc(folder).collection("inhalt").add({
            title: title,
            description: description
        }).then(() => {
            console.log('Item added!');
        })
        setTitle("");
        setDescription("");
    }

    // Create form for the user
    return(
        <View style={styles.container}>
            <View className="form" style={styles.container}>
                <Text style={styles.textSmall}>
                    Name:
                    {'\n'}
                </Text>
                <TextInput style={styles.textInput} placeholder="Name" onChangeText={text=>setTitle(text)} keyboardType='default'/>
                <Text style={styles.textSmall}>
                    {'\n'}
                    Ordner:
                    {'\n'}
                </Text>
                <View style={styles.picker}><RNPickerSelect style={{
                    inputAndroid: {
                        color: '#8FC295',
                    },
                    inputIOS: {color: '#8FC295'}
                }} value={folder} onValueChange={currentFolder => setFolder(currentFolder)} items={folders}/></View>

                <Text style={styles.textSmall}>
                    {'\n'}
                    Beschreibung:
                    {'\n'}
                </Text>
                <TextInput style={styles.textInput} placeholder="Beschreibung" onChangeText={text=>setDescription(text)}  keyboardType='default'/>
                <Text>{'\n'}</Text>
                <Pressable style={styles.button} onPress={saveEntry}>
                    <Text style={styles.textSmall}>Hinzufügen</Text>
                </Pressable>
            </View>
        </View>
    );
}

