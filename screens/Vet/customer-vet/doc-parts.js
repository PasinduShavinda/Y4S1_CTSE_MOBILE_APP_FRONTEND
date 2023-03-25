import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements'

export function DocParts(props) {
    return (
        <TouchableOpacity
            style={{
                marginTop: 30,
                backgroundColor: "#dfddea",
                height: 580,
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
                    borderRadius: 50,
                }}
            />
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10
            }}>
                <Text style={{
                    color: "#4f4a4a",
                    fontSize: 17,
                    marginTop: 5,
                    fontWeight: 'bold'
                }}>
                    {props.name}
                </Text>
            </View>
            <Text style={{
                color: "red",
                fontSize: 18,
                marginTop: 5,
            }}>
                {props.spec}
            </Text>

            <View style={{
                flexDirection: "row",
                marginTop: 7,
                alignItems: "center",
                width: "100%"
            }}>
                <Icon
                    name="phone"
                    underlayColor="transparent"
                />
                <View>
                    <Text style={{
                        fontSize: 15,
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
                />
                <View>
                    <Text style={{
                        fontSize: 15,
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
                />
                <View>
                    <Text style={{
                        fontSize: 15,
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
                />
                <View>
                    <Text style={{
                        fontSize: 15,
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
                />
                <View>
                    <Text style={{
                        fontSize: 15,
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
                />
                <View>
                    <Text style={{
                        fontSize: 15,
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