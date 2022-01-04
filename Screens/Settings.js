import { Fragment } from "react";
import { Text, View, StyleSheet } from "react-native";



export function Settings() {
    return (
    <View style={styles.container}>
        <Text>Settings</Text>
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