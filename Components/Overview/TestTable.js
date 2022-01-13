/*import React, { useState } from "react";
//import "./testTable.css";
import data from "./mock-data.json"
import {nanoid} from "nanoid";

const DatabaseTable = () =>{

    const [databases, setDatabases] = useState(data);
    const [addFormData, setAddFormData] = useState({
        name: ""
    });

    const handleAddDB = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newDbData = {...addFormData}; 
        newDbData[fieldName] = fieldValue;

        setAddFormData(newDbData);
    }

    const handleAddDBSubmit = (e) => {
        e.preventDefault();

        const newDatabase = {
            id: nanoid(),
            name: e.target.value
        }
        const newDatabases = [...databases, newDatabase];
        setDatabases(newDatabases);
    };

    

    return (<div className="database-container">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {databases.map((databases) => (
                 <tr>
                     <td>{databases.name}</td>
                 </tr>   
                ))}
            </tbody>
        </table>
        <h2>Neue Datenbank anlegen</h2>
        <form onSubmit={handleAddDBSubmit}>
            <input 
            type="text" 
            name="databaseName"
            required="required" 
            placeholder="Name der Datenbank"
            onChange={handleAddDB}
            >   
            </input>
            <button type="submit">
                Datenbank anlegen.
            </button>
        </form>
    </div>)
};

export default DatabaseTable;*/