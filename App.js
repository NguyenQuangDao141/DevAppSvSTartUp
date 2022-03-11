import React, { useState } from 'react';
import {
  StyleSheet
} from 'react-native'
import DashBoard from './screens/DashBoard';
import Option from './screens/Option';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Loading from './screens/Loading';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from './navigations/AuthContext'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Information from './screens/Information';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DashStack (){
  return(
    <Stack.Navigator>
      <Stack.Screen
        name='Dash'
        component={DashBoard}
        options ={{headerShown :false }}
        />
      <Stack.Screen
        name='Infor'
        component={Information}
        options = {{headerShown: false}}
        />
    </Stack.Navigator>
  )
}

const App = () => {
  const [user, setUser] = useState('')
  return (
    <AuthContext.Provider value={{ user, setUser }}>
    <NavigationContainer>
      {user ?
          <Tab.Navigator
            screenOptions={stylesNavigation}
            tabBarOptions={{
              activeTintColor: '#0AC4BA',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="DashSt" component={DashStack} options={{title:'Trang chủ'}}/>
            <Tab.Screen name="Option" component={Option} options={{title:'Tùy chọn'}}/>

          </Tab.Navigator> :

      <Stack.Navigator >
              <Stack.Screen
                options={{ headerShown: false }}
                name="home"
                component={Welcome} />
              <Stack.Screen
                options={{
                  headerBackImage: () => (<Image style={{ width: 30, height: 30 }} source={require('./assets/pictures/back.png')} />),
                  headerStyle: { elevation: 0, borderBottomColor: '#FFF', height: 75 },
                  headerTitle: false,
                  headerLeftContainerStyle: {
                    alignContent: 'center',
                    marginLeft: 15,
                    marginTop: 20,
                  }
                }}
                name="Login"
                component={Login} />
              <Stack.Screen
                options={{ headerShown: false }}
                name="loading"
                component={Loading} />
              
      </Stack.Navigator>
      }
    </NavigationContainer>
    </AuthContext.Provider >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
const stylesNavigation = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    if (route.name == "DashSt") {
      iconName = focused
        ? 'shield-home'
        : 'shield-home-outline';
    } else if (route.name == "Option") {
      iconName = focused ? 'gamepad-circle' : 'gamepad-circle-outline';
    }
    return <MCIcons name={iconName} size={size} color={color} />;
  },
})
const stylesHeaderBarOption = {
  title: 'Tùy chọn',
  headerStyle: {
    backgroundColor:'#0AC4BA'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center'
}

const stylesHeaderBarDash = (navigation)=>({
  title: 'Trang chủ',
  headerStyle: {
    backgroundColor: '#0AC4BA',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    color:'#fff'
  },
  headerTitleAlign: 'center',
  headerRightContainerStyle:{marginRight:15},
  headerRight: () => (
    <TouchableOpacity onPress={()=>{alert("Chức năng đang phát triển")}}>
      <MCIcons name={'camera-enhance-outline'} size={30} color={'#fff'}/>
    </TouchableOpacity>
  ),
  headerLeftContainerStyle:{marginLeft:15},
  headerLeft: () => (
    <TouchableOpacity onPress={()=>navigation.openDrawer()}>
      <MCIcons name={'gesture-swipe-right'} size={30} color={'#fff'}/>
    </TouchableOpacity>
  ),
})

export default App;
