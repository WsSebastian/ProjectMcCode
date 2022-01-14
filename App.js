import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { Scanner } from './Components/Scanner/Scanner';
import { AddEntry } from './Components/AddEntry/AddEntry';
import { ContentsPage } from "./Components/Overview/ContentsPage";
import { Overview } from "./Components/Overview/Overview";
import { StartPage } from "./Components/StartPage/StartPage";

import * as Icon from '@expo/vector-icons';
import { ColorPropType } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
//Start Page Navigation zu -> Overview, AddEntry, Scanner

export default function App() {

    const OverviewStack = createStackNavigator();
    const ScannerStack = createStackNavigator();

    function ScannerStackScreen(){

        return(
            <ScannerStack.Navigator>
                <ScannerStack.Screen name={"Scanner"} component={Scanner}/>
                <ScannerStack.Screen name={"Inhalt"} component={ContentsPage}/>
            </ScannerStack.Navigator>
        )
    }

    function OverviewStackScreen(){

      return(
        <OverviewStack.Navigator>
          <OverviewStack.Screen name={"Ordner"} component={Overview}/>
          <OverviewStack.Screen name={"Inhalt"} component={ContentsPage}/>
        </OverviewStack.Navigator>
      );
    }


    return (
      <NavigationContainer >
        <Tab.Navigator
          screenOptions={({route}) => {
            return{
              tabBarIcon: ({focused, size, color}) =>{
                let icon;

                if(route.name === 'StartPage')
                  icon = focused ? 'home' : 'home-outline';
                else if (route.name === 'ScannerButton')
                  icon = focused ? 'camera' : 'camera-outline';
                else if (route.name === 'Übersicht')
                  icon = focused ? 'documents' : 'documents-outline';
                else if (route.name === 'AddEntryButton')
                    icon = focused ? 'add-circle' : 'add-circle-outline'
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
          <Tab.Screen name="Übersicht" component={OverviewStackScreen}
          />
          <Tab.Screen name="ScannerButton" component={ScannerStackScreen}
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



