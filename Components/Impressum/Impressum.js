import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Linking, ScrollView  } from "react-native";
import {styles} from "../../App";

export function Impressum(){

    return(
      <View style={styles.container}>
          <Text style={styles.textSmall}>
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
