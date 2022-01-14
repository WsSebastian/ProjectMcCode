import React, { useState, useEffect } from 'react';
import Firebase from '../Database/Firebase'
import { Text, View, StyleSheet } from "react-native";
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

    useEffect(() => {
        return db.collection('ordner').doc(props.folder).collection('inhalt').onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
            console.log(postData);  // <------
            setContents(postData);
        });
    }, []);

    return (
        <View className="App" style={styles.container}>
            {
                contents && contents.map(content=>{
                    return(
                        <Text key={content.title} className="contents-container">
                            <Text>{content.title}</Text>
                            <Text>{content.description}</Text>
                        </Text>
                    )
                })
            }
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7FB285',
    },
    textButton: {
        backgroundColor: '#6FA265',
        textAlign: 'center',
        color: '#F4F4F8'
    },
    textInput: {
        backgroundColor: '#6FA265',
        textAlign: 'center',
        color: '#F4F4F8',
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: "bold",
        lineHeight: 100
    },
    header: {
        backgroundColor: '#363732'
    }

});
