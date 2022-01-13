import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { Scanner } from './Components/Scanner/scanner';
import { AddEntry } from './Components/AddEntry/AddEntry';
import { ContentsPage } from "./Components/Overview/ContentsPage";
import { Overview } from "./Components/Overview/Overview";
import { StartPage } from "./Components/StartPage/StartPage";

import * as Icon from '@expo/vector-icons';
import { ColorPropType } from 'react-native';

const Tab = createBottomTabNavigator();

//Start Page Navigation zu -> Overview, AddEntry, Scanner

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
      name="StartPage"
      component={StartPage}
      options={{title:'Home'
      }}
      />
      <Tab.Screen name="Overview" component={Overview}
      options={{title:'Übersicht'
      }}
      />
      <Tab.Screen name="ContentTest" children={()=><ContentsPage folder={"ordner1"}/>}
      options={{title:'ContentTest'
      }}
      />
      <Tab.Screen name="ScannerButton" component={Scanner}
      options={{title:'Scan',
        tabBarIcon: ({focused, size, color}) =>
          <Icon.Ionicons
            name="ios-settings-sharp"
            size={size}
            color={color}
          />
      }}
      />
      <Tab.Screen name="AddEntryButton" component={AddEntry}
                  options={{title:'Add Entry',
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

