import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button,  } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
//import './Form.css';
import Firebase from "../Database/Firebase";

import db from "../Database/firebase.config";
import {TouchableOpacity} from "react-native-web";

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
    const [category, setCategory] = useState("Buch");

    const [folders, setFolders] = useState([]);
    const [folder, setFolder] = useState({
        label: props.title,
        value: props.id
    });

    useEffect(() => {
        return db.collection('ordner').onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach((folder) => postData.push({ ...folder.data(), id: folder.id }));
            console.log(postData);

            const result = [];
            postData.forEach((folder) => result.push({
                label: folder.title,
                value: folder.id,
            }));
            setFolders(result);
            console.log(folders);
        });
    }, []);


    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }
    /*
    const handleChangeFolder = (event) => {
        setFolder(event.target.value);
    }
    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    }*/

    function saveEntry() {

        console.log(title, description, category, folder)
        //event.preventDefault();
        db.collection('ordner').doc(folder).collection("inhalt").add({
            title: title,
            description: description
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
            <View className="form">
                <Text>
                    Name:
                    {'\n'}
                </Text>
                <TextInput style={{width: '100%'}} placeholder="Name" onChange={handleChangeTitle} keyboardType='default'/>
                <Text>
                    {'\n'}
                    Ordner:
                    {'\n'}
                </Text>
                <RNPickerSelect value={folder} onValueChange={currentFolder => setFolder(currentFolder)} items={folders}/>
                <Text>
                    {'\n'}
                    Beschreibung:
                    {'\n'}
                </Text>
                <TextInput tyle={{width: '100%'}} placeholder="Beschreibung" onChange={handleChangeDescription} keyboardType='default'/>
                <Text>{'\n'}</Text>
                <Button title="Absenden" onPress={saveEntry}/>
            </View>
        </View>
    );
}

/*

<Picker name="category" size="1" value={category} onChange={handleChangeCategory}>
                        <Picker.item>Buch</Picker.item>
                        <Picker.item>Karte</Picker.item>
                        <Picker.item>Dings</Picker.item>
                        <Picker.item>Bla</Picker.item>
                        <Picker.item>Test</Picker.item>
                    </Picker>

                    <Picker selectedValue={folder} onValueChange={currentFolder => setFolder(currentFolder)}>
                        {
                            folders.map( (item) =>
                                <Picker.item label={item.id} value={item.id}/>)
                        }
                    </Picker>

                    folders.map( (item) =>
                                <Picker.item label={item.id} value={item.id}/>)

 */