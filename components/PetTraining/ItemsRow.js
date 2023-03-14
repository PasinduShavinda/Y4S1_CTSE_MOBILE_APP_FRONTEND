import { View, Text, StyleSheet, TouchableHighlight, ScrollView, Image } from 'react-native'
import React from 'react'
import StarRating from './StartRatingDisplay';
import routes from '../../navigation/PetTraining/routes';
import colors from '../../utils/colors';

export default function ItemsRow({ navigation, listings }) {
  return (
    <ScrollView horizontal={true}>
      <View style={styles.itemRow}>
        {listings.map((item, index) => {
          return (
            <TouchableHighlight
              key={index}
              underlayColor={colors.lightPurple}
              onPress={() => navigation.navigate(routes.ITEMTOPNAV, { item })}
            >
              <View style={{ margin: 10 }}>
                <Image style={styles.item} source={{ uri: item.images[0] }} />
                <StarRating rating={1} />
                <Image
                  style={styles.itemIcon}
                  source={require("../../assets/training.png")}
                />
              </View>
            </TouchableHighlight>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    marginTop: 5,
  },
  item: {
    width: 170,
    height: 170,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    position: "relative",
    zIndex: 1,
  },
  itemIcon: {
    width: 30,
    height: 30,
    borderColor: colors.primary,
    borderWidth: 3,
    borderRadius: 50,
    position: "absolute",
    zIndex: 999,
    alignSelf: "flex-end",
  },
});