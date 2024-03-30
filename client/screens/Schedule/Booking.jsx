import { Dimensions, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { React, useState, useEffect, useRef } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const vw = (Dimensions.get('window').width) / 100;
const vh = (Dimensions.get('window').height) / 100;

const Booking = () => {
  return (
    <View>
          <View style={styles.box1}>
                <View style={[styles.box1_1, styles.b1]}>
                    <Text style={{color:'grey'}}>From</Text>
                   <Text style={styles.input}>Munich</Text>
                </View>
               
                <View style={[styles.box1_1, styles.b2]} >
                    <Text style={{color:'grey'}}>To</Text>
                    <Text style={styles.input}>Warswaz</Text>
                </View>
                <View style={styles.box1_1}>
                    <Text style={{color:'grey'}}>Date and Time </Text>
                    <Text style={styles.input}></Text>
                </View>
                <View style={styles.box1_1}>
                    <Text style={{color:'grey'}}>Total Seats </Text>
                    <Text style={styles.input}>99</Text>
                </View>
                <View style={styles.box1_1}>
                    <Text style={{color:'grey'}}>Seats Available </Text>
                    <Text style={styles.input}>10</Text>
                </View>
                <View style={styles.box1_1}>
                    <Text style={{color:'grey'}}>Ticket Fare</Text>
                    <Text style={styles.input}>10</Text>
                </View>
                 <View style={styles.box1_1}>
                    <Text style={{fontWeight:'bold'}}>Number of Seats to be Booked</Text>
                    <TextInput style={styles.input}></TextInput>
                </View>
                <View style={styles.button} >
                    <Text style={{ color: 'white' }}>Book Now</Text>
                </View>
            </View>
    </View>
  )
}

export default Booking


const styles = StyleSheet.create({
    box1: {
        width: 90 * vw,
        height: 83* vh,
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
    box1_1: {
        height: 6 * vh,
        margin: 2* vh,
        marginLeft: 3 * vw,
        marginRight: 3 * vw,
        
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        padding: 10,
        marginBottom: 10,
           color:'grey'
    },
    button: {
        height: 5 * vh,
        width: 70 * vw,
        margin: 4.5 * vw,
        marginTop: 3 * vh,
        borderRadius: 10,
        backgroundColor: 'green',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2 * vh,
    },
    item: {
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
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

   
})