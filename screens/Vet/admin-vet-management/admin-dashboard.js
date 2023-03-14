import React from "react";
import { ScrollView } from "react-native";
import { Text, View, Image, TouchableHighlight, StyleSheet } from "react-native";


export function AdminDash({navigation}) {

  return (
    <ScrollView>
    <View>
     <TouchableHighlight underlayColor="rgba(73,182,77,0.9)"   onPress={() => navigation.navigate('AdminAddDoc')}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri:'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/users3_add.png'}} />
        <Text style={styles.categoriesName}>ADD VETS</Text>
        <Text style={styles.categoriesInfo}>Click here to add vets to the system</Text>
      </View>
    </TouchableHighlight>
    </View>
    <View style ={{marginTop:10}}>
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => navigation.navigate('AdminViewDoc')}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri:'https://cdn.create.vista.com/api/media/small/218007348/stock-photo-happy-male-doctor-stethoscope-neck'}} />
        <Text style={styles.categoriesName}>VIEW VETS</Text>
        <Text style={styles.categoriesInfo}>Click here to view vets</Text>
      </View>
    </TouchableHighlight>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    categoriesItemContainer: {
      flex: 2,
      margin: 30,
      justifyContent: 'center',
      alignItems: 'center',
      height: 215,
      borderColor: '#cccccc',
      borderWidth: 0.5,
      borderRadius: 20,
    },
    categoriesPhoto: {
      width: 130,
      height: 120,
      borderRadius: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      shadowColor: 'blue',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 1.0,
      elevation: 1
    },
    categoriesName: {
      flex: 1,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333333',
      marginTop: 20
    },
    categoriesInfo: {
      marginTop: 1,
      marginBottom: 5
    }
  });
  