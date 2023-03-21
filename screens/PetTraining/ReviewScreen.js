import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/PetTraining/common/Screen";
import AppButton from "../../components/PetTraining/common/AppButton";
import ReviewCard from "../../components/PetTraining/ReviewCard";
import routes from "../../navigation/PetTraining/routes";
import { TouchableOpacity } from "react-native";
import ReviewBody from "../../components/PetTraining/ReviewBody";
import { onValue, ref } from "firebase/database";
import { db } from "../../database/firebaseConfig";

export default function ReviewScreen({ item }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = () => {
    const dbRef = ref(db, "reviews/");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const review = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setReviews(review);
    });
  };

  const openDialog = () => {
    setModalVisible(true);
  };
  const closeDialog = () => {
    setModalVisible(false);
  };
  return (
    <Screen>
      <ScrollView>
        {reviews.map((review, index) => {
          if (review.trainingId === item.id) {
            return <ReviewCard key={index} item={review} />;
          }
          })}
      </ScrollView>
      <AppButton
        title={"Review"}
        style={styles.reviewBtn}
        fontSize={20}
        onPress={openDialog}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeDialog}
      >
        <ReviewBody onClose={closeDialog} itmeId={item.id} />
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  reviewBtn: {
    height: 50,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    backgroundColor: "white",
    width: "80%", // adjust the width of the popup container
    height: "50%", // adjust the height of the popup container
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
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
});
