import React, { useState, useEffect } from 'react';
//import TestTable from './TestTable.js';
import {Text, View, StyleSheet, TextInput, Button, Linking, ScrollView, Pressable} from "react-native";
import db from "../Database/firebase.config";
import {TouchableHighlight} from "react-native-web";

//page containing Overview over Structure
export function Overview({navigation}){

    const [folders, setFolders] = useState([]);
    const [folder, setFolder] = useState();
    const [newFolder, setNewFolder] = useState();

    const [temp, setTemp] = useState("");
    const [word, setWord] = useState("");
    const [size, setSize] = useState(400);
    const [bgColor, setBgColor] = useState("ffffff");
    const [qrCode, setQrCode] = useState("");


    useEffect(() => {
        return db.collection('ordner').onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach((folder) => postData.push({ ...folder.data(), id: folder.id }));
            console.log(postData);

            /*
            postData.forEach((folder) => setFolders([...folders, {
                label: folder.title,
                value: folder.title
            }]))
            console.log(folders)*/
            const result = [];
            postData.forEach((folder) => result.push({
                label: folder.title,
                value: folder.id,
            }));
            setFolders(result);
            console.log(folders);

            /*
            const result = postData.reduce((a, folder) => {
                a.test.push({
                    label: folder.title,
                    value: folder.title
                }, {test: []});
                return a.test;
            });
            setFolders(result);
            */

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

    function onPress(item){
        // do stuff

        navigation.navigate('Inhalt', {
           folder: item.value
        })

        return
    }

    const handleChangeNewFolder= (event) => {
        setNewFolder(event.target.value);
    }

    function submitFolder(){
        db.collection('ordner').add({
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
            <Text>
                {'\n'}
            </Text>
            <TextInput style={styles.textInput} placeholder="Datenbankname" onChange={handleChangeNewFolder}/>
            <Pressable style={styles.button} onPress={submitFolder}>
                <Text style={styles.text}>Erstellen</Text>
            </Pressable>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7FB285',
    },
    textButton: {
        backgroundColor: '#4F8255',
        textAlign: 'center',
        color: '#F4F4F8'
    },
    textInput: {
        backgroundColor: '#4F8255',
        textAlign: 'center',
        color: '#F4F4F8',
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: "bold",
        lineHeight: 100
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#363732',
    }
});