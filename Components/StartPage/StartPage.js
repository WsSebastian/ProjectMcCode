import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from "react-native";
import {styles} from "../../App";

export function StartPage() {


    return (
        <View style={styles.container}>
            <Image source={require('./MySort_Logo.png')} />
        </View>

    );
}


