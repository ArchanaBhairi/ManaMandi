import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState ,useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AddstockScreen from './screens/AddstockScreen'
import Auctionentry from './screens/Auctionentry'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileScreen from './screens/ProfileScreen'
import PaymentScreen from './screens/PaymentScreen'
import OrderScreen from './screens/OrderScreen'
import SplashScreen from 'react-native-splash-screen'
import Drawer from './components/DrawerScreen'
import ManagefarmerScreen from './screens/ManagefarmerScreen'
import EncryptedStorage from 'react-native-encrypted-storage'
import { COLORS } from './colors'
import { AuthProvider,AuthContext } from './components/AuthContext'
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()


function MyDrawer() {
  return (
    <Drawer
      drawerContent={
        <View>
          <Text style={styles.drawerItem}>Home</Text>
          <Text style={styles.drawerItem}>Profile</Text>
          <Text style={styles.drawerItem}>Settings</Text>
        </View>
      }
    >
      <HomeScreen />
    </Drawer>
  );
}

const MainTabs = () => {
  return (
<Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Orders') iconName = 'storage';
            else if (route.name === 'Stock') iconName = 'credit-card';
            else if (route.name === 'Profile') iconName = 'person';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarShowLabel:false
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Orders" component={AddstockScreen} />
        <Tab.Screen name="Stock" component={PaymentScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>

  );
};

const AppNavigator = () => {
  const { userdata } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userdata ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Manage Stock"
              component={AddstockScreen}
            />
            <Stack.Screen
              name="Generate Receipt"
              component={Auctionentry}
            />
            <Stack.Screen
              name="Payment Receipt"
              component={PaymentScreen}
            />
            <Stack.Screen
              name="Manage Farmer"
              component={ManagefarmerScreen}
            />
            {/* <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          /> */}
          </>
        ) : (<>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Manage Stock"
              component={AddstockScreen}
            />
            <Stack.Screen
              name="Generate Receipt"
              component={Auctionentry}
            />
            <Stack.Screen
              name="Payment Receipt"
              component={PaymentScreen}
            />
            <Stack.Screen
              name="Manage Farmer"
              component={ManagefarmerScreen}
            /></>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {

  useEffect(()=>{
    SplashScreen.hide()
  },[])

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  )
}

export default App

const styles = StyleSheet.create({})