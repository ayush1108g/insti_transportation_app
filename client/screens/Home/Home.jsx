import { View, Text ,StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const vw = (Dimensions.get('window').width) / 100;
const vh = (Dimensions.get('window').height) / 100;

let isfaculty=true ;
export default function Payment  () {
  return (
    <View style={styles.body}>
        <View style={styles.upi}>
      <Text style={styles.text}>Pay through UPI</Text>
      </View>
      { isfaculty &&<View style={styles.salary}><Text style={styles.text}>Pay Later</Text></View>}
    </View>
  )
}

const styles = StyleSheet.create({
 body:{
      justifyContent:'center',
      alignContent:'center',
      textAlign:'centre',
      width:100*vw ,
      height:80*vh ,
 },
upi:{
   margin:'5%',
   borderColor:'black',
   borderWidth:1,
   height:'10%',
   width:'90%',
   justifyContent:'center',
   alignContent:'center',
   textAlign:'centre',
   borderRadius:10,
   padding:20,
   backgroundColor:'blue'
},
salary:{
    margin:'5%',
    borderColor:'black',
    borderWidth:1,
    height:'10%',
    width:'90%',
    justifyContent:'center',
    alignContent:'center',
    textAlign:'centre',
    borderRadius:10,
    padding:20,
    backgroundColor:'black',
},
text:{
    color:'white',
}



}) ;