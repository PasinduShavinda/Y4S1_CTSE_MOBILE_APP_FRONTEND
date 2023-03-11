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
  
        <View className="flex-row px-6 mt-12 items-center space-x-2">
          <View className="w-20 h-16 bg-black rounded-full items-center justify-center">
            <Text className="text-[#CF9FFF] text-3xl font-semibold">Find</Text>
          </View>
  
          <Text className="text-[#2A2B4B] text-3xl font-semibold">Pet Sitters</Text>
        </View>
  
        {/* Second Section */}
        <View className="px-6 mt-6 space-y-1">
          <Text className="text-[#3C6072] text-[30px] ">Let your dog stay with us</Text>
          <Text className="text-[#CF9FFF] text-[36px] font-bold">
          while you're away
          </Text>
  
          <Text className="text-[#3C6072] text-base">
          Are you traveling, spending the day out or need help taking care of your pet?
          </Text>
        </View>
  
        {/* Circle Section */}
        <View className="w-[390px] h-[390px] bg-[#CF9FFF] rounded-full absolute bottom-36 -right-36"></View>
        <View className="w-[450px] h-[450px] bg-[#800080] rounded-full absolute -bottom-28 -left-36"></View>
  
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
            className="absolute bottom-40 py-2 px-4  rounded-full items-center justify-center "
          >
            <Animatable.View
              animation={"pulse"}
              easing="ease-in-out"
              iterationCount={"infinite"}
              className="py-2 px-4 bg-[#000000] text-white font-semibold rounded-full items-center justify-center"
            >
              <Text className="text-[#CF9FFF] text-[30px] font-semibold">Find a Pet Sitter</Text>
            </Animatable.View>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={() => navigation.navigate("PetSitterRegister")}
            className="absolute bottom-20 py-2 px-4  rounded-full items-center justify-center "
          >
            <Animatable.View
              animation={"pulse"}
              easing="ease-in-out"
              iterationCount={"infinite"}
              className="py-2 px-4 bg-[#000000]  font-semibold rounded-full items-center justify-center"
            >
              <Text className="text-[#CF9FFF] text-[30px] font-semibold">Pet Sitter Profile</Text>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
}

export default PetSittingHomeScreen
