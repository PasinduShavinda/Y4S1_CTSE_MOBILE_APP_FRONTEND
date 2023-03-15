import React, { useState } from "react";
import { View } from "react-native";
import DatePicker from "@react-native-community/datetimepicker";

export default function MyTimePicker({ mode, getTime }) {
    const [time, setTime] = useState(new Date());

    const handleTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setTime(currentTime);

        let temTime = new Date(currentTime);
        let fTime = temTime.getHours() + ":" + temTime.getMinutes().toLocaleString()
        if (mode === "time") {
            getTime(fTime);
        }
    };

    return (
        <View style={{ margin: 50 }}>
            <DatePicker
                testID="dateTimePicker"
                value={time}
                mode={mode}
                is24hour={false}
                display={"default"}
                onChange={handleTime}
            />
        </View>
    );
}
