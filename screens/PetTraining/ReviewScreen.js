import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Screen from '../../components/PetTraining/common/Screen'
import AppButton from '../../components/PetTraining/common/AppButton'
import ReviewCard from '../../components/PetTraining/ReviewCard'

export default function ReviewScreen() {
  return (
    <Screen>
      <ScrollView>
        <ReviewCard/>
      </ScrollView>
      <AppButton title={"Review"} style={styles.reviewBtn} fontSize={20} />
    </Screen>
  )
}

const styles = StyleSheet.create({
  reviewBtn: {
    height:50
  }
})