import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    ImageBackground,
    ActivityIndicator,
    TextInput
} from 'react-native';
import { fireDB } from '../../../database/firebaseConfig';
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { Icon } from 'react-native-elements'
import { ScrollView } from 'react-native';

export function AdminViewVets({ navigation }) {
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

    const handleDelete = async (vetId) => {
        const vetRef = doc(fireDB, 'vets', vetId)
        await deleteDoc(vetRef)
            .then(() => {
                navigation.navigate('AdminDash');
            }).catch((error) => {
                alert(error.message)
            })
    };

    const showConfirmDialog = (vet) => {
        Alert.alert(
            "Alert !!",
            "Are you sure you want to delete ?",
            [
                {
                    text: "No",
                },
                {
                    text: "Yes",
                    onPress: () => {
                        handleDelete(vet.id)
                    },
                },
            ]
        );
    };

    const handleUpdatePress = (item) => {
        // Navigate to the update form screen with the selected user's ID
        navigation.navigate('AdminUpdateDoc', {
            vetId: item.id,
            name: item.name,
            spec: item.spec,
            charge: item.charge,
            contact: item.contact,
            email: item.email,
            exp: item.exp,
            loc: item.loc,
            about: item.about,
            profilePicture: item.profilePicture,
        });
    };

    return (
        <View style={styles.mainSheet}>
            <View>
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
                        width: 378,
                        backgroundColor: "#FFF",
                        paddingHorizontal: 20,
                        height: 45,
                        borderRadius: 16,
                        marginLeft: 1
                    }}>
                        <Icon name="search"
                            size={35}
                            color="#4f4a4a"
                        />
                        <View style={{
                                
                            }}>
                        <TextInput
                            placeholder="Search Vetrinaries"
                            onChangeText={(text) => setSearch(text)}
                            style={{
                                paddingHorizontal: 60,
                                fontSize: 16,
                                marginRight: 29
                            }}
                        />
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView>
                {filteredVets.map((v) => [
                    <View style = {{
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 100               
                    }}>
                        <View>
                            <ImageBackground
                                style={styles.headerBackgroundImage}
                                blurRadius={10}
                                source={{
                                    uri: 'https://img.freepik.com/premium-photo/purple-velvet-fabric-texture-used-as-background-empty-purple-fabric-background_661047-766.jpg',
                                }}
                            >
                                <View style={styles.editdelete}>
                                    <View style={styles.editbtn}>
                                        <Icon
                                            name='edit'
                                            color="#e6b800"
                                            onPress={() => handleUpdatePress(v)}
                                        />

                                        <View style={styles.deletebtn}>
                                            <Icon
                                                name='delete'
                                                color="#ff3300"
                                                onPress={() => showConfirmDialog(v)}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View style = {{marginLeft: 12}}>
                                    <Image
                                        style={styles.userImage}
                                        source={{
                                            uri: v.profilePicture,
                                        }}
                                    />
                                    <Text style={styles.userNameText}>Name : {v.name}</Text>
                                    <Text style={styles.userNameText}>Specialization : {v.spec}</Text>
                                    <Text style={styles.userNameText}>Contact No : {v.contact}</Text>
                                    <Text style={styles.userNameText}>Email : {v.email}</Text>
                                    <Text style={styles.userNameText}>Experience : {v.exp}</Text>
                                    <Text style={styles.userNameText}>About : {v.about}</Text>
                                    <Text style={styles.userNameText}>LKR {v.charge}</Text>
                                    <View style={styles.userAddressRow}>
                                        <View>
                                            <Icon
                                                name="place"
                                                underlayColor="transparent"
                                                iconStyle={styles.placeIcon}
                                            // onPress={this.onPressPlace}
                                            />
                                        </View>
                                        <View style={styles.userCityRow}>
                                            <Text style={styles.userCityText}>
                                                {v.loc}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    </View>
                ])}
            </ScrollView>
        </View>
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
        borderRadius: 6,
        overflow: 'hidden'
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
        marginLeft: 94,
        height:30
    }
})