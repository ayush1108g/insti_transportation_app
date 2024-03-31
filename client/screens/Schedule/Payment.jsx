import { View, Text, StyleSheet, Dimensions, TextInput, Button } from 'react-native'
import LoginContext from '../../store/AuthContext';
import React, { useContext, useState, useRef } from 'react';


const vw = (Dimensions.get('window').width) / 100;
const vh = (Dimensions.get('window').height) / 100;

import { openUPIApp } from '../../utils/openUPIapp';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { useAlert } from '../../store/AlertContext';
import { baseBackendUrl } from '../../constant';

export default function Payment({ route, navigation }) {
    const alertCtx = useAlert();
    const [transactionId, setTransactionId] = useState('');
    const [isTransactionId, setIsTransactionId] = useState(false);
    const LoginCtx = useContext(LoginContext);
    const [loading, setLoading] = useState(false);
    const { data } = route.params;
    console.log(data);


    const isStudent = LoginCtx?.user?.role === 'student';

    const schedulePostHandler = async () => {
        setLoading(true);
        console.log(data.paymentMode, transactionId);
        if (data.paymentMode === 'upi' && (transactionId === '' || !transactionId)) {
            alertCtx.showAlert("Please enter transaction ID");
            setLoading(false);
            return;
        }
        data.transactionId = transactionId;
        try {
            const res = await axios.post(baseBackendUrl + "/bookings", {
                userId: LoginCtx?.user?._id,
                scheduleId: data?._id,
                cost: data?.costtopay,
                paymentMethod: data.paymentMode === 'upi' ? 'other' : 'payLater',
                transactionId: transactionId,
            });
            console.log(res.data);
            data.datenow = new Date().toLocaleString();
            navigation.navigate('Ticket', { data: data });

        } catch (error) {
            console.error("Error scheduling:", error);
        } finally {
            setLoading(false);
        }

        setTimeout(() => {
            setLoading(false);
        }, 5000);

    }

    const paymentHandler = async (type) => {
        if (loading) return;
        if (type === 'upi') {
            await openUPIApp(data.costtopay);
            setIsTransactionId(true);
            data.paymentMode = 'upi';
        } else {
            setIsTransactionId(false);
            data.paymentMode = 'payLater';
            schedulePostHandler();
        }
    }

    return (
        <View style={styles.body}>
            <View style={styles.upi}>
                <TouchableOpacity onPress={() => paymentHandler('upi')}>
                    <View style={styles.upi}>
                        <Text style={styles.text}>Pay through UPI</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {isTransactionId && <View style={styles.box1_1}>
                <Text style={{ fontWeight: 'bold' }}>Enter the transaction Id</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Transaction Id'
                    onChangeText={setTransactionId}
                    value={transactionId}
                ></TextInput>
                <Text style={{ color: 'red' }}>Note: Please enter valid TransactionId otherwise you will be penalised.</Text>

                <Button title="Submit" onPress={schedulePostHandler} disabled={loading} />
            </View>}
            {<View style={styles.salary}><TouchableOpacity onPress={() => paymentHandler('payLater')}><View style={styles.salary}><Text style={styles.text}>Pay Later</Text></View></TouchableOpacity></View>}
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
    },
    box1_1: {
        width: '90%',
        height: 20 * vh,
        margin: '5%',

    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        padding: 10,
        marginBottom: 10,
        color: 'grey'
    },



});