import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const vw = (Dimensions.get('window').width) / 100;
const vh = (Dimensions.get('window').height) / 100;

export default function Home() {
  return (
    <View style={styles.item}>
       <View >
            <Text style={styles.title} >E-receipt</Text>
            <View style={styles.l1}>
            <Text style={styles.busNumber}>BusNumber</Text>
            <Text style={styles.date}>Date</Text>
            </View>
            <View style={styles.l2}>
                <View style={styles.Comp1}>
                    <Text style={styles.place} >Boarding Place</Text>
                    <Text style={styles.time} >7:00 AM</Text>
                </View>
                <View style={styles.Compmid}>
                    <View style={styles.w0l}>

                    </View >
                    <View style={styles.smbx}>

                    </View>
                    <View style={styles.w0r}>

                    </View>
                </View>
                <View style={styles.Comp2}>
                    <Text style={styles.place}>Destination</Text>
                    <Text style={styles.time}>7:00 PM</Text>
                </View>
            </View>
            
        </View>
        <View style={styles.succes}>
            <Text style={{  color:'white'}}>Ticket Fare PAID Successfuly</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
    b2: {
        marginTop: 0,
    },
    b1: {
        marginBottom: 0,
    },
    busNumber: {
        fontSize: 20,
    },
    Comp1: {

    },
    Comp2: {

    },
    Compmid: {
        width: 40 * vw,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    l2: {
        marginTop:20,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    place:
    {
        fontSize: 15,
    },
    w0l: {
        borderColor: 'black',
        borderWidth: 1,
        width: 40,
    },
    w0r: {
        borderColor: 'black',
        borderWidth: 1,
        width: 40,
    },
    smbx: {
        borderColor: 'black',
        borderWidth: 1,
        width: 60,
        height: 30,
        borderRadius: 50,
    },
    time: {
        fontSize: 12,
    },
    succes:{
        marginTop :40,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        display: 'flex',
        backgroundColor:'blue',
        padding:20,
        borderRadius:10,
        marginBottom:40,
    },
    title:{
          marginBottom:40,
          fontSize:25,
    },
    l1:{
        
         display:'flex' ,
         flexDirection:'row',
         marginBottom:30,
    },
    date:{
            fontSize:20 ,
            marginLeft:'40%'
    }
})