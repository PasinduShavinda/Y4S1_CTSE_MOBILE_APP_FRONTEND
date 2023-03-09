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
    Keyboard
} from 'react-native';
import { fireDB, fireStorage } from '../../../database/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import InputField from '../../../components/Vet/InputField';
import COLORS from '../../../utils/Vet/colors';


export function AdminAddDoctor() {

    const [name, setName] = useState('');
    const [spec, setSpec] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [charge, setCharge] = useState('');
    const [exp, setExp] = useState('');
    const [loc, setLoc] = useState('');
    const [about, setAbout] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSelectProfilePicture = async () => {
        try {
            const { assets } = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            });
            if (assets.length > 0) {
                setProfilePicture(assets[0]);
            }
        } catch (error) {
            console.error(error);
        }
    }


    const handleSave = async () => {
        try {
            setLoading(true);
            const vetRef = await addDoc(collection(fireDB, "vets"), {
                name,
                spec,
                contact,
                email,
                charge,
                exp,
                loc,
                about,
            });
            if (profilePicture) {
                const response = await fetch(profilePicture.uri);
                const blob = await response.blob();
                const fileName = `${vetRef.id}-${Date.now()}`;
                const storageRef = ref(fireStorage, `profilePictures/${fileName}`);
                await uploadBytes(storageRef, blob);
                const downloadURL = await getDownloadURL(storageRef);
                await updateDoc(doc(fireDB, "vets", vetRef.id), { profilePicture: downloadURL });
            }
            setName('');
            setSpec('');
            setContact('');
            setEmail('');
            setCharge('');
            setExp('');
            setLoc('');
            setAbout('');
            setProfilePicture(null);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const FormValidate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!name) {
            handleError('Please input name', 'name');
            isValid = false;
        }

        if (!spec) {
            handleError('Please input specialization', 'spec');
            isValid = false;
        }

        if (!contact) {
            handleError('Please input phone number', 'contact');
            isValid = false;
        }

        if (!email) {
            handleError('Please input email', 'email');
            isValid = false;
        } else if (!email.match(/\S+@\S+\.\S+/)) {
            handleError('Please input a valid email', 'email');
            isValid = false;
        }

        if (!charge) {
            handleError('Please input charge', 'charge');
            isValid = false;
        }
        //   else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
        //     handleError('Please input a valid email', 'email');
        //     isValid = false;
        //   }

        if (!exp) {
            handleError('Please input experience', 'exp');
            isValid = false;
        }

        if (!loc) {
            handleError('Please input location', 'loc');
            isValid = false;
        }

        if (!about) {
            handleError('Please input about', 'about');
            isValid = false;
        }

        if (!profilePicture) {
            handleError('Please input profilePicture', 'profilePicture');
            isValid = false;
        }

        if (isValid) {
            handleSave();
        }
    };

    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <View>
                <Text style={styles.createBogHeader}>Admin Add Doctor</Text>
            </View>
            <ScrollView
                contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
                <View style={{ marginVertical: 20 }}>

                    {/* Name field */}
                    <View>
                        <Text style={styles.titleStyle}>Name</Text>
                        <InputField
                            onChangeText={setName}
                            value={name}
                            placeholder="name"
                            onFocus={() => handleError(null, 'name')}
                            error={errors.name}
                        />
                    </View>

                    {/* Profile picture field */}
                    <View style={styles.profilePictureContainer}>
                        {profilePicture ? (
                            <Image source={{ uri: profilePicture.uri }} style={styles.profilePicture} />
                        ) : (
                            <Text>No profile picture selected</Text>
                        )}

                    </View>
                    <View>
                        <Button title="choose" onPress={handleSelectProfilePicture} />
                    </View>
                    {/* Specialization field */}
                    <View>
                        <Text style={styles.titleStyle}>Specialization</Text>
                        <InputField
                            onChangeText={setSpec}
                            value={spec}
                            placeholder="specialization"
                            onFocus={() => handleError(null, 'spec')}
                            error={errors.spec}
                        />
                    </View>

                    {/* Mobile Number field */}
                    <View>
                        <Text style={styles.titleStyle}>Contact Number</Text>
                        <InputField
                            onChangeText={setContact}
                            value={contact}
                            placeholder="mobile"
                            onFocus={() => handleError(null, 'contact')}
                            error={errors.contact}
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


                    {/* Charges field */}
                    <View>
                        <Text style={styles.titleStyle}>Charges</Text>
                        <InputField
                            onChangeText={setCharge}
                            value={charge}
                            placeholder="Charges"
                            onFocus={() => handleError(null, 'charge')}
                            error={errors.charge}
                        />
                    </View>

                    {/* Experience field */}
                    <View>
                        <Text style={styles.titleStyle}>Experience</Text>
                        <InputField
                            onChangeText={setExp}
                            value={exp}
                            placeholder="Experience"
                            onFocus={() => handleError(null, 'exp')}
                            error={errors.exp}
                        />
                    </View>

                    {/* Location field */}
                    <View>
                        <Text style={styles.titleStyle}>Location</Text>
                        <InputField
                            onChangeText={setLoc}
                            value={loc}
                            placeholder="location"
                            onFocus={() => handleError(null, 'loc')}
                            error={errors.loc}
                        />
                    </View>

                    {/* About Field */}
                    <View>
                        <Text style={styles.titleStyle}>About</Text>
                        <InputField
                            placeholder="about"
                            // editable
                            // multiline
                            // numberOfLines={7}
                            // maxLength={100}
                            onChangeText={setAbout}
                            value={about}
                            onFocus={() => handleError(null, 'about')}
                            error={errors.about}

                        />
                    </View>

                    {/* SUBMIT BUTTON */}
                    <View style={styles.createNewBtnMain}>
                        <Button
                            title="Submit"
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
        marginBottom: 1,
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
    map: {
        flex: 1,
        width: '100%',
        height: 400,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        marginVertical: 10,
    },
    inputContainer: {
        height: 95,
        backgroundColor: COLORS.light,
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginTop: 20
        
      },
});

