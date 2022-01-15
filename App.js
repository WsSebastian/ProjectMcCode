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
const auth = getAuth();
signInAnonymously(auth)
    .then(() => {
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

export default function App() {


    const [user, setUser] = useState("");

    const OverviewStack = createStackNavigator();
    const ScannerStack = createStackNavigator();
    const EntryStack = createStackNavigator();

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
                    headerTintColor: '#8FC295',
                    headerStyle: styles.header
                }}/>
                <ScannerStack.Screen initialParams={{user: user}} name={"Inhalt"} component={ContentsPage} options={{
                    headerTintColor: '#8FC295',
                    headerStyle: styles.header
                }}/>
                <ScannerStack.Screen initialParams={{user: user}} name={"Bearbeiten"} component={EditEntry} options={{
                    headerTintColor: '#8FC295',
                    headerStyle: styles.header
                }}/>
            </ScannerStack.Navigator>
        )
    }

    function OverviewStackScreen(){

      return(
        <OverviewStack.Navigator>
          <OverviewStack.Screen initialParams={{user: user}} name={"Ordner"} component={Overview} options={{
              headerTintColor: '#8FC295',
              headerStyle: styles.header
          }}/>
          <OverviewStack.Screen initialParams={{user: user}} name={"Inhalt"} component={ContentsPage} options={{
              headerTintColor: '#8FC295',
              headerStyle: styles.header
          }}/>
            <ScannerStack.Screen initialParams={{user: user}} name={"Bearbeiten"} component={EditEntry} options={{
                headerTintColor: '#8FC295',
                headerStyle: styles.header
            }}/>
        </OverviewStack.Navigator>
      );
    }

    function EntryStackScreen(){
        return(
            <EntryStack.Navigator>
                <EntryStack.Screen name={"Eintrag"} initialParams={{user: user}} component={AddEntry} options={{
                    headerTintColor: '#8FC295',
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
                        activeTintColor: '#8FC295',
                    }}
                >
                    <Tab.Screen
                        name="StartPage"
                        component={StartPage}
                        options={{
                            title:'Home',
                            headerStyle: styles.header,
                            headerTintColor: '#8FC295',
                            tabBarInactiveBackgroundColor: '#000000',
                            tabBarActiveBackgroundColor: '#181C18'
                        }}
                    />
                    <Tab.Screen name="Übersicht" component={OverviewStackScreen} options={{
                        headerShown: false,
                        tabBarInactiveBackgroundColor: '#000000',
                        tabBarActiveBackgroundColor: '#181C18',
                    }}
                    />
                    <Tab.Screen name="ScannerButton" component={ScannerStackScreen}
                                options={{
                                    title:'Scan',
                                    headerShown: false,
                                    tabBarInactiveBackgroundColor: '#000000',
                                    tabBarActiveBackgroundColor: '#181C18',
                                }}
                    />
                    <Tab.Screen name="AddEntryButton" component={EntryStackScreen}
                                options={{
                                    title:'Add Entry',
                                    headerShown: false,
                                    tabBarInactiveBackgroundColor: '#000000',
                                    tabBarActiveBackgroundColor: '#181C18'
                                }}
                    />
                    <Tab.Screen name="Impressum" component={Impressum} options={{

                        headerStyle: styles.header,
                        headerTintColor: '#8FC295',
                        tabBarInactiveBackgroundColor: '#000000',
                        tabBarActiveBackgroundColor: '#181C18'
                    }}
                    />
                </Tab.Navigator>
            </NavigationContainer>);

    }


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    containerDes:{
        backgroundColor: '#1A231B',
        borderRadius: 10
    },
    containerScanner: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker:{
        backgroundColor: '#1B241C',
        alignItems: 'center',
        borderRadius: 10
    },
    textButton: {
        backgroundColor: '#1B241C',
        textAlign: 'center',
        color: '#F4F4F8',
        borderRadius: 10
    },
    textInput: {
        backgroundColor: '#1B241C',
        textAlign: 'center',
        color: '#F4F4F8',
        borderRadius: 10
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 80,
        borderTopColor: '#010101',
        color: '#8FC295',
        borderTopWidth: 4
    },
    textSmall: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: "bold",
        lineHeight: 30,
        color: '#8FC295',
    },
    textSmallDes: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: "bold",
        lineHeight: 30,
        backgroundColor: '#1A231B',
        color: '#8FC295',
    },
    textSmallBorder: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: "bold",
        lineHeight: 30,
        borderTopColor: '#010101',
        color: '#8FC295',
        borderTopWidth: 4
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#1B241C',
        borderColor: '#181C18',
        borderWidth: 2,
    },
    deleteButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#293B2B',
        borderColor: '#363732',
        borderWidth: 2
    },
    deleteContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    maintext: {
        fontSize: 16,
        margin: 20,
        color: '#8FC295'
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: '#DD6D2D'
    },
    header: {
        backgroundColor: '#000000',
    }

});


