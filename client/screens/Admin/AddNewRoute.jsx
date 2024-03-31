import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseBackendUrl } from '../../constant';

import AddNewRouteCard from '../../components/AddNewRouteCard';

const vw = (Dimensions.get('window').width) / 100;
const vh = (Dimensions.get('window').height) / 100;

const AddNewRoute = () => {
    const [inputNum, setInputNum] = useState(0);
    const [num, setnum] = useState([]);

    const [busName, setBusName] = useState(null);
    const [busCapacity, setBusCapacity] = useState('');
    const [busStops, setBusStops] = useState([]);

    function sortBusStops(busStops) {
        const sortedStops = busStops.slice().sort((a, b) => a.stopNumber - b.stopNumber);

        const start = {
            stopId: sortedStops[0].stopId,
            arrivalTime: sortedStops[0].arrivalTime
        };

        const end = {
            stopId: sortedStops[sortedStops.length - 1].stopId,
            arrivalTime: sortedStops[sortedStops.length - 1].arrivalTime,
            cost: sortedStops[sortedStops.length - 1].cost 
        };

        return { start, end };
    }

    const submitHandler = async () => {
        const { start , end } = sortBusStops(busStops); 
        console.log(busName, busCapacity, busStops, start, end);
        try {
            const response = await axios.post(`${baseBackendUrl}/schedules`, {
                routeName: busName,
                capacity: busCapacity,
                busStops,
                startLocation: start.stopId,
                endLocation: end.stopId,
                startTime: start.arrivalTime,
                endTime: end.arrivalTime,
                cost: end.cost
            });
            alert('New Bus Schedule added successfully');
            return response.data;
        } catch(err) {
            console.log(err);
        }
    };

    const handleInputChange = (text) => {
        setInputNum(text);
    };
    const Nextpress = () => {
        let numt = [];
        for (let i = 1; i <= inputNum; i++)
            numt.push(i);
        console.log(numt);
        setnum(numt);
    }

    const renderItem = (ind, index) => {
        return (
            <AddNewRouteCard ind={ind} busStops={busStops}/>
        );
    };

    return (
        <View style={{alignItems: 'center'}}>
            <Text style={{fontSize:24}}>Schedule a new Bus</Text>
            <View style={styles.box1}>

                <View style={styles.box1_1}>
                    <Text style={{ fontWeight: 'bold' }}>Bus / Route Name</Text>
                    <TextInput 
                        style={styles.input}
                        value={busName}
                        onChangeText={(text) => setBusName(text)}>
                    </TextInput>
                </View>
                <View style={styles.box1_1}>
                    <Text style={{ fontWeight: 'bold' }}>Bus capacity</Text>
                    <TextInput 
                        style={styles.input}
                        value={busCapacity}
                        onChangeText={(text)=>setBusCapacity(text)}>
                    </TextInput>
                </View>
                <View style={styles.box1_1}>
                    <Text style={{ fontWeight: 'bold' }}>Number of Stops</Text>
                    <TextInput 
                        style={styles.input} 
                        keyboardType='numeric' 
                        maxLength={2} 
                        onChangeText={handleInputChange}>
                    </TextInput>
                </View>
                <TouchableOpacity style={styles.button} onPress={Nextpress} >
                    <Text style={{ color: 'white' }}>Next</Text>
                </TouchableOpacity>
                <ScrollView>
                    {
                        num.map((item, ind) => {
                            return renderItem(ind);
                        })
                    }
                    {
                        num.length > 0 &&
                        <TouchableOpacity style={styles.button} onPress={submitHandler}>
                            <Text style={{ color: 'white' }}>Submit</Text>
                        </TouchableOpacity>
                    }
                </ScrollView>
                <View style={{ height: 60 }}>

                </View>
            </View>
        </View>
    )
}

export default AddNewRoute;

const styles = StyleSheet.create({
    box1: {
        width: 90 * vw,
        height: 83 * vh,
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
        overflow: 'auto'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        color: 'grey',
        borderRadius: 10,
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
    input2: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        padding: 10,
        marginBottom: 10,
        color: 'grey',
        borderRadius: 10,
    },
    stops: {
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
})