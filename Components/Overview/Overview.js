import React, { useState, useEffect } from 'react';
//import TestTable from './TestTable.js';
import {Text, View, StyleSheet, TextInput, Button, Linking, ScrollView, Pressable} from "react-native";
import db from "../Database/firebase.config";
import {TouchableHighlight} from "react-native-web";


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


    useEffect(() => {
        return db.collection(props.user).onSnapshot((snapshot) => {
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
            folder: item.value,
            title: item.label
        })

        return
    }

    const handleChangeNewFolder= (event) => {
        setNewFolder(event.target.value);
    }

    function submitFolder(){
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
            <Text style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: "bold",
                lineHeight: 25,
                borderTopColor: '#363732',
                borderTopWidth: 4
            }}>
                {'\n'}
                Neue Datenbank erstellen:
            </Text>
            <TextInput style={styles.textInput} placeholder="Datenbankname" onChange={handleChangeNewFolder}/>
            <Pressable style={styles.button} onPress={submitFolder}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 15,
                    fontWeight: "bold",
                    lineHeight: 30
                }}>Erstellen</Text>
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
        backgroundColor: '#6FA275',
        textAlign: 'center',
        color: '#F4F4F8',
        borderRadius: 10
    },
    textInput: {
        backgroundColor: '#6FA275',
        textAlign: 'center',
        color: '#F4F4F8',
        borderRadius: 10
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 80,
        borderTopColor: '#363732',
        borderTopWidth: 4
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#545C52',
        borderColor: '#363732',
        borderWidth: 2
    }
});