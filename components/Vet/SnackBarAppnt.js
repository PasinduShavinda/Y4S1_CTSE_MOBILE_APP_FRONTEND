import React, { useEffect, useState } from 'react';
import { Text, View, Button, Image } from 'react-native';
import { FancyAlert } from 'react-native-expo-fancy-alerts';

const SnackBarAppnt = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <View>
            <FancyAlert
                visible={visible}
                icon={
                <View style={{
                    // flex: 1,
                    // display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    // backgroundColor: 'white',
                    // borderRadius: 50,
                    // width: '100%',
                }}>
                    <Text></Text>
                </View>}
                style={{ backgroundColor: 'white' }}
            >
                <View>
                <Image style={{
                    width: 160,
                    height: 160,
                    borderRadius: 10,
                    marginTop: 20
                }}
                    source={{
                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaGgkB-fvbhDe-jPliUW6x9FC2ZgPYmoUE6g&usqp=CAU',
                    }}
                />
                </View>
                <Text style={{ marginTop: 36, marginBottom: 42, fontSize:20 }}>Your Appointment Successfully Reserved!</Text>
                <View style = {{marginBottom: 20,borderRadius: 20, width: 80, fontSize: 30}}>
                    <Button
                        title="OK"
                        onPress={() => navigation.navigate('ViewAppointment')}
                        color="purple"
                        
                    />
                </View>
            </FancyAlert>
        </View>
    )
}
export default SnackBarAppnt;