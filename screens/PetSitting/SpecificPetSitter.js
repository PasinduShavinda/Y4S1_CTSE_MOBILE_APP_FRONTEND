
import {View,Text,SafeAreaView,ScrollView,Image,TouchableOpacity } from "react-native";
  import React, { useLayoutEffect } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
const SpecificPetSitter = ({route}) => {
    const navigation = useNavigation();

    const data = route?.params?.param;
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);
  
    return (
      <SafeAreaView className="flex-1 bg-white relative">
      <ScrollView className="flex-1 px-4 py-6">
        <View className="relative bg-white shadow-lg">
          <Image
            source={{
              uri: data?.imageurl
            }}
            className="w-full h-72 object-cover rounded-2xl"
          />
  
          <View className="absolute flex-row inset-x-0 top-5 justify-between px-6">
            <TouchableOpacity
              onPress={() => navigation.navigate("PetSittingHomeScreen")}
              className="w-10 h-10 rounded-md items-center justify-center bg-white"
            >
              <FontAwesome5 name="chevron-left" size={24} color="#CF9FFF" />
            </TouchableOpacity>
  
            <TouchableOpacity className="w-10 h-10 rounded-md items-center justify-center bg-[#CF9FFF]">
              <FontAwesome5 name="heart" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
  
          <View className="absolute flex-row inset-x-0 bottom-5 justify-between px-6">
            <View className="flex-row space-x-2 items-center">
              
              <Text className="text-[32px] font-bold text-gray-100">
                {data?.Name}
              </Text>
            </View>
  
           
          </View>
        </View>
  
       
  
        <View className="mt-4 flex-row items-center justify-between">
         
  
       
         
          
  
          
        </View>
        <Text className="mt-4 tracking-wide text-[20px] font-semibold text-[#97A6AF]">
              Accepted Pet Types
            </Text>
   
        {data?.types && (
            <Text className="mt-4 tracking-wide text-[16px] font-semibold text-[#97A6AF]">
              {data.types?.map((i,key)=>{
                return(
                  <View key={key}>
                     
                <Text>{" "+i +" "}</Text>
                
                  </View>
                )
              })}
            </Text>
          )}
  
  
  
        
        {data?.description && (
            <Text className="mt-4 tracking-wide text-[16px] font-semibold text-[#97A6AF]">
              {data?.description}
            </Text>
          )}
       
  
     
  
        <View className=" space-y-2 mt-4 bg-gray-100 rounded-2xl px-4 py-2">
        {data?.Phone && (
              <View className="items-center flex-row space-x-6">
                <FontAwesome name="phone" size={24} color="#CF9FFF" />
                <Text className="text-lg">{data?.Phone}</Text>
              </View>
            )}
            {data?.Email && (
              <View className="items-center flex-row space-x-6">
                <FontAwesome name="envelope" size={24} color="#CF9FFF" />
                <Text className="text-lg">{data?.Email}</Text>
              </View>
            )}
            {data?.Adress && (
              <View className="items-center flex-row space-x-6">
                <FontAwesome name="map-pin" size={24} color="#CF9FFF" />
                <Text className="text-lg">{data?.Adress}</Text>
              </View>
            )}
          
  <TouchableOpacity  onPress={() => navigation.navigate("ContactPetSitter",{param:data})}>
  <View className="mt-4 px-4 py-4 rounded-lg bg-[#CF9FFF] items-center justify-center mb-12">
            <Text className="text-3xl font-semibold  tracking-wider text-gray-100">
              Contact Now
            </Text>
          </View>
  </TouchableOpacity>
          
        </View>
      </ScrollView>
    </SafeAreaView>
    )
}

export default SpecificPetSitter