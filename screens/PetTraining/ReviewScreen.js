import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/PetTraining/common/Screen";
import AppButton from "../../components/PetTraining/common/AppButton";
import ReviewCard from "../../components/PetTraining/ReviewCard";
import ReviewBody from "../../components/PetTraining/ReviewBody";
import { getAllReviewsByItemSub } from "../../services/PetTraining/reviewService";
import colors from "../../utils/colors";

export default function ReviewScreen({ item }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = () => {
    getAllReviewsByItemSub(setReviews, item.id);
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
        {reviews.length !== 0 ? (
          reviews.map((review, index) => {
            if (review.trainingId === item.id) {
              return <ReviewCard key={index} item={review} />;
            }
          })
        ) : (
          <View style={styles.none}>
            <Text style={styles.noneText}>No Reviews Yet</Text>
          </View>
        )}
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
        <ReviewBody onClose={closeDialog} item={item} />
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
    width: "80%",
    height: "50%",
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
  none: {
    paddingTop: "50%",
    alignSelf: "center",
  },
  noneText: {
    fontSize: 20,
    color: colors.secondary,
  },
});
