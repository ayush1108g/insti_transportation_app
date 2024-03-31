import { StyleSheet, Text, View ,Dimensions, TextInput, ScrollView , TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseBackendUrl } from '../../constant';

import DateTimePicker from "@react-native-community/datetimepicker";
import { getCorrectTimeStamp } from '../../utils/getProperDate';
import { useAlert } from '../../store/AlertContext';

const vw = (Dimensions.get('window').width) / 100;
const vh = (Dimensions.get('window').height) / 100;

const UpdateStop = ({route}) => {
    const alertCtx = useAlert();
    const { data, scheduleId } = route.params;
    console.log("data from Update stop",data);
    console.log("scheduleId from Update stop",scheduleId);

    const [stopName, setStopName] = useState(data.stopId.stationName);
    const [fair, setFair] = useState('');

    const [stations, setStations] = useState([]); // 660940ee73e909bdc3205ef0

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

    const submitHandler = async () => {
        const stopId = data.stopId._id;
        const stationId = getStationIdByName(stopName);
        const timestamp = getCorrectTimeStamp(date.toISOString(), time.toISOString());
        console.log('stopId', stopId);
        console.log('stationId', stationId);
        console.log('timestamp', timestamp);
        console.log('fair', fair);
        console.log('scheduleId', scheduleId);
        console.log(data.stopNumber);
        
        try {
            const response = await axios.post(`${baseBackendUrl}/schedules/${scheduleId}/stops`, {
                stopId: stationId,
                stopNumber: data.stopNumber,
                cost: fair, 
                arrivalTime: timestamp
            });
            console.log(response.data);
            const response1 = await axios.delete(`${baseBackendUrl}/schedules/${scheduleId}/stops/${stopId}`);//,{
            //     stopNumber: data.stopNumber
            // });
            setFair('');
            setStopName('');
            alertCtx.showAlert('success','Stop updated successfully');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <View>
           <Text style={{marginLeft:24*vw , fontSize:7*vw}}>Update stop</Text>
              <View style={styles.box1}>
        
                 <View style={styles.box1_1 }>
                    <Text style={{fontWeight:'bold'}}>Stop Name</Text>
                    <TextInput 
                        style={styles.input}
                        value={stopName}
                        onChangeText={(text)=>setStopName(text)}>
                    </TextInput>
                </View>
                 <View style={styles.box1_1 }>
                    <Text style={{fontWeight:'bold'}}>Fair from Start</Text>
                    <TextInput 
                        value={fair}
                        onChangeText={(text)=>setFair(text)}
                        style={styles.input}></TextInput>
                </View>
                <View style={{height:25}}></View>
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
                        <View style={{height:15}}></View>
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
                <TouchableOpacity style={styles.button} onPress={submitHandler} >
                    <Text style={{ color: 'white' }}>Update</Text>
                </TouchableOpacity>
                </View>
    </View>
  )
}

export default UpdateStop

const styles = StyleSheet.create({
    box1: {
        width: 90 * vw,
        height: 50* vh,
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
        overflow:'auto'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        padding: 10,
        marginBottom: 10,
           color:'grey',
           borderRadius:10,
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
})