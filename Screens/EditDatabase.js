import { Fragment } from "react";
import { Text, View, StyleSheet } from "react-native";

export function EditDatabase() {
    return (
      <View style={styles.container}>
          <Text>EditDatabase</Text>
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