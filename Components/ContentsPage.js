import React, { useState, useEffect } from 'react';
import Firebase from './Firebase'
import { Text, View, StyleSheet } from "react-native";
import db from './firebase.config';
import 'firebase/compat/firestore';

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

    const [blogs,setBlogs]=useState([])
    const fetchBlogs=async()=>{
        const response=db.collection('test');
        const data=await response.get();
        data.docs.forEach(item=>{
            setBlogs([...blogs,item.data()])
        })
    }
    useEffect(() => {
        fetchBlogs();
    }, [])
    return (
        <div className="App">
            {
                blogs && blogs.map(blog=>{
                    return(
                        <div className="blog-container">
                            <h4>{blog.name}</h4>
                            <p>{blog.test}</p>
                        </div>
                    )
                })
            }
        </div>
    );

}
