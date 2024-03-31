import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, TouchableOpacity, FlatList, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import LoginContext from '../../store/AuthContext';
import axios from 'axios';
import { baseBackendUrl } from '../../constant';
import { useAlert } from '../../store/AlertContext';
const vw = (Dimensions.get('window').width) / 100;
const vh = (Dimensions.get('window').height) / 100;

const UpdateProfile = ({ navigation }) => {
  const LoginCtx = useContext(LoginContext);
  const alertCtx = useAlert();

  const [name, setName] = useState('');
  const [phNumber, setPhNumber] = useState('');
  const [email, setEmail] = useState('');

  const handlePress = async () => {
    try {
      const response = await axios.put(`${baseBackendUrl}/users/${LoginCtx.user._id}`, {
        phoneNumber: phNumber,
        name: name,
        email: email
      });
      console.log("hi", response.data);
      alertCtx.showAlert('success', "Profile Updated Successfully");
      LoginCtx.setUser(response.data)
      navigation.navigate('ProfilePage');
      return response;
    } catch (err) {
      console.log(err);
      alertCtx.showAlert('error', err.message);
    }
  }
  return (
    <View>
      <Text style={{ marginLeft: 26 * vw, fontSize: 7 * vw }}>Update Profile</Text>
      <View style={styles.box1}>

        <View style={styles.box1_1}>
          <Text style={{ fontWeight: 'bold' }}>Name</Text>
          <TextInput style={styles.input} onChangeText={(text) => setName(text)}>{LoginCtx.user.name}</TextInput>
        </View>
        <View style={styles.box1_1}>
          <Text style={{ fontWeight: 'bold' }}>Email</Text>
          <TextInput style={styles.input} onChangeText={(text) => setEmail(text)}>{LoginCtx.user.email}</TextInput>
        </View>
        <View style={styles.box1_1}>
          <Text style={{ fontWeight: 'bold' }}>Phone Number</Text>
          <TextInput style={styles.input} keyboardType='numeric' onChangeText={(text) => setPhNumber(text)}>{LoginCtx.user.phoneNumber}</TextInput>
        </View>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={{ color: 'white' }}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default UpdateProfile;

const styles = StyleSheet.create({
  box1: {
    width: 90 * vw,
    height: 70 * vh,
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
})