import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    SafeAreaView,
    ScrollView,
    FlatList,
    Button,
    Alert,
} from 'react-native';
//import Icon from "react-native-vector-icons/FontAwesome";
import InputField from '../../../components/Vet/InputField';
import COLORS from '../../../utils/Vet/colors';
import { fireDB } from '../../../database/firebaseConfig';
import { collection, addDoc, doc } from "firebase/firestore";

export function GetAppointment() {
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [vetName, setVetName] = useState('');
    const [reason, setReason] = useState('');
    const [appntDate, setAppntDate] = useState('');
    const [appntTime, setAppntTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSaveAppointment = async () => {
        try {
            setLoading(true);
            await addDoc(collection(fireDB, "appointments"), {
                fname,
                lname,
                email,
                contact,
                vetName,
                reason,
                appntDate,
                appntTime,
            });
            setFName('');
            setLName('');
            setEmail('');
            setContact('');
            setVetName('');
            setReason('');
            setAppntDate('');
            setAppntTime('');
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }


    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <View>
                <Text style={styles.createBogHeader}>Veterinarian Appointment</Text>
            </View>
            <ScrollView
                contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
                <View style={{ marginVertical: 20 }}>

                    {/* Name field */}
                    <View>
                        <Text style={styles.titleStyle}>Name</Text>
                        <InputField
                              onChangeText={setFName}
                              value={fname}
                            placeholder="first name"
                        />
                    </View>
                    <View>
                        <InputField
                              onChangeText={setLName}
                              value={lname}
                            placeholder="last name"
                        />
                    </View>

                    {/* Email field */}
                    <View>
                        <Text style={styles.titleStyle}>Email</Text>
                        <InputField
                              onChangeText={setEmail}
                              value={email}
                            placeholder="email"
                        />
                    </View>

                    {/* Contact number field */}
                    <View>
                        <Text style={styles.titleStyle}>Contact number</Text>
                        <InputField
                              onChangeText={setContact}
                              value={contact}
                            placeholder="contact number"
                        />
                    </View>

                    {/* Select Veterinarian field */}
                    <View>
                        <Text style={styles.titleStyle}>Select Veterinarian</Text>
                        <InputField
                              onChangeText={setVetName}
                              value={vetName}
                            placeholder="dropdown"
                        />
                    </View>

                    {/* Reason of Appointment */}
                    <View>
                        <Text style={styles.titleStyle}>Reason of Appointment</Text>
                        <InputField
                              onChangeText={setReason}
                              value={reason}
                            placeholder="reason"
                        />
                    </View>

                    {/* Appointment Date field */}
                    <View>
                        <Text style={styles.titleStyle}>Appointment Date</Text>
                        <InputField
                              onChangeText={setAppntDate}
                              value={appntDate}
                            placeholder="date"
                        />
                    </View>

                    {/* Appointment Time field */}
                    <View>
                        <Text style={styles.titleStyle}>Appointment Time</Text>
                        <InputField
                              onChangeText={setAppntTime}
                              value={appntTime}
                            placeholder="time"
                        />
                    </View>

                    {/* SUBMIT BUTTON */}
                    <View style={styles.createNewBtnMain}>
                        <Button
                            title="Proceed"
                            onPress={handleSaveAppointment}
                            style={styles.createNewBtn}
                            color="blue"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    createBogHeader: {
        //   color: "blue",
        textAlign: "center",
        fontSize: 22,
        marginTop: 30,
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginLeft: 5,
    },
    box1: {
        paddingLeft: 0,
        paddingTop: 10,
        width: "70%",
    },
    box2: {
        padding: 10,
        borderRadius: 10,
        width: "30%",
    },
    hourBox1: {
        paddingLeft: 0,
        paddingTop: 10,
        width: "30%",
    },
    MinutsBox2: {
        padding: 10,
        borderRadius: 10,
        width: "30%",
    },
    AMPMBox2: {
        padding: 10,
        borderRadius: 10,
        width: "30%",
    },
    mainSheet: {
        backgroundColor: "white",
        marginBottom: 40,
    },
    bodySheet: {
        marginHorizontal: 30,
        marginTop: 10,
    },
    titleStyle: {
        //   color: "blue",
        fontSize: 16,
        marginBottom: 15
    },
    input: {
        height: 40,
        padding: 10,
        outline: 1,
        borderBottomWidth: 2,
        //   borderColor: "blue",
    },
    multiText: {
        paddingLeft: 10,
        outline: 1,
        borderWidth: 2,
        //   borderColor: "blue",
    },
    dateInput: {
        height: 40,
        padding: 10,
        outline: 1,
        borderWidth: 2,
        //   borderColor: "blue",
    },
    createNewBtn: {
        marginTop: 50,
        padding: 15,
        borderRadius: 10,
        marginLeft: 30,
    },
    createNewBtnMain: {
        marginTop: 50,
        marginBottom: 50,
        paddingBottom: 20,
    },
});

