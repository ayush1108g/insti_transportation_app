import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react';
import useSocket from '../../store/SocketContext';
import { useAlert } from '../../store/AlertContext';
import axios from 'axios';
import { baseBackendUrl } from '../../constant';

const SendNotification = ({ navigation }) => {
    const socketCtx = useSocket();
    const alert = useAlert();
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const [messageFocused, setMessageFocused] = useState(false);
    const [titleFocused, setTitleFocused] = useState(false);

    const sendNotificationHandler = async () => {
        if (!title || !message) {
            return alert.showAlert('error', 'Please fill all fields');
        }
        try {
            const resp = await axios.post(baseBackendUrl + '/notifications', {
                title,
                message
            });
            console.log(resp.data);
            socketCtx.sendMessages({ title, message });
            navigation.navigate('AdminPage');
        } catch (err) {
            alert.showAlert('error', 'Failed to send notification');
            console.log(err);
        }

    }

    return (
        <View style={styles.mainConntainer}>
            <Text>Send Notification</Text>
            <View style={styles.innerContainer}>
                <View style={styles.inputContainer}>
                    <Text
                        style={[
                            styles.placeholder,
                            titleFocused && styles.placeholderFocused,
                        ]}
                    >
                        {(title.length === 0 || titleFocused) && "Title"}
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        onFocus={() => setTitleFocused(true)}
                        onBlur={() => setTitleFocused(false)}
                        autoCapitalize="none"
                        maxLength={50}
                    />
                </View>


                <View style={styles.inputContainer}>
                    <Text
                        style={[
                            styles.placeholder,
                            messageFocused && styles.placeholderFocused,
                        ]}
                    >
                        {(message.length === 0 || messageFocused) && "Message"}
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={message}
                        onChangeText={setMessage}
                        onFocus={() => setMessageFocused(true)}
                        onBlur={() => setMessageFocused(false)}
                        autoCapitalize="none"
                        multiline={true}
                        maxLength={100}
                    />
                </View>

            </View>

            <Button title="Send Notification" style={styles.button} onPress={sendNotificationHandler} />
        </View>
    )
}

export default SendNotification;

const styles = StyleSheet.create({
    mainConntainer: {
        flex: 1,
        padding: 20,
        alignItems: "center",
    },
    innerContainer: {
        width: "80%",
        marginTop: 40,
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "gray",
        borderBottomWidth: 1,
        paddingHorizontal: 10,
    },
    inputContainer: {
        width: "100%",
        marginBottom: 20,
    },
    placeholder: {
        position: "absolute",
        left: 10,
        top: 12,
        fontSize: 16,
        color: "gray",
    },
    placeholderFocused: {
        top: -8,
        fontSize: 12,
        color: "blue",
    },
    toggle: {
        marginTop: 20,
        color: "blue",
    },
})