import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import { baseBackendUrl } from '../constant';   

import DateTimePicker from "@react-native-community/datetimepicker";
import { getCorrectTimeStamp } from '../utils/getProperDate';

const AddNewRouteCard = (props) => {

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

    const [busStation, setBusStation] = useState('');
    const [fare, setFare] = useState(0);
    const [isAdded, setIsAdded] = useState(false);

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

    const addStop = () => {
        if(isAdded) {
            alert('Stop already added');
            return;
        } 
        console.log(date);
        console.log(time);
        props.busStops.push({
            stopId: getStationIdByName(busStation),
            cost: fare,
            stopNumber: props.ind,
            arrivalTime: getCorrectTimeStamp(date.toISOString(), time.toISOString())
        });
        alert('Stop added');
        setBusStation('');
        setFare(0);
        setIsAdded(true);
    }

    return(
        <View style={styles.stops}>
            <Text>Stop {props.ind}</Text>
            <TextInput 
                style={styles.input2}
                defaultValue={busStation}
                onChangeText={(text) => setBusStation(text)}
                placeholder='Enter Bus Station Name'
            ></TextInput>
            {/* <Text>Fare from Start point</Text> */}
            <TextInput 
                style={styles.input2}
                defaultValue={fare}
                onChangeText={(text) => setFare(text)}
                placeholder='Enter Fare'
            ></TextInput>
            {/* <Text>Time of arrival:</Text> */}
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
            <Button title="Add" onPress={addStop}/>
        </View>
    );
};

export default AddNewRouteCard;

const styles = StyleSheet.create({
    input2: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        padding: 10,
        marginBottom: 10,
           color:'grey',
           borderRadius:10,
    },
    stops:{
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
    }
});