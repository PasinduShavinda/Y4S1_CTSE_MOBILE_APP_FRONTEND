import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../../utils/colors';

export default function Checkbox({onChange,label,checked}) {
  return (
    <TouchableOpacity onPress={onChange}>
      <View style={styles.checkboxContainer}>
        <View style={styles.checkbox}>
          {checked && <View style={styles.checkboxInner} />}
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    height: 20,
    width: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxInner: {
    height: 12,
    width: 12,
    backgroundColor: colors.secondary,
  },
  label: {
    fontSize: 16,
  },
});