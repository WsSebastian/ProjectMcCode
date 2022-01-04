import { Fragment } from "react";
import { Text, View, StyleSheet } from "react-native";

export function CreateDatabase() {
    return (
        <View style={styles.container}>
            <Text>CreateDatabase</Text>
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