import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { PieChart } from "react-native-gifted-charts";
import LoginContext from '../../store/AuthContext';
import { useAlert } from '../../store/AlertContext';
import axios from 'axios';
import { baseBackendUrl } from '../../constant';
import ExpenseItem from '../../components/ExpenseItem';

const Stats = ({ navigation }) => {
    const [data, setData] = useState();
    const [previousRides, setPreviousRides] = useState([]);
    const loginCtx = useContext(LoginContext);
    const alertCtx = useAlert();
    const chartData = [
        { value: 1, color: '#496989' },
        { value: 1, color: '#A8CD9F' },
    ];
    const [PieChartData, setPieChartData] = useState(chartData);


    useEffect(() => {
        const id = loginCtx.user._id;
        const fetchData = async () => {
            try {
                const resp = await axios.get(baseBackendUrl + '/users/' + id);
                setData(resp.data);
                setPreviousRides(resp.data?.previousRides);
            } catch (err) {
                alertCtx.showAlert(err.message, 'error');
            }
        }
        fetchData();
    }, [loginCtx.user]);

    useEffect(() => {
        chartData[0].value = data?.payLater || 1;
        chartData[1].value = previousRides.reduce((total, ride) => {
            if (ride.paymentMethod === 'other') {
                return total + ride.cost;
            }
            return total;
        }, 0);
        console.log(previousRides);
        console.log(chartData);
        chartData[0].text = '₹' + chartData[0].value;
        chartData[1].text = '₹' + chartData[1].value;
        setPieChartData(chartData);
    }, [data, previousRides]);

    return (
        <View style={{ flex: 1, width: '100%' }}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}><Text style={{
                fontWeight: 'bold',
            }}>Payment Summary</Text></View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <PieChart
                    donut
                    isThreeD
                    showText
                    innerCircleBorderWidth={5}
                    innerCircleBorderColor="lightgray"
                    textColor="black"
                    radius={170}
                    textSize={15}
                    showTextBackground
                    textBackgroundRadius={26}
                    data={PieChartData}
                />
            </View>
            <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'start', paddingHorizontal: 20,
                borderBottomWidth: 1,
                paddingBottom: 20,
            }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                        width: 10,
                        height: 10,
                        backgroundColor: chartData[0].color,
                        borderRadius: 50
                    }}></View>
                    <View><Text> Pay Later</Text></View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                        width: 10,
                        height: 10,
                        backgroundColor: chartData[1].color,
                        borderRadius: 50
                    }}></View>
                    <View><Text> UPI</Text></View>
                </View>
            </View>
            <ExpenseItem data={previousRides} />
            <View style={{ minHeight: 160 }}></View>
        </View>
    );
}

export default Stats;

const styles = StyleSheet.create({});
