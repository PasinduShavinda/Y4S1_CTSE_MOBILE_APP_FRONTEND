import { View, Text, FlatList, Image, ScrollView, ActivityIndicator, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { collection, getDocs, onSnapshot } from "firebase/firestore"
import { fireDB } from './../../database/firebaseConfig'
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AllPetsSitters = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();
  const [filterText, setFilterText] = useState("");

  useLayoutEffect(() => {
    const ref = collection(fireDB, "petsitters");
    onSnapshot(ref, (petsitters) =>
      setData(petsitters.docs.map((petsitters) => ({
        id: petsitters.id,
        data: petsitters.data()
      }))))

  }, [])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);


  useEffect(() => {
    setFilteredData(filterData(data, filterText));
  }, [data, filterText]);

  const filterData = (data, filterText) => {
    return data.filter(petsitter => {
      const name = petsitter.data.Name || '';
      const address = petsitter.data.Adress || '';
      return name.toLowerCase().includes(filterText.toLowerCase()) || address.toLowerCase().includes(filterText.toLowerCase());
    });
  }



  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="flex-row items-center justify-between px-9 mt-7">
        <View>
          <Text className="text-[44px] text-[#CF9FFF] font-bold">Discover</Text>
          <Text className="text-[#605B63] text-[34px]">Suitable Pet Sitter</Text>
        </View>
      </View>
      <View>

      </View>
      <View className="px-4 mt-4">
        <TextInput
          placeholder="Search"
          value={filterText}
          onChangeText={text => setFilterText(text)}
          className="border border-gray-400 rounded-full px-4 py-2"
        />
      </View>


      <View className=" flex-1 items-center justify-center">

      </View>

      <ScrollView>


        <View>
          <View className="flex-row items-center justify-between px-4 mt-8">
            <Text className="text-[#605B63] text-[28px] font-bold">
              Top Pet Sitters
            </Text>

          </View>

          <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">




            {filteredData?.map((petsitter, i) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("SpecificPetSitter", { param: petsitter.data })}
                className="rounded-md border border-purple-500 space-y-2 px-3 py-2 shadow-lg bg-white w-[162px] my-2"
              >
                <Image
                  source={{ uri: petsitter.data.imageurl }}
                  className="w-full h-40 rounded-md object-cover"
                />

                {petsitter.data.Name ? (
                  <>
                    <Text className="text-[#428288] text-[18px] font-bold">
                      {petsitter.data.Name?.length > 14 ? `${petsitter.data.Name.slice(0, 14)}..` : petsitter.data.Name}
                    </Text>

                    <View className="flex-row items-center space-x-1">
                      <FontAwesome name="map-marker" size={20} color="#8597A2" />
                      <Text className="text-[#428288] text-[14px] font-bold">
                        {petsitter.data.Adress?.length > 18 ? `${petsitter.data.Name.slice(0, 18)}..` : petsitter.data.Adress}
                      </Text>
                    </View>
                  </>
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default AllPetsSitters