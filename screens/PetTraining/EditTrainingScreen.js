import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/PetTraining/common/Screen";
import AppForm from "../../components/PetTraining/common/AppForm";
import AppFormImagePicker from "../../components/PetTraining/common/AppFormImagePicker";
import * as Yup from "yup";
import colors from "../../utils/colors";
import AppFormField from "../../components/PetTraining/common/AppFormField";
import Checkbox from "../../components/PetTraining/common/Checkbox";
import SubmitButton from "../../components/PetTraining/common/SubmitBUtton";
import imageUpload from "../../services/PetTraining/imageUpload";
import { addTraining } from "../../services/PetTraining/trainingService";
import { Snackbar } from "react-native-paper";
import { auth } from "../../database/firebaseConfig";
import MapScreen from "./SelectLocationScreen";

export default function EditTrainingScreen({item}) {
  const [isLoading, setIsLoding] = useState(false);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    const petType = [...item.petType]
    const petAge = [...item.petAge]
    const petSize = [...item.petSize]

    typeCheckboxes.forEach(item => {
      const found = petType.find(type => type.lable === item.label);
      if (found) {
        handleTypeCheckboxChange(item.index)
      }
    })
    ageCheckboxes.forEach((item) => {
      const found = petAge.find((type) => type.lable === item.label);
      if (found) {
        handleAgeCheckboxChange(item.index);
      }
    });
    sizeCheckboxes.forEach((item) => {
      const found = petSize.find((type) => type.lable === item.label);
      if (found) {
        handleSizeCheckboxChange(item.index);
      }
    });
  },[])

  const validationSchema = Yup.object().shape({
    images: Yup.array()
      .min(1, "Please select atleast one image")
      .required()
      .label("Images"),
    description: Yup.string().required().label("Description"),
    experience: Yup.string().required().label("Experience"),
    locationDetails: Yup.string().required().label("Location Details"),
  });

  const [typeCheckboxes, setTypeCheckboxes] = useState([
    { index:0, label: "Dogs", icon: "dog-side", checked: false },
    { index:1, label: "Cats", icon: "cat", checked: false },
    { index:2, label: "Other", icon: "pastafarianism", checked: false },
  ]);

  const handleTypeCheckboxChange = (index) => {
    const newCheckboxes = [...typeCheckboxes];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setTypeCheckboxes(newCheckboxes);
  };

  const [ageCheckboxes, setAgeCheckboxes] = useState([
    {index:0,
      label: "3months - 1year",
      icon: "clock-time-two-outline",
      checked: false,
    },
    { index:1,label: "1year - 3year", icon: "clock-time-four-outline", checked: false },
    { index:2,label: "3+ years", icon: "clock-time-seven-outline", checked: false },
  ]);

  const handleAgeCheckboxChange = (index) => {
    const newCheckboxes = [...ageCheckboxes];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setAgeCheckboxes(newCheckboxes);
  };

  const [sizeCheckboxes, setSizeCheckboxes] = useState([
    { index:0,label: "1 - 5 KG", icon: "weight-kilogram", size: 5, checked: false },
    { index:1,label: "5 - 10 KG", icon: "weight-kilogram", size: 5, checked: false },
    { index:2,label: "10+ KG", icon: "weight-kilogram", size: 5, checked: false },
  ]);

  const handleSizeCheckboxChange = (index) => {
    const newCheckboxes = [...sizeCheckboxes];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setSizeCheckboxes(newCheckboxes);
  };

  const handleSubmit = async (values) => {
    setIsLoding(true);
    const type = [];
    const age = [];
    const size = [];
    typeCheckboxes
      .filter((t) => t.checked)
      .map((c) => type.push({ lable: c.label, icon: c.icon }));
    ageCheckboxes
      .filter((t) => t.checked)
      .map((c) => age.push({ lable: c.label }));
    sizeCheckboxes
      .filter((t) => t.checked)
      .map((c) => size.push({ lable: c.label, icon: c.icon, size: c.size }));

    await imageUpload(values.images)
      .then(async (response) => {
        const data = {
          userId: user.uid,
          description: values.description,
          experience: values.experience,
          images: [...response],
          petType: type,
          petAge: age,
          petSize: size,
          location: location,
          locationDetails: values.locationDetails,
        };
        await addTraining(data)
          .then(() => {
            setIsLoding(false);
            setIsSnackbarVisible(true);
          })
          .catch((error) => {
            setIsLoding(false);
            console.log("Error: ", error);
          });
      })
      .catch((error) => {
        setIsLoding(false);
        console.log("Error", error);
      });
  };
  const saveLocation = (marker) => {
    const newMarker = {
      latitude: marker.latitude,
      longitude: marker.longitude,
    };
    setLocation(newMarker);
    console.log(marker);
  };

  return (
    <Screen>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator
            style={styles.loading}
            size={40}
            color={colors.primary}
          />
        ) : null}
        <View style={styles.form}>
          <AppForm
            initialValues={{
              images: [],
              description: item.description,
              experience: item.experience,
              locationDetails: item.locationDetails,
            }}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={validationSchema}
          >
            <View style={{ marginLeft: 15 }}>
              <AppFormImagePicker name={"images"} />
            </View>
            <View style={styles.fields}>
              <Text style={styles.text}>Description</Text>
              <AppFormField
                maxLength={255}
                name="description"
                multiline
                numberOfLines={4}
                height={90}
                placeholder="Give a breaf description"
              />
              <Text style={styles.text}>Training Experience</Text>
              <AppFormField
                maxLength={255}
                name="experience"
                multiline
                numberOfLines={4}
                height={90}
                placeholder="Enter your training experience"
              />
              <Text style={styles.text}>Accepting Pet Type</Text>
              <View style={styles.checkbox}>
                {typeCheckboxes.map((checkbox, index) => (
                  <Checkbox
                    key={index}
                    label={checkbox.label}
                    checked={checkbox.checked}
                    onChange={() => handleTypeCheckboxChange(index)}
                  />
                ))}
              </View>
              <Text style={styles.text}>Accepting Pet Age</Text>
              <View style={styles.checkbox}>
                {ageCheckboxes.map((checkbox, index) => (
                  <Checkbox
                    key={index}
                    label={checkbox.label}
                    checked={checkbox.checked}
                    onChange={() => handleAgeCheckboxChange(index)}
                  />
                ))}
              </View>
              <Text style={styles.text}>Accepting Pet Size</Text>
              <View style={styles.checkbox}>
                {sizeCheckboxes.map((checkbox, index) => (
                  <Checkbox
                    key={index}
                    label={checkbox.label}
                    checked={checkbox.checked}
                    onChange={() => handleSizeCheckboxChange(index)}
                  />
                ))}
              </View>
              <Text style={styles.text}>Location</Text>
              <AppFormField
                maxLength={255}
                name="locationDetails"
                multiline
                numberOfLines={4}
                height={90}
                placeholder="Enter location details"
              />
            </View>
            <MapScreen onSave={saveLocation} style={styles.map} />
            <SubmitButton
              title={"submit"}
              style={styles.submitButton}
              fontSize={16}
            />
          </AppForm>
        </View>
      </ScrollView>
      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={() => setIsSnackbarVisible(false)}
        duration={2000}
        action={{
          label: "OK",
          labelStyle: { color: colors.white, fontSize: 18 },
          onPress: () => {
            setIsSnackbarVisible(false);
          },
        }}
        style={{ backgroundColor: colors.secondary }}
      >
        <View>
          <Text style={styles.snackBarText}>Saved Successfully</Text>
        </View>
      </Snackbar>
    </Screen>
  );
}
const styles = StyleSheet.create({
  loading: {
    display: "flex",
    alignSelf: "center",
    position: "absolute",
    marginTop: "50%",
  },
  form: {
    margin: 10,
    marginBottom: 20,
  },
  fields: {
    alignSelf: "center",
    width: 400,
    padding: 20,
    marginBottom: 10,
  },
  text: {
    color: colors.secondary,
    fontSize: 15,
    fontWeight: "bold",
  },
  checkbox: {
    marginTop: 15,
  },
  submitButton: {
    height: 50,
  },
  snackBarText: {
    color: colors.white,
    fontSize: 15,
  },
  map: {
    height: 400,
    width: "99%",
    marginBottom: 10,
    marginTop: -20,
  },
});
