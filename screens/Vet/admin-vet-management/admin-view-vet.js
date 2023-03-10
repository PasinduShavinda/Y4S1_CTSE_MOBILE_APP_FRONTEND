import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Alert,
    Image,
    ImageBackground,
    Button,
    ActivityIndicator
} from 'react-native';
import { fireDB } from '../../../database/firebaseConfig';
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { Icon } from 'react-native-elements'

export function AdminViewVets({ navigation }) {
    const [vets, setVets] = useState([]);
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

    if (isLoading) {
        return <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" />
        </View>;
    }

    const handleDelete = async (vetId) => {
        const vetRef = doc(fireDB, 'vets', vetId)
        await deleteDoc(vetRef)
            .then(() => {
                navigation.navigate('VetHome');
            }).catch((error) => {
                alert(error.message)
            })
    };

    const showConfirmDialog = (vet) => {
        Alert.alert(
            "Are you sure?",
            "Are you sure you want to delete this user? This action cannot be undone!",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        handleDelete(vet.id)
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    };

    const renderVetItem = ({ item }) => (
        <TouchableOpacity>
            <View style={styles.headerContainer}>
                <ImageBackground
                    style={styles.headerBackgroundImage}
                    blurRadius={10}
                    source={{
                        uri: 'https://png.pngtree.com/thumb_back/fh260/background/20190828/pngtree-high-tech-molecular-structure-hexagonal-link-medical-image_309769.jpg',
                    }}
                >
                    <View style={styles.headerColumn}>
                        <Image
                            style={styles.userImage}
                            source={{
                                uri: item.profilePicture,
                            }}
                        />
                        <Text style={styles.userNameText}>Name : {item.name}</Text>
                        <Text style={styles.userNameText}>Specialization : {item.spec}</Text>
                        <Text style={styles.userNameText}>Contact No : {item.contact}</Text>
                        <Text style={styles.userNameText}>Email : {item.email}</Text>
                        <Text style={styles.userNameText}>Experience : {item.exp}</Text>
                        <Text style={styles.userNameText}>About : {item.about}</Text>
                        <Text style={styles.userNameText}>LKR {item.charge}</Text>
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
                                    {item.loc}
                                </Text>
                            </View>
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
        </TouchableOpacity>
    );

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
            <FlatList
                data={vets}
                renderItem={renderVetItem}
                keyExtractor={(item) => item.id}
            />
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
    editdelete:{
        alignItems:'center'
    }
})