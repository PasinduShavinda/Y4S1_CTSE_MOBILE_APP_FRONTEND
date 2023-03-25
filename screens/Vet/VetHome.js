import React from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Button,
} from 'react-native';

export function VetHome({ navigation }) {
    return (
        <SafeAreaView>
            <View>
                <Text style={styles.createBogHeader}>Vet Home Page</Text>
            </View>
            <ScrollView>
                <View style={styles.bodySheet}>
                    <View style={styles.createNewBtnMain}>
                        <Button
                            title="Customer Home Page"
                            onPress={() => navigation.navigate('CustHome')}
                            style={styles.createNewBtn}
                            color="blue"
                        />
                    </View>

                    <View style={styles.createNewBtnMain}>
                        <Button
                            title="Admin Dashboard"
                            onPress={() => navigation.navigate('AdminDash')}
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
        fontSize: 16,
        marginBottom: 15,
        marginTop: 32,
    },
    input: {
        height: 40,
        padding: 10,
        outline: 1,
        borderBottomWidth: 2,
    },
    multiText: {
        paddingLeft: 10,
        outline: 1,
        borderWidth: 2,
    },
    dateInput: {
        height: 40,
        padding: 10,
        outline: 1,
        borderWidth: 2,
    },
    createNewBtn: {
        marginTop: 50,
        padding: 15,
        borderRadius: 10,
        marginLeft: 30,
    },
    createNewBtnMain: {
        marginTop: 5,
        marginBottom: 20,
        paddingBottom: 20,
    },
});