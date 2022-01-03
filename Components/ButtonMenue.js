import { Fragment } from "react";
import { Text, Button, View } from "react-native"

export function Menue(props){
    return(
        <Fragment>
            <Button title="Datenbank anlegen" />
            <Button title="Datenbank verwalten" />
            <Button title="Datenbank löschen" />
            <View style={{position: 'absolute', bottom:100}}>
            <Button title="Einstellungen" />
            </View>
         </Fragment>
    );
}