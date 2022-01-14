import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Linking, ScrollView  } from "react-native";

export function Impressum(){


    return(
      <View style={styles.container}>
          <Text style={styles.text}>
              Vertretung durch:{'\n'}
              Jonas Peltzer{'\n'}
              Sebastian Schleiken{'\n'}{'\n'}

              Kontakt:{'\n'}
              E-Mail:   {'\n'}
              jonas.peltzer@stud.hs-ruhrwest.de{'\n'}
              sebastian.schleiken@stud.hs-ruhrwest.de{'\n'}
              Tel.: -{'\n'}
          </Text>
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
        textAlign: 'left',
        fontSize: 15,
        fontWeight: "bold",
        lineHeight: 20,
        color: '#363732'
    }
});