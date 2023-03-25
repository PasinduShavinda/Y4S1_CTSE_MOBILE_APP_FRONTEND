import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
  Keyboard
} from 'react-native';
import { fireDB } from '../../../database/firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import InputField from '../../../components/Vet/InputField';
import COLORS from '../../../utils/Vet/colors';

export function AdminUpdateVet({ route, navigation }) {

  const { vetId, name, profilePicture, spec, charge, contact, email, exp, loc, about } = route.params;
  const [newName, setNewName] = useState(name);
  const [newProfilePicture, setNewProfilePicture] = useState(profilePicture);
  const [newSpec, setNewSpec] = useState(spec);
  const [newCharge, setNewCharge] = useState(charge);
  const [newContact, setNewContact] = useState(contact);
  const [newEmail, setNewEmail] = useState(email);
  const [newExp, setNewExp] = useState(exp);
  const [newLoc, setNewLoc] = useState(loc);
  const [newAbout, setNewAbout] = useState(about);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      if (profilePicture) {
        setImageUri(profilePicture);
      }
    })();
  }, [profilePicture]);

  const _navigateToSnackSave = () => {
    navigation.navigate('SnackSave')
  }

  const handleChooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [4, 3], quality: 1 });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setNewProfilePicture(result.assets[0].uri);
    }
  };

  const handleUpdate = async () => {
    const vetRef = doc(fireDB, 'vets', vetId)
    await updateDoc(vetRef, {
      name: newName,
      spec: newSpec,
      charge: newCharge,
      contact: newContact,
      email: newEmail,
      exp: newExp,
      loc: newLoc,
      about: newAbout,
      profilePicture: newProfilePicture,
    }).catch((error) => {
      alert(error.message)
    })
  };
  const FormValidate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!name) {
      handleError('Please input name', 'name');
      isValid = false;
    }

    if (!spec) {
      handleError('Please input specialization', 'spec');
      isValid = false;
    }

    if (!contact) {
      handleError('Please input phone number', 'contact');
      isValid = false;
    }

    if (!email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!charge) {
      handleError('Please input charge', 'charge');
      isValid = false;
    }
    
    if (!exp) {
      handleError('Please input experience', 'exp');
      isValid = false;
    }

    if (!loc) {
      handleError('Please input location', 'loc');
      isValid = false;
    }

    if (!about) {
      handleError('Please input about', 'about');
      isValid = false;
    }

    if (!profilePicture) {
      handleError('Please input profilePicture', 'profilePicture');
      isValid = false;
    }

    if (isValid) {
      handleUpdate();
      _navigateToSnackSave();
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20 }}>
        <View>
          <Text style={styles.createBogHeader}>Update Doctor</Text>
        </View>
        <View style={{ marginVertical: 20 }}>
          {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
          <View style={{ margin: 20 }}>
            <Button title="Choose Image" onPress={handleChooseImage} />
          </View>

          {/* Name field */}
          <View>
            <Text style={styles.titleStyle}>Name</Text>
            <InputField
              onChangeText={setNewName}
              value={newName}
              placeholder="name"
            />
          </View>

          {/* Specialization field */}
          <View>
            <Text style={styles.titleStyle}>Specialization</Text>
            <InputField
              onChangeText={setNewSpec}
              value={newSpec}
              placeholder="specialization"
            />
          </View>

          {/* Mobile Number field */}
          <View>
            <Text style={styles.titleStyle}>Contact Number</Text>
            <InputField
              onChangeText={setNewContact}
              value={newContact}
              placeholder="mobile"
            />
          </View>


          {/* Email field */}
          <View>
            <Text style={styles.titleStyle}>Email</Text>
            <InputField
              onChangeText={setNewEmail}
              value={newEmail}
              placeholder="email"
            />
          </View>


          {/* Charges field */}
          <View>
            <Text style={styles.titleStyle}>Charges</Text>
            <InputField
              onChangeText={setNewCharge}
              value={newCharge}
              placeholder="charges"
            />
          </View>

          {/* Experience field */}
          <View>
            <Text style={styles.titleStyle}>Experience</Text>
            <InputField
              onChangeText={setNewExp}
              value={newExp}
              placeholder="experience"
            />
          </View>

          {/* Location field */}
          <View>
            <Text style={styles.titleStyle}>Location</Text>
            <InputField
              onChangeText={setNewLoc}
              value={newLoc}
              placeholder="location"
            />
          </View>

          {/* About Field */}
          <View>
            <Text style={styles.titleStyle}>About</Text>
            <TextInput
              style={styles.inputContainer}
              placeholder="about"
              editable
              multiline
              numberOfLines={6}
              maxLength={40}
              onChangeText={setNewAbout}
              value={newAbout}
            />
          </View>
          {/* UPDATE BUTTON */}
          <View style={styles.createNewBtnMain}>
            <Button
              title="UPDATE"
              onPress={FormValidate}
              style={styles.createNewBtn}
              color="orange"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  createBogHeader: {
    //   color: "blue",
    textAlign: "center",
    fontSize: 22,
    marginTop: 80,
    fontWeight: "bold",
    marginBottom: 32
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 5,
  },
  box1: {
    paddingLeft: 0,
    paddingTop: 10,
    width: "70%",
  },
  box2: {
    padding: 10,
    borderRadius: 10,
    width: "30%",
  },
  hourBox1: {
    paddingLeft: 0,
    paddingTop: 10,
    width: "30%",
  },
  MinutsBox2: {
    padding: 10,
    borderRadius: 10,
    width: "30%",
  },
  AMPMBox2: {
    padding: 10,
    borderRadius: 10,
    width: "30%",
  },
  mainSheet: {
    backgroundColor: "white",
    marginBottom: 40,
  },
  bodySheet: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  titleStyle: {
    //   color: "blue",
    fontSize: 16,
    marginBottom: 15,
    marginTop: 32,
    fontStyle:'italic'
  },
  input: {
    height: 40,
    padding: 10,
    outline: 1,
    borderBottomWidth: 2,
    //   borderColor: "blue",
  },
  multiText: {
    paddingLeft: 10,
    outline: 1,
    borderWidth: 2,
    //   borderColor: "blue",
  },
  dateInput: {
    height: 40,
    padding: 10,
    outline: 1,
    borderWidth: 2,
    //   borderColor: "blue",
  },
  createNewBtn: {
    marginTop: 50,
    padding: 15,
    borderRadius: 10,
    marginLeft: 30,
  },
  createNewBtnMain: {
    marginTop: 50,
    marginBottom: 50,
    paddingBottom: 20,
  },
  profilePictureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  profilePicture: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  inputContainer: {
    height: 95,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,

  },
});






