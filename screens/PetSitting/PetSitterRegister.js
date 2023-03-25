import React, { useState,useEffect,useLayoutEffect } from 'react';
import { StyleSheet,View, TextInput, Button, Text ,TouchableHighlight,ToastAndroid,ScrollView,TouchableOpacity} from 'react-native';
import { MultipleSelectList ,SelectList} from 'react-native-dropdown-select-list'
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-paper';
import {fireDB,fireStorage,auth} from '../../database/firebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import {collection,addDoc, setDoc} from 'firebase/firestore'
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc ,deleteDoc ,updateDoc} from "firebase/firestore";
import { FontAwesome, FontAwesome5, MaterialIcons,AntDesign,Feather } from "@expo/vector-icons";

const PetSitterRegister = () => {
    const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [adress, setAdress] = useState('');
  const[hasGalleryPermission,setHasGalleryPermission]=useState(null);
  const [image, setImage] = useState(null);
  const [selected, setSelected] = React.useState([]);
  const [imageurl, setImageurl] = useState(null);
  const [description,setDescription]=useState(null)
  const [profile, setExistProfile] = useState(null);
  
  const navigation = useNavigation();



  useEffect(()=>{
    (async()=>{
      const galleryStatus =await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status=='granted');
    })();
  },[])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };


if(hasGalleryPermission==false){
  return(
    <Text>No access to Internal Storage</Text>
  )
}



useLayoutEffect(() => {
  navigation.setOptions({
    headerShown: false,
  });
}, []);
useEffect(()=>{
  const ReadData=async()=>{
   

const docRef = doc(fireDB, "petsitters",auth.currentUser.uid);

  const docSnap = await getDoc(docRef);
  if(docSnap.exists()){
    setExistProfile(true);
    setName(docSnap.data().Name);
    setAdress(docSnap.data().Adress)
    setDescription(docSnap.data().description)
    setEmail(docSnap.data().Email)
    setImageurl(docSnap.data().imageurl)
    setImage(docSnap.data().imageurl)
    setSelected(docSnap.data().types)
    setPhone(docSnap.data().Phone)

  }
  }
  ReadData();
},[])
useEffect(()=>{
 const uploadImage=async()=>{
   const blobImage=await new Promise((resolve,reject)=>{
     const xhr=new XMLHttpRequest();
     xhr.onload =function(){
      resolve(xhr.response)
    
     };
     xhr.onerror=function(){
      reject(new TypeError("Network request faild"));

     };
     xhr.responseType="blob";
     xhr.open("GET",image,true);
     xhr.send(null);
   });
   const metadata = {
    contentType: 'image/jpeg'
  };

  const storageRef = ref(fireStorage, 'petsitters/' + Date.now());
const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
  
    switch (error.code) {
      case 'storage/unauthorized':
        
        break;
      case 'storage/canceled':
       
        break;
      case 'storage/unknown':
        
        break;
    }
  }, 
  () => {
   
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
   
      setImageurl(downloadURL)
    });
  }
);

 }

 if(image!=null){
  uploadImage();

 }
},[image])




const handleSubmit=async()=>{
  if (!name || !phone || !adress || !email || !description || !selected ) {
    ToastAndroid.show("Please fill all the items", ToastAndroid.SHORT);
  } else if (/^\d+$/.test(phone) === false || phone.length !== 10) {
      ToastAndroid.show("Please fill a valid mobile number", ToastAndroid.SHORT);
  }else if (/\S+@\S+\.\S+/.test(email)===false) {
    ToastAndroid.show("Please fill a valid email", ToastAndroid.SHORT);
}
   else {
  const docRef = await setDoc(doc(fireDB,"petsitters",auth.currentUser.uid),{
    Name:name,
    Phone:phone,
    Adress:adress,
    Email:email,
    imageurl:imageurl,
    description:description,
    types:selected
   }).then(navigation.navigate("PetSittingHomeScreen"));
   ToastAndroid.show(`Petsitter Profile Created`, ToastAndroid.SHORT);
   
  }
}

const updateProfile=async()=>{
  const docRef = await updateDoc(doc(fireDB,"petsitters",auth.currentUser.uid),{
    Name:name,
    Phone:phone,
    Adress:adress,
    Email:email,
    imageurl:imageurl,
    description:description,
    types:selected
   }).then(navigation.navigate("PetSittingHomeScreen"));
   console.log("Document written with ID",docRef.id);
}

const deleteProfile=async()=>{
  await deleteDoc(doc(fireDB,"petsitters",auth.currentUser.uid)).then(alert("your petsitter profile is deleted")).then(navigation.navigate("PetSittingHomeScreen"));
}
  
const data = [
    {key:'1', value:'Cats'},
    {key:'2', value:'Dogs'},
    {key:'3', value:'birds'},
    {key:'4', value:'rabbits'},
    {key:'5', value:'horses'},
    {key:'6', value:'guinea pigs'},
    {key:'7', value:'fish'},
]


  return (
    <ScrollView>
    <View className="p-4">
    <View className="flex-row items-center justify-between px-9 mt-8">
   

<View className="w-[640px] h-[640px] bg-[#9787b5] rounded-full absolute -bottom-36 -left-36"></View>

{profile ==null &&(
     <Text className="text-[#000000] text-[30px] font-bold">Created Pet sitter account </Text>
     
       
)}
{profile !==null &&(
  <View>
     <Text className="text-[#000000] text-[35px] font-bold px-2"> Your Pet Sitter</Text>
     <Text className="text-[#000000] text-[35px] font-bold px-20"> Profile</Text> 
     </View>
)}
         
             </View>
     <View style={styles.container}>
   
     <View>
      <TouchableHighlight onPress={()=>pickImage()}
      
       underlayColour="rgba(0,0,0,0)">
    
      <Avatar.Image
      className="bg-[#A9A9A9]"
      size={200}
      source={{ uri: image }}/>
      
      </TouchableHighlight>
     </View>
  
    </View>
    <View>

    </View>

      <TextInput
        className="border border-gray-400 rounded-lg py-2 px-4 mb-4 mt-8"
        placeholder="Name"
        onChangeText={(text)=>setName(text)}
        value={name}
      />
        <TextInput
        className="border border-gray-400 rounded-lg py-2 px-4 mb-4"
        placeholder="Email"
        onChangeText={(text)=>setEmail(text)}
        value={email}
      />
      <TextInput
        className="border border-gray-400 rounded-lg py-2 px-4 mb-4"
        placeholder="Adress"
        onChangeText={(text)=>setAdress(text)}
        value={adress}
      />
      <TextInput
        className="border border-gray-400 rounded-lg py-2 px-4 mb-4"
        placeholder="Mobile"
        onChangeText={(text)=>setPhone(text)}
        value={phone}
      />
         
    <MultipleSelectList 
        style={styles.MultipleSelectList}
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
        onSelect={() => alert(selected)} 
        label="Pet Types"
        
    />
      <TextInput
        multiline
        placeholder="Description"
        numberOfLines={4}
        maxLength={400}
        onChangeText={text => setDescription(text)}
        className="border border-gray-400 rounded-lg py-2 px-4 mb-4"
        value={description}
      />
    {profile ==null &&(
     
     <TouchableOpacity
     onPress={handleSubmit}
            className="py-2 px-4 bg-[#000000] text-[#CF9FFF] font-semibold rounded-full items-center justify-center flex-row mt-4 "
          > 
           <FontAwesome5 name="paw" size={35} color="#CF9FFF" />
          <Text className="text-[#CF9FFF] text-[25px] px-5">Become a Pet Sitters</Text>
          </TouchableOpacity>
    )}
      
      {profile !==null &&(
         
          <TouchableOpacity
          onPress={updateProfile}
                 className="py-2 px-4 bg-[#211D1D] text-[#EEDD0E] font-semibold rounded-full items-center justify-center flex-row mt-4 "
               > 
                <FontAwesome5 name="edit" size={35} color="#EEDD0E" />
               <Text className="text-[#EEDD0E] text-[25px] px-5">Update Profile</Text>
               </TouchableOpacity>
          
      )}
     
       
     {profile !==null &&(
          
          <TouchableOpacity
          onPress={deleteProfile}
                 className="py-2 px-4 bg-[#211D1D] text-[#C51804] font-semibold rounded-full items-center justify-center flex-row mt-4 "
               > 
                <FontAwesome5 name="trash-alt" size={35} color="#C51804" />
               <Text className="text-[#C51804] text-[25px] px-5">Remove Profile</Text>
               </TouchableOpacity>
      )}


    </View>
    </ScrollView>
  )
}

export default PetSitterRegister

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    container: {
      
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:50
    },
    MultipleSelectList:{
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
  
    }
  });