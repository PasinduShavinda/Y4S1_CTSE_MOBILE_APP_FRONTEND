import { View, Text, Button } from "react-native";

export default function Tempo_file({ navigation }) {
  return (
    <View>
      <View>
        <Text>Fill Dog Informationsss</Text>
      </View>
      <View>
        <Button title="home" onPress={() => navigation.navigate("homes")} />
      </View>
      <View>
        <Button
          title="add pets"
          onPress={() => navigation.navigate("new-pets")}
        />
      </View>
      <View>
        <Button
          title="buy pets"
          onPress={() => navigation.navigate("buy-pets")}
        />
      </View>
      <View>
        <Button
          title="owner items"
          onPress={() => navigation.navigate("owner-items")}
        />
      </View>
    </View>
  );
}
