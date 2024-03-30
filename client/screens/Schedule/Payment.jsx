import { View, Text, StyleSheet, Dimensions } from 'react-native'
import LoginContext from '../../store/AuthContext';
import React, { useContext } from 'react'

const vw = (Dimensions.get('window').width) / 100;
const vh = (Dimensions.get('window').height) / 100;

import { openUPIApp } from '../../utils/openUPIapp';
import { handlePayment } from '../../utils/upiPayment';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Payment() {
    const LoginCtx = useContext(LoginContext);
    const isStudent = LoginCtx?.user?.role === 'student';

    const upiOpenHandler = async () => {
        // await openUPIApp(1);
        await handlePayment(1);
    };

    return (
        <View style={styles.body}>

            <View style={styles.upi}>
                <TouchableOpacity onPress={upiOpenHandler}>
                    <Text style={styles.text}>Pay through UPI</Text>
                </TouchableOpacity>
            </View>
            {!isStudent && <View style={styles.salary}><Text style={styles.text}>Pay Later</Text></View>}
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'centre',
        width: 100 * vw,
        height: 80 * vh,
    },
    upi: {
        margin: '5%',
        borderColor: 'black',
        borderWidth: 1,
        height: '15%',
        width: '90%',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'centre',
        borderRadius: 10,
        padding: 20,
        backgroundColor: 'blue'
    },
    salary: {
        margin: '5%',
        borderColor: 'black',
        borderWidth: 1,
        height: '15%',
        width: '90%',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'centre',
        borderRadius: 10,
        padding: 20,
        backgroundColor: 'black',
    },
    text: {
        color: 'white',
        textAlign: 'center',
        minHeight: 20,
    }



});