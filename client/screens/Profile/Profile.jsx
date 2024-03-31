import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import LoginContext from '../../store/AuthContext'
import { Button } from 'react-native-paper';
import Stats from './Stats';

const Profile = ({ navigation }) => {
    const loginCtx = useContext(LoginContext);
    console.log(loginCtx?.user)
    return (
        <View style={styles.mainContainer}>
            <View style={{
                // flex: 1,
                // justifyContent: 'center',
                // alignItems: 'center',
            }}>
                <Text>Profile</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    width: '30%',
                    backgroundColor: 'cyan',
                    position: 'absolute',
                    right: 0,
                    borderRadius: 30,
                }}><TouchableOpacity onPress={() => navigation.navigate('UpdateProfile')}><Text>Edit Profile</Text></TouchableOpacity></View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>

                <View style={{ padding: 5 }}>
                    <Image source={{ uri: loginCtx?.user?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" }} style={styles.image} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.innerContainer}>
                        <Text>Name :{loginCtx?.user?.name}</Text>
                        <Text>Email :{loginCtx?.user?.email}</Text>
                        <Text>Role :{loginCtx?.user?.role}</Text>
                    </View>
                </View>
            </View>
            <Button onPress={loginCtx?.logout} style={styles.button}>Logout</Button>

            <ScrollView style={{ paddingTop: 50 }}>

                <Stats />
            </ScrollView>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 20
    },
    innerContainer: {
        alignItems: 'start',
        marginTop: 10,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    button: {
        marginTop: 20,
        color: 'blue',
        backgroundColor: 'red'
    }
})