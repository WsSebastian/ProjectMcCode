import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Menue } from './Components/ButtonMenue.js';

export default function App() {
  return (
    <View style={styles.container}>
      <Menue/>
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
