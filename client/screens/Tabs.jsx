import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import LoginContext from '../store/AuthContext';
import { useContext } from 'react';

import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const AdminStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ScheduleStack = createStackNavigator();
const ProfileStack = createStackNavigator();


import Admin from './Admin/Admin';
import SendNotification from './Admin/SendNotification';
import AddNewStop from './Admin/AddNewStop';
import AddNewRoute from './Admin/AddNewRoute';
import UpdateRoute from './Admin/UpdateRoute';
import UpdateStop from './Admin/UpdateStop';

import Home from './Home/Home';

import Profile from './Profile/Profile';
import Notifications from './Profile/Notifications';
import UpdateProfile from './Profile/UpdateProfile';

import Schedule from './Schedule/Schedule';
import Booking from './Schedule/Booking';
import Payment from './Schedule/Payment';
import Ticket from './Schedule/ETicket';

import Map from './Map/Map';

const AdminNavigator = () => {
    return (
        <AdminStack.Navigator>
            <AdminStack.Screen name="AdminPage"
                component={Admin}
                options={{ headerShown: false }}
            />
            <AdminStack.Screen name="SendNotification"
                component={SendNotification}
                options={{ headerShown: false }}
            />
            <AdminStack.Screen name="AddNewStop"
                component={AddNewStop}
                options={{ headerShown: false }}
            />
            <AdminStack.Screen name="AddNewRoute"
                component={AddNewRoute}
                options={{ headerShown: false }}
            />
            <AdminStack.Screen name="UpdateRoute"
                component={UpdateRoute}
                options={{ headerShown: false }}
            />
        </AdminStack.Navigator>
    )
}

const HomeNavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="HomePage" component={Home} options={{ headerShown: false }} />

            <HomeStack.Screen
                name="Notification"
                component={Notifications}
                options={{ headerShown: false }}
            />
        </HomeStack.Navigator>
    )
}

const ScheduleNavigator = () => {
    return (
        <ScheduleStack.Navigator>
            <ScheduleStack.Screen
                name="SchedulePage"
                component={Schedule}
                options={{ headerShown: false }}
            />

            <ScheduleStack.Screen
                name='Booking'
                component={Booking}
                options={{ headerShown: false }}
            />
            <ScheduleStack.Screen
                name='Payment'
                component={Payment}
                options={{ headerShown: false }}
            />
            <ScheduleStack.Screen
                name='Ticket'
                component={Ticket}
                options={{ headerShown: false }}
            />
            <ScheduleStack.Screen
                name='UpdateRoute'
                component={UpdateRoute}
                options={{ headerShown: false }}
            />
            <ScheduleStack.Screen
                name='UpdateStop'
                component={UpdateStop}
                options={{ headerShown: false }}
            />
        </ScheduleStack.Navigator>
    )
}

const ProfileNavigator = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="ProfilePage"
                component={Profile}
                options={{ headerShown: false }}
            />
            <ProfileStack.Screen
                name="Notification"
                component={Notifications}
                options={{ headerShown: false }}
            />
            <ProfileStack.Screen
                name="UpdateProfile"
                component={UpdateProfile}
                options={{ headerShown: false }}
            />
        </ProfileStack.Navigator>
    )
}

const Tabs = () => {
    const loginCtx = useContext(LoginContext);
    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#fff",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 51,
                    paddingBottom: 0,
                    paddingTop: 10,
                    paddingHorizontal: 10,
                    position: "absolute",
                    marginBottom: 5,
                    borderRadius: 10,
                    shadowColor: "#000",
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                },
                tabBarItemStyle: {
                    alignContent: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: 45,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "bold",
                },
                tabBarActiveTintColor: "#D41D77",
                tabBarInactiveTintColor: "black",

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Schedule') {
                        iconName = focused ? 'time' : 'time-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Admin') {
                        iconName = focused ? 'cog' : 'cog-outline';
                    } else if (route.name === 'Notification') {
                        iconName = focused ? 'notifications' : 'notifications-outline';
                    } else if (route.name === 'Map') {
                        iconName = focused ? 'map' : 'map-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >

            {/* <Tab.Screen name="Home" component={HomeNavigator} /> */}
            <Tab.Screen name="Schedule" component={ScheduleNavigator} />
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="Profile" component={ProfileNavigator} />
            <Tab.Screen name='Notification' component={Notifications} />
            {loginCtx?.user?.role === 'admin' && <Tab.Screen name="Admin" component={AdminNavigator} />}
        </Tab.Navigator>
    )
}

export default Tabs;

const styles = StyleSheet.create({})