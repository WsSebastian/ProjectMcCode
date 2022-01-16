import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from "react-native";
import {styles} from "../../App";

export function StartPage() {


    return (
        <View style={styles.containerScanner}>
            <Image
                style={{width: 400, height: 400}}
                source={require('./logoHomeScreen.png')} />
        </View>

    );
}


