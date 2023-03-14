import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";

export function CustHome({navigation}){
  
      return (
        <View style={styles.container}>
            <Text style={styles.title}>Vetrinary</Text>
          <Image source={{uri :'https://st.depositphotos.com/1905901/1880/i/450/depositphotos_18802201-stock-photo-young-female-veterinarian.jpg'}}  style={styles.img} />
          
          <Text style={styles.detail}>
           Where pets are treated like family
           Referral Surgery, Advanced Denisty, Urgent Care, General and Preventative Medicine
          </Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("CustViewDoc")}
          >
            <Text style={styles.text}>Next</Text>
          </TouchableOpacity>
        </View>
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
        height: "50%",
        width: "100%",
        marginTop: 20
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
        marginTop: 40,
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