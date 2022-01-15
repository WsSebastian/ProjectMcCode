import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Vibration } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {styles} from "../../App";

export function Scanner({route, navigation}) {

    const props = route.params;

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Suche QR-Code')

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleScannedCode = ({ type, data }) => {
        setScanned(true);
        //wenn unser QR-Code
        if(data.includes("ordner.")){
            //Aufrufen von entsprechender ContentsPage
            const param = (data.split(".").pop());
            const str = param.substring(0, param.length - 1);
            Vibration.vibrate();
            navigation.navigate('Inhalt', {
                folder: str
            })

        }
    };
    if (hasPermission === false) {
        return <Text>Camera: Access denied!</Text>;
    }
    return (
        <View style={styles.containerScanner}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleScannedCode}
                    style={{ height: 400, width: 400 }} />
            </View>
            <Text style={styles.maintext}>{text}</Text>

            {scanned && <Button title={'Scan'} onPress={() => setScanned(false)} color='#DD6D2D' />}
        </View>
    );
}
