import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, TextInput, Button, Linking, ScrollView, Pressable} from "react-native";
import db from "../Database/firebase.config";
import {styles} from "../../App";


//page containing Overview over Structure
export function Overview({route, navigation}){
    const props = route.params;

    const [folders, setFolders] = useState([]);
    const [folder, setFolder] = useState();
    const [newFolder, setNewFolder] = useState();

    const [temp, setTemp] = useState("");
    const [word, setWord] = useState("");
    const [size, setSize] = useState(400);
    const [bgColor, setBgColor] = useState("ffffff");
    const [qrCode, setQrCode] = useState("");

    //Retrieving Folders from firestore
    useEffect(() => {
        return db.collection(props.user).onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach((folder) => postData.push({ ...folder.data(), id: folder.id }));
            console.log(postData, props.user);

            const result = [];
            postData.forEach((folder) => result.push({
                label: folder.title,
                value: folder.id,
            }));
            setFolders(result);
            console.log(folders);

        });
    }, []);

    function downloadQrCode(event){
        console.log(event);
        setWord(event.value);
        setQrCode
        (`http://api.qrserver.com/v1/create-qr-code/?data=ordner.${event.value}!&size=${size}x${size}&bgcolor=${bgColor}`);
        console.log(qrCode);
        Linking.openURL(`http://api.qrserver.com/v1/create-qr-code/?data=ordner.${event.value}!&size=${size}x${size}&bgcolor=${bgColor}`);
    }

    //Navigating to ContentsPage of selected Folder
    function onPress(item){
        navigation.navigate('Inhalt', {
            folder: item.value,
            title: item.label
        })

        return
    }

    //Ads Folder with title to firestore
    function submitFolder(){
        console.log(props.user, newFolder);
        db.collection(props.user).add({
                title: newFolder
        }).then(() => {
            console.log('Item added!');
        })
    }

    return(
        <ScrollView style={styles.container}>
            {folders.map(item => {
                return(
                <View>
                        <Text style={styles.text} onPress={() => onPress(item)}> {item.label}</Text>
                        <Text style={styles.textButton} onPress={() => downloadQrCode(item)}>
                                Open QR-Code
                        </Text>

                </View>)

            })}
            <Text style={styles.textSmallBorder}>
                {'\n'}
                Neue Datenbank erstellen:
            </Text>
            <TextInput style={styles.textInput} placeholder="Datenbankname" onChangeText={text => setNewFolder(text)}/>
            <Pressable style={styles.button} onPress={submitFolder}>
                <Text style={styles.textSmall}>Erstellen</Text>
            </Pressable>

        </ScrollView>
    )
}
