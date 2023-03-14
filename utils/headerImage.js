import React from "react";

import { View, Image } from "react-native";

const ActionBarImage = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        source={require('../assets/logo.png')}
        style={{
          width: 50,
          height: 50,
          marginRight:10
        }}
      />
    </View>
  );
};

export default ActionBarImage;
