import { View, Text, StyleSheet, Dimensions, Button } from 'react-native'
import React, { useRef, useContext, useState } from 'react'
import ViewShot from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
const vw = (Dimensions.get('window').width) / 100;
const vh = (Dimensions.get('window').height) / 100;
import { useAlert } from '../../store/AlertContext';
import LoginContext from '../../store/AuthContext';

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


export default function Eticket({ route, navigation }) {
    const alertCtx = useAlert();
    const loginCtx = useContext(LoginContext);
    const { data } = route.params;
    console.log(data.dateString);
    const viewShotRef = useRef(null);
    const [oneTime, setOneTime] = useState(false);

    const captureImage = async () => {
        if (oneTime) {
            alertCtx.showAlert('info', 'Image already saved to gallery');
            return;
        }
        try {
            const uri = await viewShotRef.current.capture();
            saveImage(uri);
        } catch (error) {
            console.error('Error capturing image:', error);
        }
    };

    const saveImage = async (uri) => {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Media library permissions denied');
                return;
            }

            const asset = await MediaLibrary.createAssetAsync(uri);
            const albumName = 'INSTITUTE_APP'; // Specify the name of the album in which you want to save the image

            // Check if the album exists, if not, create it
            let album = await MediaLibrary.getAlbumAsync(albumName);
            if (album === null) {
                // Create the album if it doesn't exist
                album = await MediaLibrary.createAlbumAsync(albumName, asset, false);
            }

            // Add the asset to the album
            const result = await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);

            // Check if all assets were successfully added to the album
            if (result.length === 1 && result[0].isError) {
                throw new Error('Could not add the asset to the album');
            }

            console.log('Image saved to gallery');
            alertCtx.showAlert('success', 'Image saved successfully to gallery');
            setOneTime(true);
        } catch (error) {
            console.error('Error saving image:', error);
        }
    };

    return (<View>
        <ViewShot ref={viewShotRef} style={styles.captureComponent}>

            <View style={styles.item}>
                <View >
                    <View style={styles.container}>
                        <Text style={styles.title} >E-receipt</Text>
                        <Text style={styles.cost}>₹{data.costtopay}</Text>
                    </View>
                    <View style={styles.l1}>
                        <Text style={styles.busNumber}>{data?.routeName}</Text>
                    </View>
                    <Text style={styles.date}>{data.dateString}</Text>
                    <View style={styles.l2}>
                        <View style={styles.Comp1}>
                            <Text style={styles.place} >{data.from}</Text>
                            <Text style={styles.time} >{formatISTDate(data.DepartureTime).time}</Text>
                        </View>
                        <View style={styles.Compmid}>
                            <View style={styles.w0l}>

                            </View >
                            <View style={styles.smbx}>

                            </View>
                            <View style={styles.w0r}>

                            </View>
                        </View>
                        <View style={styles.Comp2}>
                            <Text style={styles.place}>{data.to}</Text>
                            <Text style={styles.time}>{formatISTDate(data.ArrivalTime).time}</Text>
                        </View>
                    </View>
                    <View style={styles.paidthrough}>
                        <Text >{'Paid Through:' + data.paymentMode} </Text>
                        {data?.transactionId && <Text >{'Transaction Id:' + data.transactionId} </Text>}
                        <Text>Paid by - {loginCtx?.user?.name}</Text>
                    </View>

                </View>
                <View style={styles.succes}>
                    <Text style={{ color: 'white' }}>Ticket Fare PAID Successfuly</Text>
                </View>
                <View>
                    <Text >Note: If you have paid through UPI then your transaction ID should be correct</Text>
                </View>
                <View>
                    <Text>{data.datenow}</Text>
                </View>
            </View>
        </ViewShot>
        <Button title="Capture and Save" onPress={captureImage} />

    </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
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
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cost: {
        fontSize: 20,
    },
    b2: {
        marginTop: 0,
    },
    b1: {
        marginBottom: 0,
    },
    busNumber: {
        fontSize: 20,
    },
    Comp1: {

    },
    Comp2: {

    },
    Compmid: {
        width: 40 * vw,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    l2: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    place:
    {
        fontSize: 15,
    },
    w0l: {
        borderColor: 'black',
        borderWidth: 1,
        width: 40,
    },
    w0r: {
        borderColor: 'black',
        borderWidth: 1,
        width: 40,
    },
    smbx: {
        borderColor: 'black',
        borderWidth: 1,
        width: 60,
        height: 30,
        borderRadius: 50,
    },
    time: {
        fontSize: 12,
    },
    succes: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        display: 'flex',
        backgroundColor: 'blue',
        padding: 20,
        borderRadius: 10,
        marginBottom: 40,
    },
    title: {
        marginBottom: 40,
        fontSize: 25,
    },
    l1: {

        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },
    date: {
        fontSize: 12,
        // marginLeft: '0%'
    },
    paidthrough: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
    }
})