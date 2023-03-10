import React from 'react';
import { Text, View, Imag, TouchableOpacity, Image } from 'react-native';

export function Couches(props) {
    const src = props.src;
    const name = props.name;
    return (
        <TouchableOpacity
            // onPress={this.props.onPress}
            style={{
                marginTop: 30,
                backgroundColor: "#FFF",
                height: 250,
                width: 200,
                elevation: 2,
                borderRadius: 10,
                padding: 15,
                marginRight: 30,
                marginLeft: 2,
                marginBottom: 5
            }}
        >
            <Image
                source={props.src}
                style={{
                    width: 170,
                    height: 110,
                    borderRadius: 10
                }}
            />
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10
            }}>
                <Text style={{
                    // fontFamily: "Bold",
                    color: "#4f4a4a",
                    fontSize: 12
                }}>
                    {props.name}
                </Text>
                <View style={{
                    height: 4,
                    width: 4,
                    borderRadius: 4,
                    backgroundColor: "red",
                    marginHorizontal: 4
                }}>

                </View>
                <Text style={{
                    color: "red",
                    fontSize: 9,
                    // fontFamily: "Bold"
                }}>
                    New
                </Text>

            </View>
            <Text style={{
                    // fontFamily: "Bold",
                    color: "#4f4a4a",
                    fontSize: 12
                }}>
                    {props.spec}
                </Text>

            {/* <Text style={{
                fontSize: 9,
                color: "#4f4a4a",
                // fontFamily: "Regular"
            }}>
                Full
            </Text> */}

            <View style={{
                flexDirection: "row",
                marginTop: 5,
                alignItems: "center",
                width: "100%"
            }}>
                <View style={{
                    width: "80%"
                }}>
                    <Text style={{
                        fontSize: 15,
                        // fontFamily: "Bold"
                    }}>contact: {props.contact}</Text>
                </View>
                <View style={{
                    width: "20%"
                }}>
                </View>
            </View>

        </TouchableOpacity>
    );
} 