import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity, ScrollView } from "react-native";

export function CustHome({navigation}){
  
      return (
        <ScrollView>
        <View style={styles.container}>
          <Image source={{uri :'https://st.depositphotos.com/1905901/1880/i/450/depositphotos_18802201-stock-photo-young-female-veterinarian.jpg'}}  style={styles.img} />
          
          <Text style={styles.detail}>
           Where pets are treated like family
           Referral Surgery, Advanced Denisty, Urgent Care, General and Preventative Medicine
          </Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("SplashCustHome")}
          >
            <Text style={styles.text}>Next</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      },
      img: {
        height: 450,
        width: "100%",
        // resizeMode: "contain",
      },
      title: {
        color: "black",
        fontSize: 30,
        marginTop: 10,
        fontWeight: 'bold'
      },
      detail: {
        color: "blue",
        // fontFamily: "Montserrat_400Regular",
        fontSize: 18,
        textAlign: "center",
        paddingHorizontal: 20,
        lineHeight: 30,
        marginTop: 30,
      },
      btn: {
        marginTop: 20,
        backgroundColor: "purple",
        paddingHorizontal: 140,
        paddingVertical: 10,
        borderRadius: 30,
      },
      text: {
        // fontFamily: "Montserrat_600SemiBold",
        fontSize: 30,
        color: "white",
      },
    });