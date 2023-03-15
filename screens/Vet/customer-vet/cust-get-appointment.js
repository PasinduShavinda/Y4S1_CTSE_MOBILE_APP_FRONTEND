import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Button,
    Keyboard,
    Platform
} from 'react-native';
import InputField from '../../../components/Vet/InputField';
import COLORS from '../../../utils/Vet/colors';
import { fireDB } from '../../../database/firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import MyDatePicker from '../../../components/Vet/MyDatePicker';
import MyTimePicker from '../../../components/Vet/MyTimePicker';
// import DatePicker from '@react-native-community/datetimepicker';
// import DropdownPicker from 'react-native-dropdown-picker';


export function GetAppointment({ navigation }) {
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
    const [showAppntDate, setShowAppntDate] = useState(false);
    const [showAppntTime, setShowAppntTime] = useState(false);

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
    const FormValidate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!fname) {
            handleError('First name cannot be empty', 'fname');
            isValid = false;
        }
        if (!lname) {
            handleError('Last name cannot be empty', 'lname');
            isValid = false;
        }

        if (!email) {
            handleError('Email cannot be empty', 'email');
            isValid = false;
        } else if (!email.match(/\S+@\S+\.\S+/)) {
            handleError('Invalid email', 'email');
            isValid = false;
        }

        if (!contact) {
            handleError('Contact number cannot be empty', 'contact');
            isValid = false;
        }

        if (!vetName) {
            handleError('Vetrinary name cannot be empty', 'vetName');
            isValid = false;
        }

        if (!reason) {
            handleError('Reason Cannot be empty', 'reason');
            isValid = false;
        }

        if (!appntDate) {
            handleError('Appointment date is mandatory', 'appntDate');
            isValid = false;
        }

        if (!appntTime) {
            handleError('Appointment time is mandatory', 'appntTime');
            isValid = false;
        }
        if (isValid) {
            handleSaveAppointment();
            _navigateToSnackAppnt()
        }
    };

    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    const _navigateToSnackAppnt = () => {
        navigation.navigate('SnackSaveAppnt')
    }

    const getDate = (date) => {
        setAppntDate(date);
        setShowAppntDate(false);
    };

    const getTime = (time) => {
        setAppntTime(time);
        setShowAppntTime(false);
    };

    return (
        
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
            <View>
                <Text style={styles.createBogHeader}>Veterinarian Appointment</Text>
            </View>
            
                <View style={{ marginVertical: 20 }}>

                    {/* Name field */}
                    <View>
                        <Text style={styles.titleStyle}>Name</Text>
                        <InputField
                            onChangeText={setFName}
                            value={fname}
                            placeholder="first name"
                            onFocus={() => handleError(null, 'fname')}
                            error={errors.fname}
                        />
                    </View>
                    <View>
                        <InputField
                            onChangeText={setLName}
                            value={lname}
                            placeholder="last name"
                            onFocus={() => handleError(null, 'lname')}
                            error={errors.lname}
                        />
                    </View>

                    {/* Email field */}
                    <View>
                        <Text style={styles.titleStyle}>Email</Text>
                        <InputField
                            onChangeText={setEmail}
                            value={email}
                            placeholder="email"
                            onFocus={() => handleError(null, 'email')}
                            error={errors.email}
                        />
                    </View>

                    {/* Contact number field */}
                    <View>
                        <Text style={styles.titleStyle}>Contact number</Text>
                        <InputField
                            onChangeText={setContact}
                            value={contact}
                            placeholder="contact number"
                            onFocus={() => handleError(null, 'contact')}
                            error={errors.contact}
                        />
                    </View>

                    {/* Select Veterinarian field */}
                    <View>
                        <Text style={styles.titleStyle}>Select Veterinarian</Text>
                        <InputField
                            onChangeText={setVetName}
                            value={vetName}
                            placeholder="dropdown"
                            onFocus={() => handleError(null, 'vetName')}
                            error={errors.vetName}
                        />
                        {/* <DropdownPicker
                            items={vetOptions}
                            setItems={setVetOptions}
                            open={open}
                            value={selectedValue}
                            setOpen={setOpen}
                            defaultValue={selectedValue}
                            placeholder="Select Doctor"
                            containerStyle={{ height: 40 }}
                            style={{ backgroundColor: '#fafafa' }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}

                            // onChangeItem={(item) => {
                               
                            // }}
                        /> */}

                    </View>

                    {/* Reason of Appointment */}
                    <View>
                        <Text style={styles.titleStyle}>Reason of Appointment</Text>
                        <InputField
                            onChangeText={setReason}
                            value={reason}
                            placeholder="reason"
                            onFocus={() => handleError(null, 'reason')}
                            error={errors.reason}
                        />
                    </View>

                    {/* Appointment Date field */}
                    <View>
                        <Text style={styles.titleStyle}>Appointment Date</Text>
                        <InputField
                            value={appntDate}
                            placeholder="Select date"
                            editable={false}
                            onFocus={() => handleError(null, 'appntDate')}
                            error={errors.appntDate}
                        />
                        <View style={{ margin: 20 }}>
                            <Button onPress={() => {
                                setShowAppntDate(true);
                            }} title="Pick date" />
                        </View>
                        {showAppntDate && <MyDatePicker mode={"date"} getDate={getDate} />}
                    </View>

                    {/* Appointment Time field */}
                    <View>
                        <Text style={styles.titleStyle}>Appointment Time</Text>
                        <InputField
                            value={appntTime}
                            placeholder="time"
                            editable={false}
                            onFocus={() => handleError(null, 'appntTime')}
                            error={errors.appntTime}
                        />
                        <View style={{ margin: 20 }}>
                            <Button onPress={() => {
                                setShowAppntTime(true);
                            }} title="Pick Time" />
                        </View>
                        {showAppntTime && <MyTimePicker mode={"time"} getTime={getTime} />}

                    </View>

                    {/* SUBMIT BUTTON */}
                    <View style={styles.createNewBtnMain}>
                        <Button
                            title="Proceed"
                            onPress={FormValidate}
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    dateText: {
        width: "85%",
        height: 25,
        marginLeft: 15,
        fontSize: 18,
      },
});

