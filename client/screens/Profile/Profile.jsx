import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import LoginContext from '../../store/AuthContext'
import { Button } from 'react-native-paper';


const Profile = () => {
    const loginCtx = useContext(LoginContext);
    console.log(loginCtx.user)
    return (
        <View style={styles.mainContainer}>
            <Text>Profile</Text>
            <Image source={{ uri: loginCtx?.user?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" }} style={styles.image} />
            <View style={styles.innerContainer}>
                <Text>Name :{loginCtx?.user?.name}</Text>
                <Text>Email :{loginCtx?.user?.email}</Text>
                <Text>Role :{loginCtx?.user?.role}</Text>
            </View>
            <Button onPress={loginCtx.logout} style={styles.button}>Logout</Button>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50
    },
    innerContainer: {
        alignItems: 'start',
        marginTop: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    button: {
        marginTop: 20,
        color: 'blue'
    }
})