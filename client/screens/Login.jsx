import React, { useState, useContext, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import LoginContext from "../store/AuthContext";
import axios from "axios";
import { baseBackendUrl } from "../constant";
import SelectDropdown from 'react-native-select-dropdown'
import useSocket from "../store/SocketContext";
const Roles = [
    { title: 'Select' },
    { title: 'Student' },
    { title: 'Faculty' },
    { title: 'Admin' },
];

import { useAlert } from "../store/AlertContext";

const Auth = ({ navigation }) => {
    const SocketCtx = useSocket();
    const alertCtx = useAlert();
    const loginctx = useContext(LoginContext);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        if (loginctx.isLoggedIn) {
            navigation.replace("Tabs");
        }
    }, [loginctx.isLoggedIn]);

    const handleLogin = async () => {
        // alertCtx.showAlert("success", "Login proceed");
        // SocketCtx.sendMessages({ title: 'Notification from Ayush', message: 'Kaam krlo' });
        // return;
        if (email.length <= 5 || password.length < 8) {
            return alertCtx.showAlert('error', 'Password must be at least 8 characters long');
        }
        console.log("Logging in with:", email, password);
        try {
            const response = await axios.post(`${baseBackendUrl}/users/login`, {
                email: email,
                password: password,
            });
            alertCtx.showAlert('success', 'Login successful');
            console.log(response.data);
            loginctx.setUser(response.data.user);
            loginctx.setToken(response.data.user?._id);
            loginctx.setIsLoggedIn(true);
        } catch (error) {
            console.log(error);
            alertCtx.showAlert('error', err.message);
        }
    };

    const handleSignup = async () => {
        if (email.length <= 5 || password.length < 8) {
            return alertCtx.showAlert('error', 'Password must be at leat 8 chars long');
        }
        if (role.length === 0 || role === 'select') {
            return alertCtx.showAlert('error', 'Please select a role');
        }
        if (phoneNumber.length !== 10) {
            return alertCtx.showAlert('error', 'Please enter a valid phone number');
        }
        if (email.split('@')[1] !== 'iitbbs.ac.in') {
            return alertCtx.showAlert('error', 'Please use your IIT Bhubaneswar email id');
        }

        console.log("Signing up with:", name, email, password, role, phoneNumber);
        console.log(`${baseBackendUrl}/users`);
        try {
            const response = await axios.post(`${baseBackendUrl}/users`, {
                name: name,
                email: email,
                password: password,
                role: role,
                phoneNumber: phoneNumber
            });
            alertCtx.showAlert('success', "Signup successful")
            loginctx.setUser(response.data);
            loginctx.setToken(response.data?._id);
            loginctx.setIsLoggedIn(true);
            console.log(response.data);

        } catch (error) {
            console.log(error);
            alertCtx.showAlert('error', error.message);
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const [emailFocused, setEmailFocused] = useState(false);
    const [nameFocused, setNameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [phoneFocused, setPhoneFocused] = useState(false);


    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                {/* {message.length > 0 && (
                    <View
                        style={{ padding: 10, backgroundColor: "red", marginBottom: 10 }}
                    >
                        <Text>{message}</Text>
                    </View>
                )} */}
                <Text style={styles.title}>{isLogin ? "Login" : "Signup"}</Text>
                {!isLogin && (
                    <View style={styles.inputContainer}>
                        <Text
                            style={[
                                styles.placeholder,
                                nameFocused && styles.placeholderFocused,
                            ]}
                        >
                            {(name.length === 0 || nameFocused) && "Name"}
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            onFocus={() => setNameFocused(true)}
                            onBlur={() => setNameFocused(false)}
                            autoCapitalize="none"
                        />
                    </View>
                )}
                <View style={styles.inputContainer}>
                    <Text
                        style={[
                            styles.placeholder,
                            emailFocused && styles.placeholderFocused,
                        ]}
                    >
                        {(email.length == 0 || emailFocused) && "Email"}
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text
                        style={[
                            styles.placeholder,
                            passwordFocused && styles.placeholderFocused,
                        ]}
                    >
                        {(password.length == 0 || passwordFocused) && "Password"}
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        secureTextEntry
                    />
                </View>

                {!isLogin && (
                    <View style={styles.inputContainer}>
                        <Text
                            style={[
                                styles.placeholder,
                                phoneFocused && styles.placeholderFocused,
                            ]}
                        >
                            {(phoneNumber.length === 0 || nameFocused) && "Phone Number"}
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            onFocus={() => setPhoneFocused(true)}
                            onBlur={() => setPhoneFocused(false)}
                            autoCapitalize="none"
                        />
                    </View>
                )}



                {!isLogin && <View style={styles.inputContainer}>

                    <SelectDropdown
                        data={Roles}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            setRole(selectedItem.title.toLowerCase());
                        }}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                                <View style={styles.dropdownButtonStyle}>

                                    <Text style={styles.dropdownButtonTxtStyle}>
                                        {(selectedItem && selectedItem.title) || 'Select your role'}
                                    </Text>

                                </View>
                            );
                        }}
                        renderItem={(item, index, isSelected) => {
                            return (
                                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>

                                    <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                </View>
                            );
                        }}
                        showsVerticalScrollIndicator={false}
                        dropdownStyle={styles.dropdownMenuStyle}
                    />

                </View>
                }


                {isLogin ? (
                    <Button title="Login" onPress={handleLogin} />
                ) : (
                    <Button title="Signup" onPress={handleSignup} />
                )}
                <Text style={styles.toggle} onPress={() => setIsLogin(!isLogin)}>
                    {isLogin
                        ? "Don't have an account? Sign up"
                        : "Already have an account? Login"}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    inputContainer: {
        width: "100%",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "gray",
        borderBottomWidth: 1,
        paddingHorizontal: 10,
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
    dropdownButtonStyle: {
        width: '100%',
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});

export default Auth;
