import { Dimensions, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { React, useState, useEffect, useRef } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler';

const vw = (Dimensions.get('window').width) / 100;
const vh = (Dimensions.get('window').height) / 100;


function formatISTDate(dateString) {
    const utcDate = new Date(dateString);
    const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));

    const optionsDate = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };

    const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    const formattedDate = istDate.toLocaleString('en-IN', optionsDate);
    const formattedTime = istDate.toLocaleString('en-IN', optionsTime);

    return { date: formattedDate, time: formattedTime };
}
function findCost(data, startLocation, endLocation) {
    console.log(startLocation, endLocation);
    let cost = 0;
    if (data?.startLocation?.stationName === startLocation && data?.endLocation?.stationName === endLocation) {
        cost = data.cost;
        return { cost: cost, DepartureTime: data.startTime, ArrivalTime: data.endTime };
    }
    const stations = data.busStops;
    console.log(stations);

    stations.forEach((station, index) => {
        if (station?.stopId?.stationName === startLocation) {
            cost -= station.cost;
            data.DepartureTime = station.arrivalTime;
        }
        if (station?.stopId?.stationName === endLocation) {
            cost += station.cost;
            data.ArrivalTime = station.arrivalTime;
        }
        return 0;
    });
    return { cost: cost, DepartureTime: data.DepartureTime, ArrivalTime: data.ArrivalTime };
}




const Booking = ({ route, navigation }) => {
    const { data } = route.params;
    // console.log(data);
    // const [cost, setCost] = useState(0);
    const obj = findCost(data, data?.value || data?.startLocation?.stationName, data?.valueto || data?.endLocation?.stationName);
    let costtopay = obj.cost;
    if (obj.cost <= 0) {
        costtopay = data?.cost;
    }
    data.DepartureTime = obj.DepartureTime;
    data.ArrivalTime = obj.ArrivalTime;
    const date = formatISTDate(data?.startTime);
    const dateString = date.date + ' ' + date.time;
    data.dateString = dateString;

    data.from = data.value ? data.value : data?.startLocation?.stationName;
    data.to = data.valueto ? data.valueto : data?.endLocation?.stationName;

    data.costtopay = costtopay;

    const bookticketHandler = () => {
        navigation.navigate('Payment', { data });
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView>

                <View style={styles.box1}>
                    <View style={[styles.box1_1, styles.b1]}>
                        <Text style={{ color: 'grey' }}>From</Text>
                        <Text style={styles.input}>{data.from}</Text>
                    </View>

                    <View style={[styles.box1_1, styles.b2]} >
                        <Text style={{ color: 'grey' }}>To</Text>
                        <Text style={styles.input}>{data.to}</Text>
                    </View>
                    <View style={styles.box1_1}>
                        <Text style={{ color: 'grey' }}>Date and Time </Text>
                        <Text style={styles.input}>{dateString}</Text>
                    </View>
                    <View style={styles.box1_1}>
                        <Text style={{ color: 'grey' }}>Total Seats </Text>
                        <Text style={styles.input}>{data?.capacity}</Text>
                    </View>
                    <View style={styles.box1_1}>
                        <Text style={{ color: 'grey' }}>Seats Available </Text>
                        <Text style={styles.input}>{data?.capacity - data?.totalBookings}</Text>
                    </View>
                    <View style={styles.box1_1}>
                        <Text style={{ color: 'grey' }}>Ticket Fare</Text>
                        <Text style={styles.input}>{costtopay}</Text>
                    </View>
                    {/* <View style={styles.box1_1}>
                        <Text style={{ fontWeight: 'bold' }}>Number of Seats to be Booked</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            placeholder='Enter number of seats'
                            maxLength={1}

                        ></TextInput>
                    </View> */}
                    <View style={styles.button} >
                        <TouchableOpacity onPress={bookticketHandler}>
                            <View style={styles.button} >

                                <Text style={{ color: 'white' }}>Book Now</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
            <View style={{ minHeight: 60 }}></View>
        </ScrollView>
    )
}

export default Booking


const styles = StyleSheet.create({
    box1: {
        width: 90 * vw,
        height: 78 * vh,
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
        margin: 2 * vh,
        marginLeft: 3 * vw,
        marginRight: 3 * vw,

    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        padding: 10,
        marginBottom: 10,
        color: 'grey'
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