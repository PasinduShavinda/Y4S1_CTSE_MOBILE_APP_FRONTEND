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
import { addReview } from "../../services/PetTraining/reviewService";
import SubmitButton from "./common/SubmitBUtton";
import { updateTraining } from "../../services/PetTraining/trainingService";

export default function ReviewBody({ onClose, item }) {
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
      trainingId: item.id,
      userName: user.name,
      dp: user.dp,
    };
    console.log(data);
    await addReview(data)
      .then(async () => {
        const training = item;
        const rating = item.rating;
        const totRate = item.ratingCount;
        training.ratingCount += 1;
        console.log(rating, totRate);
        training.rating =
          (rating * totRate + rate) / (training.ratingCount);
        await updateTraining(training, item.id).then(() => {
          onClose();
        });
      })
      .catch((error) => console.log(error));
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
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validationSchema}
        >
          <View style={styles.fields}>
            <Text style={styles.text}>Review</Text>
            <AppFormField
              maxLength={255}
              name="review"
              multiline
              numberOfLines={4}
              height={90}
              placeholder="Enter your review"
            />
          </View>
          <View style={styles.buttons}>
            <AppButton title={"Back"} style={styles.btn} onPress={onClose} />
            <SubmitButton title={"Add"} style={styles.btn} />
          </View>
        </AppForm>
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
    width: "90%",
    height: "auto",
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
