import React, { useState, useEffect } from 'react';
//import TestTable from './TestTable.js';
import { Text, View, StyleSheet, TextInput, Button,  } from "react-native";
import db from "../Database/firebase.config";

//page containing Overview over Structure
export function Overview(){

    const [folders, setFolders] = useState([]);
    const [folder, setFolder] = useState();

    useEffect(() => {
        return db.collection('ordner').onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach((folder) => postData.push({ ...folder.data(), id: folder.id }));
            console.log(postData);

            postData.forEach((folder) => setFolders([...folders, {
                label: folder.id,
                value: folder.id
            }]))
        });
    }, []);

    function onPress(item){
        // do stuff

        //navigation.navigate('./ContentsPage.js', {
        //   folder: item.value
        //})

        return
    }

    return(
        <View>
            <Text>
                {folders.map(item => {
                    return <Text onPress={() => onPress(item)}> {item.value}</Text>
                })}
            </Text>
        </View>
    )
}