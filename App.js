import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { Scanner } from './Components/Scanner/Scanner';
import { AddEntry } from './Components/AddEntry/AddEntry';
import { ContentsPage } from "./Components/Overview/ContentsPage";
import { Overview } from "./Components/Overview/Overview";
import { StartPage } from "./Components/StartPage/StartPage";

import * as Icon from '@expo/vector-icons';
import {ColorPropType, StyleSheet, View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {Impressum} from "./Components/Impressum/Impressum";
import {EditEntry} from "./Components/AddEntry/EditEntry";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged, signInAnonymously} from "firebase/auth";

const Tab = createBottomTabNavigator();
//Start Page Navigation zu -> Overview, AddEntry, Scanner

export default function App() {

    const [user, setUser] = useState("");

    const OverviewStack = createStackNavigator();
    const ScannerStack = createStackNavigator();
    const EntryStack = createStackNavigator();

    const auth = getAuth();
    signInAnonymously(auth)
        .then(() => {
            // Signed in..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
        });

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setUser(uid);
        } else {
        }
    });


    function ScannerStackScreen(){

        return(
            <ScannerStack.Navigator>
                <ScannerStack.Screen initialParams={{user: user}} name={"Scanner"} component={Scanner} options={{
                    headerTintColor: '#DD6D2D',
                    headerStyle: styles.header
                }}/>
                <ScannerStack.Screen initialParams={{user: user}} name={"Inhalt"} component={ContentsPage} options={{
                    headerTintColor: '#DD6D2D',
                    headerStyle: styles.header
                }}/>
                <ScannerStack.Screen initialParams={{user: user}} name={"Bearbeiten"} component={EditEntry} options={{
                    headerTintColor: '#DD6D2D',
                    headerStyle: styles.header
                }}/>
            </ScannerStack.Navigator>
        )
    }

    function OverviewStackScreen(){

      return(
        <OverviewStack.Navigator>
          <OverviewStack.Screen initialParams={{user: user}} name={"Ordner"} component={Overview} options={{
              headerTintColor: '#DD6D2D',
              headerStyle: styles.header
          }}/>
          <OverviewStack.Screen initialParams={{user: user}} name={"Inhalt"} component={ContentsPage} options={{
              headerTintColor: '#DD6D2D',
              headerStyle: styles.header
          }}/>
            <ScannerStack.Screen initialParams={{user: user}} name={"Bearbeiten"} component={EditEntry} options={{
                headerTintColor: '#DD6D2D',
                headerStyle: styles.header
            }}/>
        </OverviewStack.Navigator>
      );
    }

    function EntryStackScreen(){
        return(
            <EntryStack.Navigator>
                <EntryStack.Screen name={"Eintrag"} initialParams={{user: user}} component={AddEntry} options={{
                    headerTintColor: '#DD6D2D',
                    headerStyle: styles.header
                }}/>
            </EntryStack.Navigator>
        )
    }


        return (
            <NavigationContainer>
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
                                    icon = focused ? 'add-circle' : 'add-circle-outline';
                                else if (route.name === 'Impressum'){
                                    icon = focused ? 'file-tray-full' : 'file-tray-full-outline';
                                }
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
                        activeTintColor: '#DD6D2D',
                    }}
                >
                    <Tab.Screen
                        name="StartPage"
                        component={StartPage}
                        options={{
                            title:'Home',
                            headerStyle: styles.header,
                            headerTintColor: '#DD6D2D',
                            tabBarInactiveBackgroundColor: '#363732',
                            tabBarActiveBackgroundColor: '#545C52'
                        }}
                    />
                    <Tab.Screen name="Übersicht" component={OverviewStackScreen} options={{
                        headerShown: false,
                        tabBarInactiveBackgroundColor: '#363732',
                        tabBarActiveBackgroundColor: '#545C52'
                    }}
                    />
                    <Tab.Screen name="ScannerButton" component={ScannerStackScreen}
                                options={{
                                    title:'Scan',
                                    headerShown: false,
                                    tabBarInactiveBackgroundColor: '#363732',
                                    tabBarActiveBackgroundColor: '#545C52',
                                }}
                    />
                    <Tab.Screen name="AddEntryButton" component={EntryStackScreen}
                                options={{
                                    title:'Add Entry',
                                    headerShown: false,
                                    tabBarInactiveBackgroundColor: '#363732',
                                    tabBarActiveBackgroundColor: '#545C52'
                                }}
                    />
                    <Tab.Screen name="Impressum" component={Impressum} options={{

                        headerStyle: styles.header,
                        headerTintColor: '#DD6D2D',
                        tabBarInactiveBackgroundColor: '#363732',
                        tabBarActiveBackgroundColor: '#545C52'
                    }}
                    />
                </Tab.Navigator>
            </NavigationContainer>);

    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7FB285',
    },
    textButton: {
        backgroundColor: '#4F8255',
        textAlign: 'center',
        color: '#F4F4F8'
    },
    textInput: {
        backgroundColor: '#4F8255',
        textAlign: 'center',
        color: '#F4F4F8',
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: "bold",
        lineHeight: 100
    },
    header: {
        backgroundColor: '#363732'
    }

});


