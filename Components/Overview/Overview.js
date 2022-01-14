import React, { useState, useEffect } from 'react';
//import TestTable from './TestTable.js';
import { Text, View, StyleSheet, TextInput, Button,  } from "react-native";
import db from "../Database/firebase.config";

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

    function downloadQrCode(){

        setWord("ordner." + folder)
        setQrCode
        (`http://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=${size}x${size}&bgcolor=${bgColor}`);
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
        <View>
            <Text>
                {folders.map(item => {
                    return <Text onPress={() => onPress(item)}> {item.label}{'\n'}</Text>
                })}
            </Text>

            <Text>
                {'\n'}
                <TextInput style={{width: '100%'}} placeholder="Datenbankname" onChange={handleChangeNewFolder}/>
                {'\n'}
            </Text>
            <Button title="Erstellen" onPress={submitFolder}/>

        </View>
    )
}