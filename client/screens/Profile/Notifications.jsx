import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import useSocket from '../../store/SocketContext';
import { baseBackendUrl } from '../../constant';

const Notifications = () => {
    const socket = useSocket();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axios.get(baseBackendUrl + "/notifications");
                const notifications = res.data;
                setNotifications(notifications.reverse());
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, [socket.updated]);

    const renderNotificationItem = ({ item }) => (
        <View style={styles.notificationItem}>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.title}</Text>
            <Text style={{ fontSize: 12 }}>{item.message}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {notifications.length === 0 && <Text>No notifications available</Text>}
            <FlatList
                data={notifications}
                renderItem={renderNotificationItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    notificationItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginLeft: 10,
        width: '95%',
    },
});

export default Notifications;
