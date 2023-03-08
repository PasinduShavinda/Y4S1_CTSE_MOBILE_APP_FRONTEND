import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Screen from "../../components/PetTraining/common/Screen";
import AppForm from "../../components/PetTraining/common/AppForm";
import * as Yup from "yup";
import AppFormField from "../../components/PetTraining/common/AppFormField";
import colors from "../../utils/colors";
import SubmitButton from "../../components/PetTraining/common/SubmitBUtton";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../database/firebaseConfig";
import {
  loginUser,
  registerUser,
} from "../../services/PetTraining/userService";
import routes from "../../navigation/PetTraining/routes";

// import routes from "../navigation/routes";
// import { getCurrentUser, loginUser } from "../api/authService";
import { Snackbar } from "react-native-paper";

export default function LoginScreen({ navigation }) {
  const [snakVisible, SetSnackVisible] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string(),
    password: Yup.string(),
  });
  const handleSubmit = async (values, { resetForm }) => {
    // Add a new document in collection "cities"
    //console.log(validationSchema);

    await loginUser(values)
      .then((response) => {
        SetSnackVisible(true);
        console.log(response);

        setTimeout(() => {
          navigation.navigate(routes.HOMENAV);
        }, 2500);
      })
      .catch((error) => {
        console.log(error);
      });
    resetForm();
  };
  return (
    <Screen>
      <View>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
      </View>
      <View style={styles.form}>
        <AppForm
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values, { resetForm });
          }}
          validationSchema={validationSchema}
        >
          <View style={styles.fields}>
            <Text style={styles.text}>Email</Text>
            <AppFormField
              maxLength={255}
              name="email"
              placeholder="Enter Email"
            />
            <Text style={styles.text}>Password</Text>
            <AppFormField
              keyboardType="password"
              maxLength={255}
              name="password"
              placeholder="Enter Password"
              secureTextEntry
            />
          </View>
          <View style={styles.login}>
            <SubmitButton
              title={"Log in"}
              style={styles.submitbutton}
              fontSize={18}
            />
            <Text
              style={styles.text}
              onPress={() => {
                navigation.navigate(routes.REGISTRATION);
              }}
            >
              SIGN UP
            </Text>
          </View>
        </AppForm>
      </View>
      <Snackbar
        visible={snakVisible}
        onDismiss={() => SetSnackVisible(false)}
        duration={2000}
        action={{
          label: "OK",
          labelStyle: { color: colors.secondary, fontSize: 18 },
          onPress: () => {
            SetSnackVisible(false);
          },
        }}
        style={{ backgroundColor: colors.lightPurple }}
      >
        <View>
          <Text style={styles.snackbar}>Loged In Successfully</Text>
        </View>
      </Snackbar>
    </Screen>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 250,
    marginTop: 60,
    alignSelf: "center",
    marginBottom: 40,
  },
  form: { marginTop: 10 },
  fields: {
    alignSelf: "center",
    width: 400,
    padding: 20,
    paddingTop: 20,
    marginBottom: 80,
  },
  text: {
    color: colors.primary,
    fontSize: 15,
  },
  submitbutton: {
    width: 130,
    height: 40,
    borderRadius: 10,

    color: colors.white,
    marginRight: 50,
  },
  login: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingLeft: 90,
  },
  snackbar: {
    color: colors.secondary,
    fontSize: 18,
  },
});
