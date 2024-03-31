import { Dimensions, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { React, useState, useEffect, useRef, useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { baseBackendUrl } from '../../constant';
import axios from 'axios'
import LoginContext from '../../store/AuthContext';
const vw = (Dimensions.get('window').width) / 100;
const vh = (Dimensions.get('window').height) / 100;
import ShowRoute from '../../components/ShowRooute';
import { Animated } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

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


const Schedule = ({ navigation }) => {
    const LoginCtx = useContext(LoginContext);
    const isadmin = LoginCtx?.user?.role === 'admin';

    const [value, setValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [valueto, setValueto] = useState('');
    const [filteredSuggestionsto, setFilteredSuggestionsto] = useState([]);
    const [stops, setStops] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [filteredSchedules, setFilteredSchedules] = useState([]);
    const [searching, setSearching] = useState(false);
    const [updateUpdateData,setUpdateUpdateData] = useState(false);

    const [modalVisible, setModalVisible] = useState(true);
    const [passData, setPassData] = useState({});


    const scaleAnim = useRef(new Animated.Value(1)).current;

    const startAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.3,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    };

    useEffect(() => {
        startAnimation();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseBackendUrl}/schedules`);
                console.log(response.data);
                let schedules = response.data;
                schedules = schedules.filter(schedule => new Date(schedule.startTime).getTime() > new Date().getTime());
                setSchedules(schedules);
                setFilteredSchedules(schedules);

            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [updateUpdateData]);

    useEffect(() => {
        const fetchData2 = async () => {
            try {
                const response = await axios.get(`${baseBackendUrl}/busStations`);
                console.log(response.data);
                const data = response.data;
                setStops(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData2();
    }, [updateUpdateData]);

    const filterSchedules = async () => {
        setSearching(true);
        if (value.trim() === '' || valueto.trim() === '') {
            setFilteredSchedules(schedules);
            setSearching(false);
            return;
        }
        const fromid = stops.find(stop => stop.stationName === value)._id;
        const toid = stops.find(stop => stop.stationName === valueto)._id;

        if (!fromid || !toid) {
            console.log('Invalid from or to');
            return;
        }

        try {
            const filteredResp = await axios.get(`${baseBackendUrl}/getPossibleRoutes?startLocationId=${fromid}&endLocationId=${toid}`);
            let filtered = filteredResp.data;
            filtered = filtered.filter(schedule => new Date(schedule.startTime).getTime() > new Date().getTime());
            // console.log(filtered);
            setFilteredSchedules(filtered);
        } catch (err) {
            console.log(err);
        } finally {
            setSearching(false);
        }

        setTimeout(() => {
            setSearching(false);
        }, 5000);

    }


    useEffect(() => {
        if (value.trim() === '' || valueto.trim() === '') {
            setFilteredSchedules(schedules);
            return;
        }

    }, [value, valueto,updateUpdateData]);


    useEffect(() => {
        if (value.trim() !== '') {
            const filtered = stops?.filter(
                suggestion =>
                    suggestion?.stationName.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    }, [value,updateUpdateData]);

    useEffect(() => {
        if (valueto.trim() !== '') {
            const filteredto = stops?.filter(
                suggestion =>
                    suggestion?.stationName.toLowerCase().includes(valueto.toLowerCase())
            );
            setFilteredSuggestionsto(filteredto);
        } else {
            setFilteredSuggestionsto([]);
        }
    }, [valueto,updateUpdateData]);

    const openUpdateRoutePage = (schedule) => {
        navigation.navigate('UpdateRoute',{data: schedule , setUpdate:setUpdateUpdateData});
    }

    const deleteRoute = async (id) => {
        try {
            const response = await axios.delete(`${baseBackendUrl}/schedules/${id}`);
            console.log(response.data);
            const newSchedules = schedules.filter(schedule => schedule._id !== data._id);
            setSchedules(newSchedules);
            setFilteredSchedules(newSchedules);
        } catch (err) {
            console.log(err);
        }
    };

    const swapHandler = () => {
        const temp = value;
        setValue(valueto);
        setValueto(temp);
    };

    const handleSuggestionPress = (suggestion) => {
        setValue(suggestion?.stationName);
        setFilteredSuggestions([]);
    };

    const handleSuggestionPressto = (suggestion) => {
        setValueto(suggestion?.stationName);
        setFilteredSuggestionsto([]);
    };

    const renderSuggestionItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleSuggestionPress(item)} style={styles.suggestionItem}>
            <Text>{item?.stationName}</Text>
        </TouchableOpacity>
    );

    const renderSuggestionItemto = ({ item }) => (
        <TouchableOpacity onPress={() => handleSuggestionPressto(item)} style={styles.suggestionItem}>
            <Text>{item?.stationName}</Text>
        </TouchableOpacity>
    );

    const handleRoutePress = (item) => {
        setPassData(item);
        setModalVisible(true);
    }

    const renderItem = ({ item, index }) => {
        const timeGap = Math.abs(new Date(item?.endTime) - new Date(item?.startTime));
        const timeGapInMinutes = Math.floor(timeGap / 60000);
        const timeGapString = `${timeGapInMinutes}min `;
        item.value = value;
        item.valueto = valueto;
        item.stops = stops;

        return 
        (
        <View style={styles.item} key={index} >
            <View style={{
                position: 'absolute',
                right: 10,
                top: 10,
                zIndex: 5
            }}>

                <TouchableOpacity onPress={() => handleRoutePress(item)}>
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <View style={{
                            position: 'relative',
                            top: 0,
                            right: 0,
                            width: 40,
                            zIndex: 100,
                        }}>
                            <Icon2 onPress={() => handleRoutePress(item)} name='route' size={30} ></Icon2>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </View>

            <View >

                <TouchableOpacity onPress={() => { return navigation.navigate('Booking', { data: item }) }}>
                    <Text style={styles.busNumber}>{item?.routeName}</Text>
                    <Text>{formatISTDate(item?.startTime).date}</Text>
                    <View style={styles.l2}>
                        <View style={styles.Comp1}>
                            <Text style={styles.place} >{item?.startLocation?.stationName}</Text>
                            <Text style={styles.time} >{formatISTDate(item?.startTime).time}</Text>
                        </View>
                        <View style={styles.Compmid}>
                            <View style={styles.w0l}>
                            </View >
                            <View style={styles.smbx}>
                                <Text>{timeGapString}</Text>

                            </View>
                            <View style={styles.w0r}>

                            </View>
                        </View>
                        <View style={styles.Comp2}>
                            <Text style={styles.place}>{item?.endLocation?.stationName}</Text>
                            <Text style={styles.time}>{formatISTDate(item?.endTime).time}</Text>
                        </View>
                    </View>

            </TouchableOpacity>
            {
                isadmin && 
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.upd} onPress={() => openUpdateRoutePage(item)}>
                        <Text style={{color:'white'}}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dlt} onPress={() => deleteRoute(item._id)}>
                        <Text style={{color:'white'}}>Delete</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
        </View>

    )};

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>

            <View style={styles.box1}>
                <View style={[styles.box1_1, styles.b1]}>
                    <Text>From</Text>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type here..."
                            value={value}
                            onChangeText={setValue}
                        />
                        {value.trim() !== '' && (
                            <View style={styles.suggestionContainer}>
                                <FlatList
                                    data={filteredSuggestions}
                                    renderItem={renderSuggestionItem}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        )}
                    </View>
                </View>
                <Icon name='swap-vertical' size={23} style={styles.arrow} onPress={swapHandler} ></Icon>
                <View style={[styles.box1_1, styles.b2]} >
                    <Text>To</Text>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type here..."
                            value={valueto}
                            onChangeText={setValueto}
                        />
                        {valueto.trim() !== '' && (
                            <View style={styles.suggestionContainer}>
                                <FlatList
                                    data={filteredSuggestionsto}
                                    renderItem={renderSuggestionItemto}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        )}
                    </View>
                </View>
                {/* <View style={styles.box1_1}>
                    <Text>Date</Text>
                    <TextInput style={styles.input}></TextInput>
                </View> */}
                <View style={styles.button} >
                    <TouchableOpacity onPress={filterSchedules} disabled={searching}>


                        {!searching ? <Text style={{ color: 'white' }}>Search</Text> :

                            <ActivityIndicator animating={true} color='black' size='large' />}

                    </TouchableOpacity>
                </View>

            </View>
            {modalVisible && <ShowRoute isVisible={modalVisible} onClose={() => setModalVisible(false)} stops={stops} Route={passData} />}
            <FlatList
                data={filteredSchedules}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={{ height: 60 }}>

            </View>
        </View>
    )
}

export default Schedule;

const styles = StyleSheet.create({
    box1: {
        width: 90 * vw,
        height: 35 * vh,
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
        margin: 1.5 * vh,
        marginLeft: 3 * vw,
        marginRight: 3 * vw,
    },
    arrow: {
        marginLeft: 37 * vw,
        marginBottom: 0,
        marginTop: 3 * vh
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,

    },
    button: {
        height: 5 * vh,
        width: 70 * vw,
        margin: 4.5 * vw,
        marginTop: 3.5 * vh,
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
    b2: {
        marginTop: 0,
    },
    b1: {
        marginBottom: 0,
    },
    busNumber: {
        fontSize: 20
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
        margin: 10,
        marginLeft: '5%',
        display: 'flex',
        flexDirection: 'row',
    },
    place:
    {
        fontSize: 20,
    },
    w0l: {
        borderColor: 'black',
        borderWidth: 1,
        width: 30,
    },
    w0r: {
        borderColor: 'black',
        borderWidth: 1,
        width: 30,
    },
    smbx: {
        borderColor: 'black',
        borderWidth: 1,
        width: 80,
        height: 30,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    time: {
        fontSize: 12,
    },
    dlt: {

        backgroundColor: 'black',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 7,
        borderRadius: 50,
    },
    container: {
        position: 'relative',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
    suggestionContainer: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        zIndex: 1,
        elevation: 5,
        maxHeight: 200,
        overflow: 'scroll',
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    upd: {
        marginLeft: '60%',
        marginRight: 10,
        backgroundColor: 'blue',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 5,
        borderRadius: 50,
    }
})