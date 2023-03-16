import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AppForm from "./common/AppForm";
import colors from "../../utils/colors";
import AppFormField from "./common/AppFormField";
import Rating from "./Rating";
import AppButton from "./common/AppButton";
import * as Yup from "yup";
import strftime from "strftime";
import { currentUser } from "../../services/PetTraining/userService";

export default function ReviewBody({ onClose }) {
  const [rate, setRate] = useState(0);
  const currentDate = new Date();
  const formattedDate = strftime("%B %e %Y", currentDate);
  const user = currentUser();

  const validationSchema = Yup.object().shape({
    review: Yup.string()
      .required()
      .label("Review"),
  });

  const handleRating = (rate) => {
    setRate(rate);
  };

  const handleSubmit = async (values) => {
    const data = {
      date: formattedDate,
      review: values.review,
      rating: rate,
      trainingId: "",
      userName:user.name,
      
    };
  };
  return (
    <View style={styles.modalContainer}>
      <View style={styles.popup}>
        <View style={styles.rating}>
          <Text style={styles.text}>Rate the Service 1 to 5</Text>
          <Rating onRate={handleRating} />
        </View>
        <AppForm
          initialValues={{ review: "" }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validationSchema={validationSchema}
        >
          <View style={styles.fields}>
            <Text style={styles.text}>Review</Text>
            <AppFormField
              maxLength={255}
              name="experience"
              multiline
              numberOfLines={4}
              height={90}
              placeholder="Enter your training experience"
            />
          </View>
        </AppForm>
        <View style={styles.buttons}>
          <AppButton title={"Back"} style={styles.btn} onPress={onClose} />
          <AppButton title={"Add"} style={styles.btn} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    backgroundColor: "white",
    width: "90%", // adjust the width of the popup container
    height: "auto", // adjust the height of the popup container
    padding: 20,
    borderRadius: 10,
  },
  popupText: {
    marginBottom: 10,
  },
  closePopupButton: {
    height: 50,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  form: {
    margin: 10,
    marginBottom: 20,
  },
  rating: {
    padding: 10,
    marginBottom: -10,
    height: 90,
  },
  fields: {
    alignSelf: "center",
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
  text: {
    color: colors.secondary,
    fontSize: 15,
    fontWeight: "bold",
  },
  buttons: { flexDirection: "row", justifyContent: "flex-end" },
  btn: {
    width: 100,
    margin: 10,
    height: 40,
  },
});
