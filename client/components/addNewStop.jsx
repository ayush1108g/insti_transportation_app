import { StyleSheet, Text, View ,Dimensions, TextInput, ScrollView , TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'


const vw = (Dimensions.get('window').width) / 100;
const vh = (Dimensions.get('window').height) / 100;

const AddNewStop = () => {
  return (
    <View>
           <Text style={{marginLeft:24*vw , fontSize:7*vw}}>Add New Stop</Text>
              <View style={styles.box1}>
        
                 <View style={styles.box1_1 }>
                    <Text style={{fontWeight:'bold'}}>Stop</Text>
                    <TextInput style={styles.input}></TextInput>
                </View>
                <TouchableOpacity style={styles.button}  >
                    <Text style={{ color: 'white' }}>Add</Text>
                </TouchableOpacity>
                </View>
    </View>
  )
}

export default AddNewStop

const styles = StyleSheet.create({
    box1: {
        width: 90 * vw,
        height: 40* vh,
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
})