import { CreateDatabase } from './Screens/CreateDatabase.js';
import { Settings } from './Screens/Settings.js';
import { EditDatabase } from './Screens/EditDatabase.js';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();



export default function App() {
  
  return (
  <NavigationContainer >
    <Tab.Navigator>
      <Tab.Screen name="CreateDB" component={CreateDatabase}/>
      <Tab.Screen name="EditDB" component={EditDatabase}/>
      <Tab.Screen name="Settings" component={Settings}/>
    </Tab.Navigator>
  </NavigationContainer>);
}

