import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements'

export function DocParts(props) {
    return (
        <TouchableOpacity
            style={{
                marginTop: 30,
                backgroundColor: "#FFF",
                height: 550,
                width: 260,
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
                    width: 230,
                    height: 250,
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
                    fontSize: 17
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
                {/* <Text style={{
                    color: "red",
                    fontSize: 9,
                    // fontFamily: "Bold"
                }}>
                    New
                </Text> */}

            </View>
            <Text style={{
                color: "red",
                fontSize: 18,
                // fontFamily: "Bold"
            }}>
                {props.spec}
            </Text>

            <View style={{
                flexDirection: "row",
                marginTop: 5,
                alignItems: "center",
                width: "100%"
            }}>
                <Icon
                    name="phone"
                    underlayColor="transparent"
                // onPress={this.onPressPlace}
                />
                <View>
                    <Text style={{
                        fontSize: 15,
                        // fontFamily: "Bold"
                    }}>{props.contact}</Text>
                </View>
                <View style={{
                    width: "20%"
                }}>
                </View>
            </View>


            <View style={{
                flexDirection: "row",
                marginTop: 5,
                alignItems: "center",
                width: "100%"
            }}>
                <Icon
                    name="email"
                    underlayColor="transparent"
                // onPress={this.onPressPlace}
                />
                <View>
                    <Text style={{
                        fontSize: 15,
                        // fontFamily: "Bold"
                    }}>{props.email}</Text>
                </View>
                <View style={{
                    width: "20%"
                }}>
                </View>
            </View>

            <View style={{
                flexDirection: "row",
                marginTop: 5,
                alignItems: "center",
                width: "100%"
            }}>
                <Icon
                    name="place"
                    underlayColor="transparent"
                // onPress={this.onPressPlace}
                />
                <View>
                    <Text style={{
                        fontSize: 15,
                        // fontFamily: "Bold"
                    }}>{props.loc}</Text>
                </View>
                <View style={{
                    width: "20%"
                }}>
                </View>
            </View>

            <View style={{
                flexDirection: "row",
                marginTop: 5,
                alignItems: "center",
                width: "100%"
            }}>
                <Icon
                    name=""
                    underlayColor="transparent"
                // onPress={this.onPressPlace}
                />
                <View>
                    <Text style={{
                        fontSize: 15,
                        // fontFamily: "Bold"
                    }}>Charges : LKR {props.charge}</Text>
                </View>
                <View style={{
                    width: "20%"
                }}>
                </View>
            </View>
            
            <View style={{
                flexDirection: "row",
                marginTop: 5,
                alignItems: "center",
                width: "100%"
            }}>
                <Icon
                    name=""
                    underlayColor="transparent"
                // onPress={this.onPressPlace}
                />
                <View>
                    <Text style={{
                        fontSize: 15,
                        // fontFamily: "Bold"
                    }}>Experience : {props.exp}</Text>
                </View>
                <View style={{
                    width: "20%"
                }}>
                </View>
            </View>

            <View style={{
                flexDirection: "row",
                marginTop: 5,
                alignItems: "center",
                width: "100%"
            }}>
                <Icon
                    name=""
                    underlayColor="transparent"
                // onPress={this.onPressPlace}
                />
                <View>
                    <Text style={{
                        fontSize: 15,
                        // fontFamily: "Bold"
                    }}>About : {props.about}</Text>
                </View>
                <View style={{
                    width: "20%"
                }}>
                </View>
            </View>

        </TouchableOpacity>
    );
} 