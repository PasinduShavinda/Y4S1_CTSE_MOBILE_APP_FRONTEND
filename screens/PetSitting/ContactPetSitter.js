import { View,SafeAreaView, Text,ImageBackground,KeyboardAvoidingView,Image,TextInput,TouchableOpacity,ScrollView,Platform,Linking,Button } from 'react-native'
import React ,{useLayoutEffect,useState}from 'react'
import { FontAwesome, FontAwesome5, MaterialIcons,AntDesign,Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";


const ContactPetSitter = ({route}) => {
 
   
    const [message, setMessage] = useState('');
  
    const navigation = useNavigation();
    const data = route?.params?.param;
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);
  
  
    const makePhoneCall=()=>{
      if(Platform.OS==="android"){
        Linking.openURL(`tel:${data.Phone}`)
      }else{
        Linking.openURL(`telprompt:${data.Phone}`)
      }
    }
    const openEmail=()=>{
      Linking.openURL(`mailto:${data.Email}?subject=Appointment&body=${message}`)  
    }
  
    const openSMS=()=>{
      Platform.select({ios: '&', android: '?'});
      Linking.openURL(`sms:${data.Phone} ?body=test`);
    }
    
    return (
  
      <SafeAreaView className="flex-1 bg-white relative">
        
      <View className="mt-8">
      <View className="px-6 mt-6 space-y-1">
          <Text className="text-[#3C6072] text-[36px] ">Contact</Text>
          <Text className="text-[#CF9FFF] text-[38px] font-bold">
          {data.Name}
          </Text>
          </View>
                </View>
              
  
              
        <View className='flex-1 mt-12 items-center'>
         
        <View className='w-3/4'>
        
          <TextInput
            className='w-full bg-white border border-[#CF9FFF] p-2 mb-2 h-40'
            onChangeText={setMessage}
            value={message}
            placeholder="Message"
            multiline
           
          />
          <TouchableOpacity
           onPress={()=>openEmail()}
            className="py-2 px-4 bg-[#000000] text-white font-semibold rounded-full items-center justify-center flex-row mt-4"
          >
             <FontAwesome5 name="envelope" size={35} color="#CF9FFF" />
          <Text className="text-[#CF9FFF] text-[25px] px-5 ">Send Mail</Text>
          </TouchableOpacity>
  
  
          <TouchableOpacity
           onPress={()=>openSMS()}
            className="py-2 px-4 bg-[#000000] text-[#CF9FFF] font-semibold rounded-full items-center justify-center flex-row mt-4 "
          > 
           <FontAwesome5 name="sms" size={35} color="#CF9FFF" />
          <Text className="text-[#CF9FFF] text-[25px] px-5">Send SMS</Text>
          </TouchableOpacity>
        
      
       
        
      </View>
  
      </View>
  
  
         
  
      <TouchableOpacity
            onPress={()=>makePhoneCall()}
            className="absolute bottom-10 right-10 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#CF9FFF] rounded-full items-center justify-center"
          >
             
            <Animatable.View
              animation={"pulse"}
              easing="ease-in-out"
              iterationCount={"infinite"}
              className="w-20 h-20 items-center justify-center rounded-full bg-[#CF9FFF]"
            >
              <Feather name="phone-call" size={45}></Feather>
            </Animatable.View>
          </TouchableOpacity>
  
  
  
  </SafeAreaView>
  
  
  
  
    )
}

export default ContactPetSitter