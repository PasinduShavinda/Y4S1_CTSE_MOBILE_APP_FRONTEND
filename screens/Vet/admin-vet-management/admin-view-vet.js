import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';
import { fireDB } from '../../../database/firebaseConfig';
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";

export function AdminViewVets({ navigation }) {
    const [vets, setVets] = useState([]);

    useEffect(() => {
        const loadVets = async () => {
            try {
                const querySnapshot = await getDocs(collection(fireDB, "vets"));
                const vetData = [];
                querySnapshot.forEach((doc) => {
                    vetData.push({ id: doc.id, ...doc.data() });
                });
                setVets(vetData);
            } catch (error) {
                console.error(error);
            }
        };
        loadVets();
    }, []);

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


    // const handleUserPress = async (user) => {
    //     try {

    //         Alert.alert(
    //             user.name,
    //             '',

    //             [
    //                 {
    //                     text: 'Close',
    //                     onPress: () => { }
    //                 }
    //             ],
    //             {
    //                 cancelable: true,
    //                 onDismiss: () => { },
    //                 message: (
    //                     <Image
    //                         style={styles.userImage}
    //                         source={{ uri: 'https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg' }}

    //                     />
    //                 )
    //             }
    //         );
    //     } catch (error) {
    //         console.error(error);
    //         Alert.alert('Failed to retrieve profile picture');
    //     }
    // };


    const renderVetItem = ({ item }) => (
        <TouchableOpacity>
            <View style={styles.userItem}>
            <View>
                <Image
                    style={styles.userImage}
                    source={{
                        uri: item.profilePicture,
                    }}
                />
            </View>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userName}>{item.spec}</Text>
                <Text style={styles.userName}>{item.charge}</Text>
                <Text style={styles.userName}>{item.contact}</Text>
                <Text style={styles.userName}>{item.email}</Text>
                <Text style={styles.userName}>{item.exp}</Text>
                <Text style={styles.userName}>{item.loc}</Text>
                <Text style={styles.userName}>{item.about}</Text>
            </View>
            <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.updateButton}
                        onPress={() => handleUpdatePress(item)}
                    >
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => showConfirmDialog(item)}
                    >
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
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

    // const handleDelete = () => {
    //     fireDB.collection('users').doc(route.params.id).delete();
    //     navigation.goBack();
    //   };

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
    mainSheet: {
        flex: 1,
    },
    userItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userImage: {
        borderColor: '#FFF',
        borderRadius: 85,
        borderWidth: 3,
        height: 170,
        marginBottom: 15,
        width: 170,
    },
});