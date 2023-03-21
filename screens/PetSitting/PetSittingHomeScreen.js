import {View,Text,SafeAreaView,Image,TouchableOpacity,} from "react-native";
  import React, { useLayoutEffect } from "react";
  import * as Animatable from "react-native-animatable";
  import { useNavigation } from "@react-navigation/native";
  import { Hero2Image } from "./../../assets/PetSitting";
  import { TailwindProvider } from "tailwindcss-react-native";


const PetSittingHomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);
  
    return (
      <SafeAreaView className="bg-white flex-1 relative">
        {/* First Section */}
  
        <View className="flex-row px-6 mt-2 items-center space-x-2">
          <View className="w-20 h-16 bg-black rounded-full items-center justify-center">
            <Text className="text-[#9787b5] text-3xl font-semibold">Find</Text>
          </View>
  
          <Text className="text-[#2A2B4B] text-3xl font-semibold">Pet Sitters</Text>
        </View>
  
        {/* Second Section */}
        <View className="px-6 mt-2 space-y-1">
          <Text className="text-[#3C6072] text-[30px] ">Let your dog stay with us</Text>
          <Text className="text-[#9787b5] text-[36px] font-bold">
          while you're away
          </Text>
  
        </View>
  
        {/* Circle Section */}
        <View className="w-[390px] h-[390px] bg-[#614e8c] rounded-full absolute bottom-20 -right-36"></View>
        <View className="w-[450px] h-[450px] bg-[#9787b5] rounded-full absolute -bottom-32 -left-36"></View>
  
        {/* Image container */}
        <View className="flex-1 relative items-center justify-center">
          <Animatable.Image
            animation="fadeIn"
            easing="ease-in-out"
            source={Hero2Image}
            className="w-full h-full object-cover mt-20"
          />
  
          <TouchableOpacity
            onPress={() => navigation.navigate("AllPetsSitters")}
            className="absolute bottom-20 py-10 px-4  rounded-full items-center justify-center "
          >
            <Animatable.View
              animation={"fadeInLeft"}
              easing="ease-in-out"
              iterationCount={1}
              className="py-2 px-4 bg-[#000000] text-white font-semibold rounded-full items-center justify-center"
            >
              <Text className="text-[#9787b5] text-[30px] font-semibold">Find a Pet Sitter</Text>
            </Animatable.View>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={() => navigation.navigate("PetSitterRegister")}
            className="absolute bottom-10 py-2 px-4  rounded-full items-center justify-center "
          >
            <Animatable.View
              animation={"fadeInRight"}
              easing="ease-in-out"
              iterationCount={1}
              className="py-2 px-4 bg-[#000000]  font-semibold rounded-full items-center justify-center"
            >
              <Text className="text-[#9787b5] text-[30px] font-semibold">Pet Sitter Profile</Text>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
}

export default PetSittingHomeScreen
