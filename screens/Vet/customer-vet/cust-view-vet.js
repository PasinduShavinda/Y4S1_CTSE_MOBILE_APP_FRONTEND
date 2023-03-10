import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput,
    SafeAreaView,
    ScrollView,
    FlatList,
    Button,
    Alert,
    Sepe,
    ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements'
import { Couches } from './Couches';
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
    // const renderVetItem = ({ item }) => (
    //     <View>
    //         <Couches
    //             src={{ uri: item.profilePicture }}
    //             name={item.name}
    //             spec={item.spec}
    //             contact={item.contact}
    //             onPress={() => this.props.navigation.navigate('')}
    //         />
    //     </View>
    // );

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
                    elevation: 2,
                    width: "85%",
                    backgroundColor: "#FFF",
                    paddingHorizontal: 20,
                    height: 35,
                    borderRadius: 10,
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
                        <Couches
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
                {/* <FlatList
                    data={vets}
                    renderItem={renderVetItem}
                    keyExtractor={(item) => item.id}
                ></FlatList> */}
            </ScrollView>


            <View style={{
                marginTop: 50,
                marginBottom: 50,
                paddingBottom: 20,
            }}>
                <Button
                    title="GET APPOINTEMENT"
                    style={{
                        marginTop: 50,
                        marginBottom: 50,
                        paddingBottom: 20,
                    }}
                    color="blue"
                    onPress={() => navigation.navigate('GetAppointment')}
                />
            </View>



            {/* <View style={{
                flexDirection: "row",
                marginTop: 30,
                marginBottom: 10,
                alignItems: "center"
            }}>
                <Text style={{
                    //fontFamily:"Open Sans",
                    color: "#4f4a4a",
                    fontSize: 20
                }}>
                    New Arrivals
                </Text>
                <View style={{
                    height: 5,
                    width: 5,
                    borderRadius: 5,
                    backgroundColor: "#4f4a4a",
                    marginHorizontal: 4
                }}>
                </View>
                <Text style={{
                    //fontFamily:"calibri",
                    fontSize: 10,
                    color: "#4f4a4a"
                }}>
                    Good Quality items
                </Text>
            </View> */}

            {/* <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >

                <Image style={{
                    width: 170,
                    height: 110,
                    borderRadius: 10
                }}
                    source={{
                        uri: 'https://www.w3schools.com/howto/img_avatar2.png',
                    }}
                />

                <Image style={{
                    width: 170,
                    height: 110,
                    borderRadius: 10
                }}
                    source={{
                        uri: 'https://www.w3schools.com/howto/img_avatar2.png',
                    }}
                />

                <Image style={{
                    width: 170,
                    height: 110,
                    borderRadius: 10
                }}
                    source={{
                        uri: 'https://www.w3schools.com/howto/img_avatar2.png',
                    }}
                />

            </ScrollView> */}

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