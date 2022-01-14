import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Linking, ScrollView  } from "react-native";

export function Impressum(){


    return(
      <View style={styles.container}>
          <Text>Impressumstext</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7FB285',
    },
    textButton: {
        backgroundColor: '#4F8255',
        textAlign: 'center',
        color: '#F4F4F8'
    },
    textInput: {
        backgroundColor: '#4F8255',
        textAlign: 'center',
        color: '#F4F4F8',
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: "bold",
        lineHeight: 100
    }
});