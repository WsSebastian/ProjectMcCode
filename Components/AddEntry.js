import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from "react-native";
import './Form.css';
import Firebase from "./Firebase";

import db from "./firebase.config";


class AddEntry extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            category: ''
        };

        this.handleChange = this.handleChange.bind(this);
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
        db.collection('ordner').doc("ordner1").collection("inhalt").add({
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

/*
export function AddEntry() {
    const [textName, setTextName] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();



    const handleChange = (event) => {
        setTextName(event.target.value)
    }

    function saveEntry() {

        db.collection('regal1').add({
            name: textName,
            category: category
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
        <View style={styles.container}>
            <div className="form">
            <form onSubmit={saveEntry}>
                <label>
                    Name:
                    <input name="name" placeholder="Name" type="text" value={textName} onChange={handleChange}/>
                </label>
                <br />
                <label>
                    Beschreibung:
                    <input name="description" placeholder="Beschreibung" type="text" value={description}/>
                </label>
                <br />
                <label>
                    Kategorie:
                    <select name="category" size="1" value={category}>
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7FB285',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
*/