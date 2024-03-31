import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UpdateProfile = () => {
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

export default UpdateProfile

const styles = StyleSheet.create({})