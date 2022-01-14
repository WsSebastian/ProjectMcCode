import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from "react-native";
//import TestTable from '../Overview/TestTable';

export function StartPage() {
    return (
        <View style={styles.container}>
            <Text>Willkommen</Text>
            <Text>Hier Bild einfügen!</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7FB285',
        alignItems: 'center',
        justifyContent: 'center',
    },
});