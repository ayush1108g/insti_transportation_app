import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, TouchableOpacity, FlatList, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'


const vw = (Dimensions.get('window').width) / 100;
const vh = (Dimensions.get('window').height) / 100;

const dummyData = [
    {
        stationName: 'Station A',
        fare: '$10',
        arrivalTime: '10:00 AM'
    },
    {
        stationName: 'Station B',
        fare: '$15',
        arrivalTime: '11:30 AM'
    },
    {
        stationName: 'Station C',
        fare: '$12',
        arrivalTime: '12:45 PM'
    },
    {
        stationName: 'Station D',
        fare: '$20',
        arrivalTime: '02:00 PM'
    },
];


const UpdateRoute = () => {
    const CardItem = ({ stationName, fare, arrivalTime }) => {
        return (
            <View style={styles.card}>
                <Text style={styles.stationName}>{stationName}</Text>
                <Text style={styles.fare}>{fare}</Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={styles.arrivalTime}>{arrivalTime}</Text>
                    <Text style={styles.button}>Update</Text>
                </View>
            </View>
        );
    };
    const renderItem = ({ item }) => (
        <CardItem
            stationName={item.stationName}
            fare={item.fare}
            arrivalTime={item.arrivalTime}
        />
    );
    return (
        <KeyboardAvoidingView 
      style={styles.container}
      behavior="padding" 
      keyboardVerticalOffset={100}
    >
            <Text style={{ marginLeft: 26 * vw, fontSize: 7 * vw }}>Update Route</Text>
            <View style={styles.box2}>
                <View style={styles.stops}>
                    <Text>Stop Number</Text>
                    <TextInput style={styles.input2}></TextInput>
                    <Text>Stop Name</Text>
                    <TextInput style={styles.input2}></TextInput>
                    <Text>Fare from Start point</Text>
                    <TextInput style={styles.input2}></TextInput>
                    <Text>Time of arrival</Text>
                    <TextInput style={styles.input2}></TextInput>
                </View>
                <View style={styles.btbx}>
            <TouchableOpacity style={styles.button2}  >
                    <Text style={{ color: 'white' }}>Add a Stop in between</Text>
                </TouchableOpacity>
             </View>
            </View>
    
                <FlatList
                    data={dummyData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.stationName}
                />
            <View style={{height:60}}>

            </View>
            
         
           
            
        </KeyboardAvoidingView>
    )
}

export default UpdateRoute

const styles = StyleSheet.create({
    box1: {
        width: 90 * vw,
        height: 65 * vh,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 5 * vw,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    stationName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    fare: {
        fontSize: 16,
        marginBottom: 5,
    },
    arrivalTime: {
        fontSize: 14,
        color: '#888',
    },
    button: {
        marginLeft: '50%',
        marginRight: 10,
        backgroundColor: 'blue',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 5,
        borderRadius: 50,
    },
    box2: {
        width: 90 * vw,
        height: 47* vh,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 5 * vw,
        marginTop: 1 * vh,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input2: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        padding: 10,
        marginBottom: 10,
           color:'grey',
           borderRadius:10,
    },
    container:
    {
        flex:1,
    },
    button2: {
        height: 5 * vh,
        width: 70 * vw,
        margin: 4.5 * vw,
        marginTop: 1 * vh,
        borderRadius: 10,
        backgroundColor: 'green',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2 * vh,
    },
    btbx:{
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
    
});
