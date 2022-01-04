import { CreateDatabase } from './Screens/CreateDatabase.js';
import { Settings } from './Screens/Settings.js';
import { EditDatabase } from './Screens/EditDatabase.js';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Icon from '@expo/vector-icons';
import { ColorPropType } from 'react-native';

const Tab = createBottomTabNavigator();



export default function App() {
  
  return (
  <NavigationContainer >
    <Tab.Navigator>
      <Tab.Screen
      name="CreateDB" 
      component={CreateDatabase}
      options={{title:'Erstellen',
      tabBarIcon: ({focused, size, color}) => 
        <Icon.Ionicons 
          name="create" 
          size={size}
          color={color}
        />
      }}
      />
      <Tab.Screen name="EditDB" component={EditDatabase}
      options={{title:'Bearbeiten',
      tabBarIcon: ({focused, size, color}) => 
        <Icon.MaterialCommunityIcons 
          name="qrcode-edit" 
          size={size}
          color={color}
        />
      }}
      />
      <Tab.Screen name="Settings" component={Settings}
      options={{title:'Einstellungen',
      tabBarIcon: ({focused, size, color}) => 
        <Icon.Ionicons 
          name="ios-settings-sharp" 
          size={size}
          color={color}
        />
      }}
      />
    </Tab.Navigator>
  </NavigationContainer>);
}

