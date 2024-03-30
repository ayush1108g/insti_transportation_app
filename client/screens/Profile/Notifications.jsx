import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { baseBackendUrl } from '../../constant';

const Notificatios = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // fetch notifications
        const fetch = async () => {
            try {
                const res = await axios.get(baseBackendUrl + "/notifications");
                setNotifications(res.data);
                console.log(res.data);

            } catch (e) {
                console.log(e);
            }
        }
        fetch();
    }, []);

    return (
        <View>
            {!notifications && <Text>Notificatios</Text>}
            <View style={styles.container}>
                <View><Text>Text</Text></View>
                <View><Text>Message</Text></View>
                <View></View>

            </View>
        </View>
    )
}

export default Notificatios;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        margin: 20,
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 10,
    }
})