import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



function formatISTDate(dateString) {
    const utcDate = new Date(dateString);
    const istDate = new Date(utcDate.getTime());

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
const GridTable = ({ data }) => {
    return (
        <View style={styles.container}>
            {/* Table Header */}
            <View style={styles.row}>
                <Text style={[styles.cell, styles.header]}>Sr.No</Text>
                <Text style={[styles.cell, styles.header]}>Amount</Text>
                <Text style={[styles.cell, styles.header]}>Payment Method</Text>
                {/* <Text style={[styles.cell, styles.header]}>Schedule ID</Text> */}
                <Text style={[styles.cell, styles.header]}>Time Created At</Text>
            </View>

            {/* Table Body */}
            {data.map((item, index) => {
                const time = formatISTDate(item.createdAt);
                const timestr = time.date + ' ' + time.time;
                return <View key={index} style={styles.row}>
                    <Text style={styles.cell}>{index}</Text>
                    <Text style={styles.cell}>{item.cost}</Text>
                    <Text style={styles.cell}>{item.paymentMethod === 'payLater' ? 'Pay Later' : 'UPI'}</Text>
                    {/* <Text style={styles.cell}>{item.scheduleId}</Text> */}
                    <Text style={styles.cell}>{timestr}</Text>
                </View>
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    cell: {
        flex: 1,
        padding: 10,
        textAlign: 'center',
    },
    header: {
        backgroundColor: 'lightgray',
        fontWeight: 'bold',
    },
});

export default GridTable;
