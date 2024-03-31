import { StyleSheet, Text, View ,Dimensions, TextInput, ScrollView , TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'


const vw = (Dimensions.get('window').width) / 100;
const vh = (Dimensions.get('window').height) / 100;

const AddNewRoute= () => {
    const [inputNum, setInputNum] = useState(0);
    const [num,setnum] = useState([]);
    
    const handleInputChange = (text) => {
        setInputNum(text);
      };
    const Nextpress=()=>{
        let numt = [];
        for(let i=1;i<=inputNum;i++)
            numt.push(i);
        console.log(numt);
        setnum(numt);
    }
   
    const renderItem = (ind) => {
        console.log(ind);
        return(
        <View style={styles.stops}>
            <Text>Stop {ind}</Text>
            <TextInput style={styles.input2}></TextInput>
            <Text>Fare from Start point</Text>
            <TextInput style={styles.input2}></TextInput>
            <Text>Time of arrival</Text>
            <TextInput style={styles.input2}></TextInput>
        </View>
    )};

  return (
    <View>
        <Text style={{marginLeft:24*vw , fontSize:7*vw}}>Add New Route</Text>
    <View style={styles.box1}>
        
                 <View style={styles.box1_1 }>
                    <Text style={{fontWeight:'bold'}}>BusNumber</Text>
                    <TextInput style={styles.input}></TextInput>
                </View>
                 <View style={styles.box1_1}>
                    <Text style={{fontWeight:'bold'}}>Number of Stations</Text>
                    <TextInput style={styles.input} keyboardType='numeric'maxLength={2}  onChangeText={handleInputChange}></TextInput>
                </View>
                <TouchableOpacity style={styles.button}  onPress={Nextpress} >
                    <Text style={{ color: 'white' }}>Next</Text>
                </TouchableOpacity>
                <ScrollView>
                {
                    num.map((item,ind)=>{
                        return renderItem(ind) ;
                    })
                }
                {
                    num.length>0&&
                 <View style={styles.button}>
                      <Text style={{color:'white'}}>Submit</Text>
                      </View>
                  }
                </ScrollView>
                <View style={{height:60}}>
                      
                </View>
            </View>
    </View>
  )
}

export default AddNewRoute

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
        overflow:'auto'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
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
})