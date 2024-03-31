import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, TouchableOpacity, FlatList, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'

import DateTimePicker from "@react-native-community/datetimepicker";
import { getCorrectTimeStamp } from '../../utils/getProperDate';

import axios from 'axios';
import { baseBackendUrl } from '../../constant';
import {useAlert} from "../../store/AlertContext";
const vw = (Dimensions.get('window').width) / 100;
const vh = (Dimensions.get('window').height) / 100;



const UpdateRoute = ({route, navigation}) => {
    const alertCtx = useAlert();
    const { data,setUpdate } = route.params;

    const [stopName, setStopName] = useState('');
    const [fare, setFare] = useState('');
    const [stopNumber, setStopNumber] = useState();

    const [date, setDate] = useState(new Date());
    const [showDatepicker, setShowDatepicker] = useState(false);
    const [time, setTime] = useState(new Date());
    const [showTimepicker, setShowTimepicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatepicker(false);
        setDate(currentDate);
    };

    const handleTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowTimepicker(false);
        setTime(currentTime);
    };

    const [stations, setStations] = useState([]);

    useEffect(() => {
        const allStations = async () => {
            try {
                const response = await axios.get(`${baseBackendUrl}/busStations`);
                setStations(response.data);
                return response.data;
            } catch (error) {    
                console.log(error); 
            }   
        }
        allStations();
    }, []);

    function getStationIdByName(stationName) {
        for (let i = 0; i < stations.length; i++) {
            if (stations[i].stationName === stationName) {
                return stations[i]._id;
            }
        }
        return null; // Return null if stationName is not found
    }

    const submitHandler = async () => {
        try {
            const response = await axios.post(`${baseBackendUrl}/schedules/${data._id}/stops`, {
                stopId: getStationIdByName(stopName),
                stopNumber: stopNumber,
                cost: fare,
                arrivalTime: getCorrectTimeStamp(date.toISOString(), time.toISOString())
            });
            setFare('');
            setStopName('');
            setStopNumber('');
            setUpdate((prev) => !prev);
            alertCtx.showAlert('success','Stop added successfully');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const deleteHandler = async (item) => {
        console.log(data._id, item._id);
        try {
            const response = await axios.delete(`${baseBackendUrl}/schedules/${data._id}/stops/${item._id}`,{
                stopNumber: item.stopNumber
            });
            setUpdate((prev) => !prev);
            alertCtx.showAlert('success','Stop deleted successfully');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    function arrangeByStopNumber(busStops) {
        return busStops.sort((a, b) => a.stopNumber - b.stopNumber);
    }

    const openUpdateStop = () => {
        navigation.navigate('UpdateStop');
    }


    const formatDate = (timestamp) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const dateObj = new Date(timestamp);
        const day = dateObj.getDate();
        const month = months[dateObj.getMonth()];
        const year = dateObj.getFullYear();

        let hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 

        const formattedTime = `${hours}.${minutes.toString().padStart(2, '0')} ${ampm}`;

        return `${month} ${day} ${formattedTime}`;
    };

    const CardItem = ({data}) => {
        return (
            <View style={styles.card}>
                <Text style={styles.stationName}>{data.stopNumber}. {data.stopId.stationName}</Text>
                <Text style={styles.fare}>Cost: ₹ {data.cost}</Text>
                <Text style={styles.arrivalTime}>Date & Time: {formatDate(data.arrivalTime)}</Text>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity 
                        style={{
                            backgroundColor: 'green',
                            color: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            padding: 5,
                            borderRadius: 50,
                            width: 40*vw,
                            marginTop:15
                        }}
                        onPress={()=>deleteHandler(data)}
                    >
                        <Text style={{color:'white', padding:4}}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{
                            backgroundColor: 'green',
                            color: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            padding: 5,
                            borderRadius: 50,
                            width: 40*vw,
                            marginTop:15
                        }}
                        onPress={openUpdateStop}
                    >
                        <Text style={{color:'white', padding:4}}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    const renderItem = ({ item }) => {
        console.log("item", item)
        return (
        <CardItem data = {item}/>
    )};
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
                        <TextInput 
                            style={styles.input2}
                            keyboardType='numeric'
                            defaultValue={stopNumber}
                            onChangeText={(text) => setStopNumber(text)}
                        ></TextInput>
                    <Text>Stop Name</Text>
                        <TextInput 
                            style={styles.input2}
                            defaultValue={stopName}
                            onChangeText={(text)=>setStopName(text)}>
                        </TextInput>
                    <Text>Fare from Start point</Text>
                        <TextInput 
                            style={styles.input2}
                            keyboardType='numeric'
                            defaultValue={fare}
                            onChangeText={(text)=>setFare(text)}>    
                        </TextInput>
                <TouchableOpacity
                style={styles.dropdowntime}
                onPress={() => setShowDatepicker(true)}
                >
                <Text style={{ color: "#5C6168", marginTop:4 }}>
                    {" "}
                    Select Date: {date.toLocaleDateString()}
                </Text>
                    </TouchableOpacity>
                    {showDatepicker && (
                    <DateTimePicker
                        testID="datePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={handleDateChange}
                    />
                    )}

                    <TouchableOpacity
                    style={styles.dropdowntime}
                    onPress={() => setShowTimepicker(true)}
                    >
                    <Text style={{ color: "#5C6168" }}>
                        {" "}
                        Select Time: {time.toLocaleTimeString()}
                    </Text>
                    </TouchableOpacity>
                    {showTimepicker && (
                    <DateTimePicker
                        testID="timePicker"
                        value={time}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={handleTimeChange}
                    />
                    )}
                    <View style={{height: 15}}></View>
                </View>
                <View style={styles.btbx}>
                <TouchableOpacity style={styles.button2}  onPress={submitHandler}>
                    <Text style={{ color: 'white' }}>Add a Stop in between</Text>
                </TouchableOpacity>
             </View>
            </View>
    
                <FlatList
                    data={arrangeByStopNumber(data.busStops)}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
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
