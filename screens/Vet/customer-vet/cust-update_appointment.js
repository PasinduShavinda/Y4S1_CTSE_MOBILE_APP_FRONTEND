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
import { updateDoc, doc } from "firebase/firestore";

export function UpdateAppointment({ route, navigation }) {
    const { appntId, fname, lname, email, contact, vetName, reason, appntDate, appntTime } = route.params;
    const [newFName, setNewFName] = useState(fname);
    const [newLName, setNewLName] = useState(lname);
    const [newEmail, setNewEmail] = useState(email);
    const [newContact, setNewContact] = useState(contact);
    const [newVetName, setNewVetName] = useState(vetName);
    const [newReason, setNewReason] = useState(reason);
    const [newAppntDate, setNewAppntDate] = useState(appntDate);
    const [newAppntTime, setNewAppntTime] = useState(appntTime);

    const handleUpdateAppointment = async () => {
        const appntRef = doc(fireDB, 'appointments', appntId)
        await updateDoc(appntRef, {
            fname: newFName,
            lname: newLName,
            email: newEmail,
            contact: newContact,
            vetName: newVetName,
            reason: newReason,
            appntDate: newAppntDate,
            appntTime: newAppntTime,
        }).then(() => {
            Alert.alert('Successfully Updated')
            navigation.navigate('CustHome')
        }).catch((error) => {
            alert(error.message)
        })
    };

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <View>
                <Text style={styles.createBogHeader}>Update Appointment</Text>
            </View>
            <ScrollView
                contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
                <View style={{ marginVertical: 20 }}>

                    {/* Name field */}
                    <View>
                        <Text style={styles.titleStyle}>Name</Text>
                        <InputField
                            onChangeText={setNewFName}
                            value={newFName}
                            placeholder="first name"
                        />
                    </View>
                    <View>
                        <InputField
                            onChangeText={setNewLName}
                            value={newLName}
                            placeholder="last name"
                        />
                    </View>

                    {/* Email field */}
                    <View>
                        <Text style={styles.titleStyle}>Email</Text>
                        <InputField
                            onChangeText={setNewEmail}
                            value={newEmail}
                            placeholder="email"
                        />
                    </View>

                    {/* Contact number field */}
                    <View>
                        <Text style={styles.titleStyle}>Contact number</Text>
                        <InputField
                            onChangeText={setNewContact}
                            value={newContact}
                            placeholder="contact number"
                        />
                    </View>

                    {/* Select Veterinarian field */}
                    <View>
                        <Text style={styles.titleStyle}>Select Veterinarian</Text>
                        <InputField
                            onChangeText={setNewVetName}
                            value={newVetName}
                            placeholder="dropdown"
                        />
                    </View>

                    {/* Reason of Appointment */}
                    <View>
                        <Text style={styles.titleStyle}>Reason of Appointment</Text>
                        <InputField
                            onChangeText={setNewReason}
                            value={newReason}
                            placeholder="reason"
                        />
                    </View>

                    {/* Appointment Date field */}
                    <View>
                        <Text style={styles.titleStyle}>Appointment Date</Text>
                        <InputField
                            onChangeText={setNewAppntDate}
                            value={newAppntDate}
                            placeholder="date"
                        />
                         <View style={{ margin: 20 }}>
                            <Button onPress={() => {
                                // setShowAppntDate(true);
                            }} title="Pick date" />
                        </View>
                    </View>

                    {/* Appointment Time field */}
                    <View>
                        <Text style={styles.titleStyle}>Appointment Time</Text>
                        <InputField
                            onChangeText={setNewAppntTime}
                            value={newAppntTime}
                            placeholder="time"
                        />
                         <View style={{ margin: 20 }}>
                            <Button onPress={() => {
                                // setShowAppntTime(true);
                            }} title="Pick Time" />
                        </View>
                    </View>
                    {/* UPDATE BUTTON */}
                    <View style={styles.createNewBtnMain}>
                        <Button
                            title="UPDATE"
                            onPress={handleUpdateAppointment}
                            style={styles.createNewBtn}
                            color="orange"
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    createBogHeader: {
        //   color: "blue",
        textAlign: "center",
        fontSize: 22,
        marginTop: 80,
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
        marginBottom: 15,
        marginTop: 32,
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
    profilePictureContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    profilePicture: {
        width: 150,
        height: 150,
        marginBottom: 10,
    },
    inputContainer: {
        height: 95,
        backgroundColor: COLORS.light,
        flexDirection: 'row',
        paddingHorizontal: 15,

    },
});
