import React, { useState, useEffect } from 'react';
import Firebase from '../Database/Firebase'
import {Text, View, StyleSheet, TextInput, Pressable, ScrollView} from "react-native";
import db from '../Database/firebase.config';

export function ContentsPage({route, navigation}){

    const props = route.params;
    /*
    const [blogs,setBlogs]=useState([])
    const fetchBlogs=async()=>{
        const response=db.collection('ordner').doc('ordner1').collection('inhalt');
        const data=await response.get();
        data.docs.forEach(item=>{
            setBlogs([blogs,item.data()])
        })
    }
    useEffect(() => {
        fetchBlogs();
    }, [])*/

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

    const handleChangeName= (event) => {
        setNewName(event.target.value);
    }

    function editName(){
        db.collection(props.user).doc(props.folder).set({
            title: newName
        }).then(() => {
            console.log('Folder edited!');
        })
    }

    function deleteFolder(){

        db.collection(props.user).doc(props.folder).delete().then(() => {
            console.log('Folder deleted!');
        });
        navigation.goBack();
    }


    return (
        <View style={{
            flex: 1,
            backgroundColor: '#6FA275'
        }}>
            <Text style={styles.text}>{props.title}:</Text>
            <ScrollView className="App" style={styles.container}>
                {
                    contents && contents.map(content=>{
                        return(
                            <Text style={styles.textButton} key={content.title} onPress={() => editEntry(content)}>
                                <Text style={styles.text}>Name: {content.title}</Text>
                                <Text>{'\n'}Beschreibung: {content.description}</Text>
                            </Text>
                        )
                    })
                }
                <TextInput style={styles.textInput} placeholder="Neuer Name" onChange={handleChangeName}/>
                <Pressable style={styles.button} onPress={editName}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 15,
                        fontWeight: "bold",
                        lineHeight: 30
                    }}>Name Ändern</Text>
                </Pressable>
                <Pressable style={styles.deleteButton} onPress={deleteFolder}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 15,
                        fontWeight: "bold",
                        lineHeight: 30
                    }}>Ordner Löschen</Text>
                </Pressable>
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7FB285',
    },
    textButton: {
        backgroundColor: '#7FB285',
        textAlign: 'center',
        color: '#F4F4F8',
        borderRadius: 10,
        elevation: 3,
        borderTopColor: '#363732',
        borderTopWidth: 4
    },
    textInput: {
        backgroundColor: '#6FA275',
        textAlign: 'center',
        color: '#F4F4F8',
        borderRadius: 10,
        elevation: 3,
        borderTopColor: '#363732',
        borderTopWidth: 4
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 80,
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#545C52',
        borderColor: '#363732',
        borderWidth: 2
    },
    deleteButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#DD6D2D',
        borderColor: '#363732',
        borderWidth: 2
    }
});
