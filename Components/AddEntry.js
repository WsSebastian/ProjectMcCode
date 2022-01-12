import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from "react-native";
import './Form.css';
import Firebase from "./Firebase";

import db from "./firebase.config";

export function AddEntry() {
    const [text, setText] = useState();

    const saveEntry = async(e) => {

        await db.add({
            text: text
        })

        setText('')
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
                    <input placeholder="Name" type="text" value={text}/>
                </label>
                <br />
                <label>
                    Beschreibung:
                    <input placeholder="Beschreibung" type="text" value={text}/>
                </label>
                <br />
                <label>
                    Kategorie:
                    <select name="category" size="1">
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