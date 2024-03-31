import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Admin = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={{fontSize:25}}>Admin Workspace</Text>

            <View style={styles.innerContainer}>

                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('SendNotification')}>
                    <Text>Send Notification</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('AddNewStop')}>
                    <Text>Add New Bus Station</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('AddNewRoute')}>
                    <Text>Schedule a new Bus</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('UpdateRoute')}>
                    <Text>Update a Bus Route</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default Admin

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,
        // backgroundColor: "#",
        // justifyContent: "center",
        alignItems: "center",
    },
    innerContainer: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        flexWrap: 'wrap',
    },
    item: {
        width: '40%',
        borderWidth: 3,
        borderColor: 'black',
        padding: 10,
        margin: 5,
        borderRadius: 10,
    }
})