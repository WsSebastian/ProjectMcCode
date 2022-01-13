
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();



export  function AppNavigator() {
  
  return (
  <NavigationContainer >
    <Tab.Navigator>
      <Tab.Screen name="CreateDB" component={CreateDatabase}
        options={{tabBarIcon: ({focused, size, color})}}
      />
      <Tab.Screen name="EditDB" component={EditDatabase}/>
      <Tab.Screen name="Settings" component={Settings}/>
    </Tab.Navigator>
  </NavigationContainer>);
}

