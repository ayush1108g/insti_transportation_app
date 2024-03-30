import { Dimensions, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { React, useState, useEffect, useRef } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const vw = (Dimensions.get('window').width) / 100;
const vh = (Dimensions.get('window').height) / 100;
const isadmin = true;
const data = [
    {
        "busNumber": "Bus 1",
        "startingPlace": "Place A",
        "startingTime": "09:00 AM",
        "endingPlace": "Place X",
        "endingTime": "12:00 PM"
    },
    {
        "busNumber": "Bus 2",
        "startingPlace": "Place B",
        "startingTime": "10:30 AM",
        "endingPlace": "Place Y",
        "endingTime": "01:30 PM"
    },
    {
        "busNumber": "Bus 3",
        "startingPlace": "Place C",
        "startingTime": "11:45 AM",
        "endingPlace": "Place Z",
        "endingTime": "02:45 PM"
    },
    {
        "busNumber": "Bus 4",
        "startingPlace": "Place D",
        "startingTime": "01:00 PM",
        "endingPlace": "Place W",
        "endingTime": "04:00 PM"
    },
    {
        "busNumber": "Bus 5",
        "startingPlace": "Place E",
        "startingTime": "02:15 PM",
        "endingPlace": "Place V",
        "endingTime": "05:15 PM"
    }
]

const suggestionsData = [
    { stopName: 'Stop 1' },
    { stopName: 'Stop 2' },
    { stopName: 'Stop 3' },
    { stopName: 'Stop 4' },
    { stopName: 'Stop 5' },
    { stopName: 'Stop 6' },
    { stopName: 'Stop 7' },
    { stopName: 'Stop 8' },
    { stopName: 'Stop 9' },
    { stopName: 'Stop 10' },
    { stopName: 'Stop 11' },
    { stopName: 'Stop 12' },
];

const Schedule = () => {
    const [value, setValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [valueto, setValueto] = useState('');
    const [filteredSuggestionsto, setFilteredSuggestionsto] = useState([]);

    useEffect(() => {
        if (value.trim() !== '') {
            const filtered = suggestionsData.filter(
                suggestion =>
                    suggestion.stopName.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    }, [value]);

    useEffect(() => {
        if (valueto.trim() !== '') {
            const filteredto = suggestionsData.filter(
                suggestion =>
                    suggestion.stopName.toLowerCase().includes(valueto.toLowerCase())
            );
            setFilteredSuggestionsto(filteredto);
        } else {
            setFilteredSuggestionsto([]);
        }
    }, [valueto]);
    const handleSuggestionPress = (suggestion) => {
        setValue(suggestion.stopName);
        setFilteredSuggestions([]); 
    };
    
    const handleSuggestionPressto = (suggestion) => {
        setValueto(suggestion.stopName);
        setFilteredSuggestionsto([]);
    };
    
    const renderSuggestionItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleSuggestionPress(item)} style={styles.suggestionItem}>
            <Text>{item.stopName}</Text>
        </TouchableOpacity>
    );

    const renderSuggestionItemto = ({ item }) => (
        <TouchableOpacity onPress={() => handleSuggestionPressto(item)} style={styles.suggestionItem}>
            <Text>{item.stopName}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item,index }) => (
        <View style={styles.item} key={index}>
            <Text style={styles.busNumber}>{item.busNumber}</Text>
            <View style={styles.l2}>
                <View style={styles.Comp1}>
                    <Text style={styles.place} >{item.startingPlace}</Text>
                    <Text style={styles.time} >{item.startingTime}</Text>
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
                    <Text style={styles.place}>{item.endingPlace}</Text>
                    <Text style={styles.time}>{item.endingTime}</Text>
                </View>
            </View>
            
            {
                isadmin && <View style={{display:'flex',flexDirection:'row'}}> 
                <Text style={styles.upd}>Update</Text>
                <Text style={styles.dlt}>Delete</Text>
                </View>
            }
        </View>
    );

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
                <Icon name='swap-vertical' size={23} style={styles.arrow} ></Icon>
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
                <View style={styles.box1_1}>
                    <Text>Date</Text>
                    <TextInput style={styles.input}></TextInput>
                </View>
                <View style={styles.button} >
                    <Text style={{ color: 'white' }}>Search</Text>
                </View>
            </View>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
         <View style={{height:60}}>

         </View>
        </View>
    )
}

export default Schedule;

const styles = StyleSheet.create({
    box1: {
        width: 90 * vw,
        height: 45 * vh,
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
        margin: 15,
        marginLeft:'5%',
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
    upd:{
        marginLeft: '50%',
        marginRight:10,
        backgroundColor:'blue',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 5,
        borderRadius: 50,
    }
})