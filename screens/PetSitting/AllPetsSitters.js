import { View, Text ,FlatList,Image,ScrollView,ActivityIndicator,SafeAreaView,TouchableOpacity} from 'react-native'
import React, { useEffect ,useLayoutEffect,useState} from 'react'
import { collection, getDocs, onSnapshot } from "firebase/firestore"
import {fireDB} from './../../database/firebaseConfig'
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AllPetsSitters = () => {
    const[data,setData] = useState([]);
    const navigation = useNavigation();
    const [filterText, setFilterText] = useState("");
 useLayoutEffect(()=>{
  const ref =collection(fireDB,"petsitters");
  onSnapshot(ref,(petsitters)=>
  setData(petsitters.docs.map((petsitters)=>({
    id:petsitters.id,
    data:petsitters.data()
  }))))

 })
 useLayoutEffect(() => {
  navigation.setOptions({
    headerShown: false,
  });
}, []);





  
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

   
      
        <View className=" flex-1 items-center justify-center">
         
        </View>
      
        <ScrollView>
         

          <View>
            <View className="flex-row items-center justify-between px-4 mt-8">
              <Text className="text-[#605B63] text-[28px] font-bold">
                Top Tips
              </Text>
              <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                <Text className="text-[#605B63] text-[20px] font-bold">
                  Explore
                </Text>
                <FontAwesome
                  name="long-arrow-right"
                  size={24}
                  color="#605B63"
                />
              </TouchableOpacity>
            </View>

            <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
        



{data?.map((petsitter, i) => (
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