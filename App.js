import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Datenbank anlegen"/>
      <Button title="Datenbanken verwalten"/>
      <Button title="Datenbanken löschen"/>
      <Button title="Einstellungen"/>
      <StatusBar style="auto" />
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
