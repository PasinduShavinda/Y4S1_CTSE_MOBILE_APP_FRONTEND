import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
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
import routes from "../../navigation/PetTraining/routes";
import LoadingScreen from "../../components/PetTraining/LoadingScreen";

export default function AddTrainingScreen({ navigation }) {
  const [isLoading, setIsLoding] = useState(false);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const user = auth.currentUser;

  const validationSchema = Yup.object().shape({
    images: Yup.array()
      .min(1, "Please select atleast one image")
      .required()
      .label("Images"),
    description: Yup.string()
      .required()
      .label("Description"),
    experience: Yup.string()
      .required()
      .label("Experience"),
    locationDetails: Yup.string()
      .required()
      .label("Location Details"),
  });

  const [typeCheckboxes, setTypeCheckboxes] = useState([
    { label: "Dogs", icon: "dog-side", checked: false },
    { label: "Cats", icon: "cat", checked: false },
    { label: "Other", icon: "alien", checked: false },
  ]);

  const handleTypeCheckboxChange = (index) => {
    const newCheckboxes = [...typeCheckboxes];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setTypeCheckboxes(newCheckboxes);
  };

  const [ageCheckboxes, setAgeCheckboxes] = useState([
    {
      label: "3months - 1year",
      icon: "clock-time-two-outline",
      checked: false,
    },
    { label: "1year - 3year", icon: "clock-time-four-outline", checked: false },
    { label: "3+ years", icon: "clock-time-seven-outline", checked: false },
  ]);

  const handleAgeCheckboxChange = (index) => {
    const newCheckboxes = [...ageCheckboxes];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setAgeCheckboxes(newCheckboxes);
  };

  const [sizeCheckboxes, setSizeCheckboxes] = useState([
    { label: "1 - 5 KG", icon: "weight-kilogram", size: 15, checked: false },
    { label: "5 - 10 KG", icon: "weight-kilogram", size: 20, checked: false },
    { label: "10+ KG", icon: "weight-kilogram", size: 25, checked: false },
  ]);

  const handleSizeCheckboxChange = (index) => {
    const newCheckboxes = [...sizeCheckboxes];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setSizeCheckboxes(newCheckboxes);
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoding(true);
    const type = [];
    const age = [];
    const size = [];
    typeCheckboxes
      .filter((t) => t.checked)
      .map((c) => type.push({ lable: c.label, icon: c.icon }));
    ageCheckboxes
      .filter((t) => t.checked)
      .map((c) => age.push({ lable: c.label, icon: c.icon }));
    sizeCheckboxes
      .filter((t) => t.checked)
      .map((c) => size.push({ lable: c.label, icon: c.icon, size: c.size }));

    await imageUpload(values.images)
      .then(async (response) => {
        const data = {
          userId: user.uid,
          description: values.description,
          contact: values.contact,
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
            setTimeout(() => {
              navigation.navigate(routes.PROFILE);
            }, 2500);
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
    resetForm();
  };
  const saveLocation = (marker) => {
    const newMarker = {
      latitude: marker.latitude,
      longitude: marker.longitude,
    };
    setLocation(newMarker);
  };

  return (
    <Screen>
      {isLoading && <LoadingScreen />}
      <ScrollView>
        <View style={styles.form}>
          <AppForm
            initialValues={{
              images: [],
              description: "",
              experience: "",
              locationDetails: "",
              contact: "",
            }}
            onSubmit={(values, { resetForm }) =>
              handleSubmit(values, { resetForm })
            }
            validationSchema={validationSchema}
          >
            <View style={{ marginLeft: 15 }}>
              <AppFormImagePicker name={"images"} preValues={null} />
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
              <Text style={styles.text}>Contact Number(WhatsApp)</Text>
              <AppFormField
                maxLength={255}
                name="contact"
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
            <MapScreen
              onSave={saveLocation}
              style={styles.map}
              preLocation={null}
            />
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
    marginTop: "150%",
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
