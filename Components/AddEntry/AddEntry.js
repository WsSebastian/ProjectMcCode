import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from "react-native";
//import './Form.css';
import Firebase from "../Database/Firebase";

import db from "../Database/firebase.config";

/*
class AddEntry extends React.Component{
    constructor(props, folder = 'ordner1') {
        super(props);

        this.state = {
            title: '',
            description: '',
            category: '',
            folder: folder
        };
        //this.getFolders = this.getFolders.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.folders = [];
        this.getFolders();
    }


    getFolders = async() => {

         await db.collection('ordner').onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
            console.log(postData);  // <------
            this.folders.push(postData);
        }, []);

    }

    handleChange(event){

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })


    }

    saveEntry(event) {

        event.preventDefault();
        db.collection('ordner').doc(event.target.folder.value).collection("inhalt").add({
            title: event.target.title.value,
            description: event.target.description.value,
            category: event.target.category.value
        }).then(() => {
            console.log('Item added!');
        })
    }

    render(){
        return(
            <View>
                <div className="form">
                    <form onSubmit={this.saveEntry}>
                        <label>
                            Name:
                            <input name="title" placeholder="Name" type="title" value={this.state.title} onChange={this.handleChange}/>
                        </label>
                        <br />
                        <label>
                            Ordner:
                            <select name="folder" size="1" value={this.state.folder} onChange={this.handleChange}>
                                {
                                    this.folders.map( (item) =>
                                    <option key={item.id} value={item.id}>{item.id}</option>)
                                }
                            </select>
                        </label>
                        <br />
                        <label>
                            Beschreibung:
                            <input name="description" placeholder="Beschreibung" type="description" value={this.state.description} onChange={this.handleChange}/>
                        </label>
                        <br />
                        <label>
                            Kategorie:
                            <select name="category" size="1" value={this.state.category} onChange={this.handleChange}>
                                <option>Buch</option>
                                <option>Karte</option>
                                <option>Dings</option>
                                <option>Bla</option>
                                <option>Test</option>
                            </select>
                        </label>
                        <br />
                        <input type="file" />
                        <br />
                        <input type="submit" value="Absenden"/>
                    </form>
                </div>
            </View>
        );
    }
}
export default AddEntry;
*/

export function AddEntry(props) {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();

    const [folders, setFolders] = useState([]);
    const [folder, setFolder] = useState(props.folder);

    useEffect(() => {
        return db.collection('ordner').onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
            console.log(postData);  // <------
            setFolders(postData);
        });
    }, []);


    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

    }

    function saveEntry(event) {

        event.preventDefault();
        db.collection('ordner').doc(event.target.folder.value).collection("inhalt").add({
            title: event.target.title.value,
            description: event.target.description.value,
            category: event.target.category.value
        }).then(() => {
            console.log('Item added!');
        })
    }


    //Benötigt:
    //Name
    //Beschreibung
    //Kategorie
    //"Datenbank" ("Überordner")
    //Bild hinzufügen
    //BarCode Scannen / ...
    //...
    return(
        <View>
            <div className="form">
                <form onSubmit={saveEntry}>
                    <label>
                        Name:
                        <input name="title" placeholder="Name" type="title" value={title} onChange={handleChange}/>
                    </label>
                    <br />
                    <label>
                        Ordner:
                        <select name="folder" size="1" value={folder} onChange={handleChange}>
                            {
                                folders.map( (item) =>
                                    <option key={item.id} value={item.id}>{item.id}</option>)
                            }
                        </select>
                    </label>
                    <br />
                    <label>
                        Beschreibung:
                        <input name="description" placeholder="Beschreibung" type="description" value={description} onChange={handleChange}/>
                    </label>
                    <br />
                    <label>
                        Kategorie:
                        <select name="category" size="1" value={category} onChange={handleChange}>
                            <option>Buch</option>
                            <option>Karte</option>
                            <option>Dings</option>
                            <option>Bla</option>
                            <option>Test</option>
                        </select>
                    </label>
                    <br />
                    <input type="file" />
                    <br />
                    <input type="submit" value="Absenden"/>
                </form>
            </div>
        </View>
    );
}
