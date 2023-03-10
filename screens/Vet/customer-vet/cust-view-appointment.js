import React, { useState, useEffect } from 'react';
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
    ActivityIndicator,
    ImageBackground
} from 'react-native';
// import Icon from "react-native-vector-icons/FontAwesome";
import { fireDB } from '../../../database/firebaseConfig';
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { Icon } from 'react-native-elements'

export function ViewAppointment({navigation}) {
    const [appnts, setAppnts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadAppnts = async () => {
            try {
                const querySnapshot = await getDocs(collection(fireDB, "appointments"));
                const appntData = [];
                querySnapshot.forEach((doc) => {
                    appntData.push({ id: doc.id, ...doc.data() });
                });
                setAppnts(appntData);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        loadAppnts();
    }, []);

    if (isLoading) {
        return <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" />
        </View>;
    }

    const handleUpdatePress = (item) => {
        // Navigate to the update form screen with the selected user's ID
        navigation.navigate('UpdateAppointment', {
            appntId: item.id,
            fname: item.fname,
            lname: item.lname,
            email: item.email,
            contact: item.contact,
            vetName: item.vetName,
            reason: item.reason,
            appntDate: item.appntDate,
            appntTime: item.appntTime,
        });
    };

    const handleDelete = async (appntId) => {
        const appntRef = doc(fireDB, 'appointments', appntId)
        await deleteDoc(appntRef)
            .then(() => {
                navigation.navigate('ViewAppointment');
            }).catch((error) => {
                alert(error.message)
            })
    };

    const renderAppointmentItem = ({ item }) => (
        <View style={styles.headerContainer}>
            <ImageBackground
                style={styles.headerBackgroundImage}
                blurRadius={10}
                source={{
                    uri: 'https://media.istockphoto.com/id/1191969117/video/abstract-blocks-background.jpg?s=640x640&k=20&c=DG2JuVrgPbqCiToIRIgrXseSwvdCzByBmkf3HhG3rIM=',
                }}
            >
                <View style={styles.headerColumn}>
                    <Text style={styles.userNameText}>First Name : {item.fname}</Text>
                    <Text style={styles.userNameText}>Last Name : {item.lname}</Text>
                    <Text style={styles.userNameText}>Email : {item.email}</Text>
                    <Text style={styles.userNameText}>Contact No : {item.contact}</Text>
                    <Text style={styles.userNameText}>Doctor : {item.vetName}</Text>
                    <Text style={styles.userNameText}>Reason : {item.reason}</Text>
                    <Text style={styles.userNameText}>Appointement Date : {item.appntDate}</Text>
                    <Text style={styles.userNameText}>Appointement Time {item.appntTime}</Text>
                    <View style={styles.userAddressRow}>
                        {/* <View>
                                <Icon
                                    name="place"
                                    underlayColor="transparent"
                                    iconStyle={styles.placeIcon}
                                // onPress={this.onPressPlace}
                                />
                            </View> */}
                        {/* <View style={styles.userCityRow}>
                                <Text style={styles.userCityText}>
                                    {item.loc}
                                </Text>
                            </View> */}
                    </View>
                </View>
                <View style={styles.editdelete}>
                    <View style={styles.editbtn}>
                        <Icon
                            name='edit'
                            color="#e6b800"
                            onPress={() => handleUpdatePress(item)}
                        />

                        <View style={styles.deletebtn}>
                            <Icon
                                name='delete'
                                color="#ff3300"
                                onPress={() => showConfirmDialog(item)}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );


    const showConfirmDialog = (appnt) => {
        Alert.alert(
            "Are you sure?",
            "Are you sure you want to Cancel this appointement? This action cannot be undone!",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        handleDelete(appnt.id)
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    };

    return (
        <View style={styles.mainSheet}>
            <View>
                <Text> Appointement Details</Text>
            </View>
            <FlatList
                data={appnts}
                renderItem={renderAppointmentItem}
                keyExtractor={(item) => item.id}
            />
        </View>
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
        marginBottom: 20,
        paddingBottom: 20,
        marginHorizontal: 90
    },
    datas: {
        marginTop: 10
    },
    userNameText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 8,
        textAlign: 'justify'
    },
    headerBackgroundImage: {
        paddingBottom: 20,
        paddingTop: 45,

    },
    headerContainer: {},
    headerColumn: {
        backgroundColor: 'transparent',
        ...Platform.select({
            ios: {
                alignItems: 'center',
                elevation: 1,
                marginTop: -1,

            },
            android: {
                // alignItems: 'left',
                paddingLeft: 20,
            },
        }),
    },
    editbtn: {
        paddingLeft: 160,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    deletebtn: {
        paddingLeft: 8,
        width: 100,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
});

