import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Button, Text } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

function formatISTDate(dateString) {
    const utcDate = new Date(dateString);
    const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));

    const optionsDate = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };

    const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    const formattedDate = istDate.toLocaleString('en-IN', optionsDate);
    const formattedTime = istDate.toLocaleString('en-IN', optionsTime);

    return { date: formattedDate, time: formattedTime };
}
const Routes = ({ isVisible, onClose, stops, Route }) => {
    console.log('stops', stops);

    let route = Route?.busStops?.sort((a, b) => new Date(a?.arrivalTime).getTime() - new Date(a?.arrivalTime).getTime()); // sort in ascending order

    let updatedRoutes = route?.map((stop, index) => {
        const routeName = stops.find(stopx => stopx._id === stop?.stopId?._id)?.stationName;
        console.log('stop', stop)
        console.log(routeName);
        return {
            ...stop,
            time: formatISTDate(stop?.arrivalTime).time,
            routeName: routeName,
        }
    });

    console.log(updatedRoutes);
    const busRoutes = [
        { time: '9:00 AM', routeName: 'Route A', cost: 10 },
        { time: '10:00 AM', routeName: 'Route B', cost: 15 },
        { time: '11:00 AM', routeName: 'Route C', cost: 20 },
        { time: '12:00 AM', routeName: 'Route A', cost: 10 },
        { time: '1:00 AM', routeName: 'Route B', cost: 15 },
        { time: '11:00 AM', routeName: 'Route C', cost: 20 },
        { time: '9:00 AM', routeName: 'Route A', cost: 10 },
        { time: '10:00 AM', routeName: 'Route B', cost: 15 },
        { time: '11:00 AM', routeName: 'Route C', cost: 20 },
    ];
    const onOpen = () => {
        console.log('Opening modal');
    }

    // Prepare data for the timeline
    const timelineData = updatedRoutes?.map((route, index) => ({
        time: route.time,
        title: route.routeName,
        description: `Cost: $${route.cost}`,
        lineColor: 'blue', // Customize line color if needed
        // icon: { uri: 'https://placeimg.com/60/60/nature' }, // Example icon, replace with your own
    }));

    return (<View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }}>

        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Timeline
                        data={timelineData}
                        circleSize={20}
                        circleColor="#009688"
                        lineColor="#009688"
                        timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
                        timeStyle={{ textAlign: 'center', backgroundColor: '#009688', color: 'white', padding: 5, borderRadius: 13 }}
                        descriptionStyle={{ color: 'grey' }}
                        options={{
                            style: { paddingTop: 5 },
                        }}
                        innerCircle={'dot'}
                        isUsingFlatList={true}
                    />
                    <Button title="Close" onPress={onClose} />
                </View>
            </View>
        </Modal>
    </View>

    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        marginTop: '15%',
        maxHeight: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 10,
        padding: 20,
        minWidth: 300,
        maxWidth: '80%',
    },
});

export default Routes;
