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
    <Tab.Navigator
      screenOptions={({route}) => {
        return{
          tabBarIcon: ({focused, size, color}) =>{
            let icon;
          
            if(route.name === 'CreateDB')
              icon = focused ? 'add-circle' : 'add-circle-outline';
            else if (route.name === 'EditDB')
              icon = focused ? 'construct' : 'construct-outline';
            else if (route.name === 'Settings')
              icon = focused ? 'ellipsis-vertical' : 'ellipsis-vertical-outline';
            return(
              <Icon.Ionicons
                name={icon}
                size={size}
                color={color}
              />
            )
          }
        }
      }}
      tabBarOptions={{
        activeTintColor: 'green'
      }}
      >
      <Tab.Screen
      name="CreateDB" 
      component={CreateDatabase}
      options={{title:'Erstellen'
      }}
      />
      <Tab.Screen name="EditDB" component={EditDatabase}
      options={{title:'Bearbeiten'
      }}
      />
      <Tab.Screen name="Settings" component={Settings}
      options={{title:'Einstellungen'
      }}
      />
    </Tab.Navigator>
  </NavigationContainer>);
}

