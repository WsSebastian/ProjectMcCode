import React, { useState, useEffect } from 'react';
import Firebase from './Firebase'
import { Text, View, StyleSheet } from "react-native";
import db from './firebase.config';
/*
export function ContentsPage(){

    const currentCollection = Firebase.getContents();

    function ColContent(props){
        const text = props.currentCollection;

        return (
            <div className={'test'}>
            <p>{text}</p>
            </div>
        )
    }

    return(
        <View>
            <div>
                {currentCollection && currentCollection.map(cont => <ColContent key={cont.id} currentCollection={cont}/>)}
            </div>

        </View>
    )
}*/
export function ContentsPage(){

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
        return db.collection('ordner').doc('ordner1').collection('inhalt').onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
            console.log(postData);  // <------
            setContents(postData);
        });
    }, []);

    return (
        <div className="App">
            {
                contents && contents.map(blog=>{
                    return(
                        <li key={blog.title} className="contents-container">
                            <h4>{blog.title}</h4>
                            <p>{blog.description}</p>
                            <p>{blog.category}</p>
                        </li>
                    )
                })
            }
        </div>
    );

}
