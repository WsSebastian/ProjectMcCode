import React, { useState, useEffect } from 'react';
import {StyleSheet} from "react-native";

export function AddEntry() {
    const [text, setText] = useState();

    function setEntry(entry){
        //Add Entry to Database
    }

    return(
        <form onSubmit={setEntry}>
            <label>
                Name:
                <input type="text" value={text}/>
            </label>
            <label>
                Beschreibung:
                <input type="text" value={text}/>
            </label>
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

            <input type="submit" value="Absenden"/>
        </form>

    );

}
