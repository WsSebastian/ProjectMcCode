import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from "react-native";
import TestTable from '../Overview/TestTable';

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
        backgroundColor: '#81DAF5',
        alignItems: 'center',
        justifyContent: 'center',
    },
});