import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    ActivityIndicator,
    Button
} from 'react-native';
import { Icon } from 'react-native-elements'
import { DocParts } from './doc-parts';
import { fireDB } from '../../../database/firebaseConfig';
import { getDocs, collection } from "firebase/firestore";

export function CustViewDoc({ navigation }) {

    const [vets, setVets] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredVets, setFilteredVets] = useState([]);
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const loadVets = async () => {
            try {
                const querySnapshot = await getDocs(collection(fireDB, "vets"));
                const vetData = [];
                querySnapshot.forEach((doc) => {
                    vetData.push({ id: doc.id, ...doc.data() });
                });
                setVets(vetData);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        loadVets();
    }, []);

    // Search
    useEffect(() => {
        setFilteredVets(
            vets.filter(
                (vet) =>
                    vet.name.toLowerCase().includes(search.toLowerCase()) ||
                    vet.spec.toLowerCase().includes(search.toLowerCase()) ||
                    vet.contact.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, vets]);


    if (isLoading) {
        return <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" />
        </View>;
    }

    return (
        <ScrollView
            style={{
                backgroundColor: "#fff",
                paddingHorizontal: 20
            }}
        >
            <View style={{
                flexDirection: "row",
                width: "100%",
                marginTop: 40,
                alignItems: "center"
            }}>
                <View>
                    <Text style={{
                        fontSize: 22,
                        textAlign: "center",
                    }}>Vetrinaries
                    </Text>
                </View>
            </View>

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                marginVertical: 30
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    elevation: 1,
                    width: 340,
                    backgroundColor: "#FFF",
                    paddingHorizontal: 20,
                    height: 45,
                    borderRadius: 16,
                    marginLeft: 1
                }}>
                    <Icon name="search"
                        size={22}
                        color="#4f4a4a"
                    />
                    <TextInput
                        placeholder="Search Vetrinaries"
                        onChangeText={(text) => setSearch(text)}
                        style={{
                            paddingHorizontal: 20,
                            fontSize: 12
                        }}
                    />
                </View>
            </View>
            <View style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center"
            }}>
                <Text style={{
                    fontSize: 18,
                    color: "#4f4a4a"
                }}>
                    Available Vetrinaries
                </Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {filteredVets.map((v) => [
                    <View>
                        <DocParts
                            src={{ uri: v.profilePicture }}
                            name={v.name}
                            spec={v.spec}
                            contact={v.contact}
                            email={v.email}
                            charge={v.charge}
                            exp={v.exp}
                            about={v.about}
                            loc = {v.loc}
                            onPress={() => this.props.navigation.navigate('')}
                        />
                    </View>
                ])}
            </ScrollView>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('GetAppointment')}
                >
                <Image style={{
                    width: 330,
                    height: 230,
                    borderRadius: 10,
                    marginTop: 90
                }}
                    source={{
                        uri: 'https://qph.cf2.quoracdn.net/main-qimg-b5069e7ffb6e3e7c4ad4de617936e9f1-pjlq',
                    }}
                />
                </TouchableOpacity>
            </ScrollView>
{/*             
            <View style={styles.createNewBtnMain}>
                    <Button
                        title="Customer View Appointment"
                        onPress={() => navigation.navigate('ViewAppointment')}
                        style={styles.createNewBtn}
                        color="blue"
                    />
                </View> */}

                <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ViewAppointment')}
                >
                <Image style={{
                    width: 320,
                    height: 260,
                    borderRadius: 10,
                    marginTop: 50,
                    marginBottom:30,
                    marginLeft:11
                }}
                    source={{
                        uri: 'https://img.freepik.com/premium-vector/doctor-appointment-vector-icon-style-is-bicolor-flat-symbol-soft-blue-colors-rounded-angles_100456-10438.jpg?w=2000',
                    }}
                />
                </TouchableOpacity>
            </ScrollView>            

            {/* <Text style={{
                marginTop: 20,
                color: "#4f4a4a",
                fontSize: 18,
                //fontFamily:"calibri"
            }}>
                Best Sellers
            </Text> */}


            {/* <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal>
                
                    <Best/>
                    <Best/>
                    <Best/>
            </ScrollView> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    HeaderTopic: {
        //   color: "blue",
        backgroundColor: '#FFF',
        textAlign: "center",
        fontSize: 22,
        marginTop: 10,
        fontWeight: "bold",
    },
    cardContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0,
    },
    container: {
        flex: 1,
    },
    emailContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
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
    placeIcon: {
        color: 'white',
        fontSize: 26,
    },
    scroll: {
        backgroundColor: '#FFF',
    },
    telContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
    },
    userAddressRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    userCityRow: {
        backgroundColor: 'transparent',
    },
    userCityText: {
        color: '#A5A5A5',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
    userImage: {
        borderColor: '#FFF',
        borderRadius: 85,
        borderWidth: 3,
        height: 170,
        marginBottom: 15,
        width: 170,
    },
    userNameText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 8,
        textAlign: 'justify'
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
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
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    editdelete: {
        alignItems: 'center'
    }
})