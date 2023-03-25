import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Screen from "../../components/PetTraining/common/Screen";
import AppForm from "../../components/PetTraining/common/AppForm";
import * as Yup from "yup";
import AppFormField from "../../components/PetTraining/common/AppFormField";
import colors from "../../utils/colors";
import SubmitButton from "../../components/PetTraining/common/SubmitBUtton";
import { loginUser } from "../../services/PetTraining/userService";
import routes from "../../navigation/PetTraining/routes";
import { Snackbar } from "react-native-paper";

export default function LoginScreen({ navigation }) {
  const [snakVisible, SetSnackVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required")
      .label("Email"),
    password: Yup.string()
      .required()
      .min(6)
      .label("Password"),
  });
  const handleSubmit = async (values, { resetForm }) => {
    await loginUser(values)
      .then((response) => {
        SetSnackVisible(true);
        setTimeout(() => {
          navigation.navigate(routes.HOMENAV);
        }, 2500);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setErrorMessage("User not found");
          SetSnackVisible(true);
        } else if (error.code === "auth/wrong-password") {
          setErrorMessage("Wrong password");
          SetSnackVisible(true);
        } else if (error.code === "auth/invalid-email") {
          setErrorMessage("Invalid email");
          SetSnackVisible(true);
        }
      });
    resetForm();
  };
  return (
    <Screen>
      <ScrollView>
        <View>
          <Image
            style={styles.logo}
            source={require("../../assets/logo.png")}
          />
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
                icon={"email"}
              />
              <Text style={styles.text}>Password</Text>
              <AppFormField
                keyboardType="password"
                maxLength={255}
                name="password"
                placeholder="Enter Password"
                icon={"key"}
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
      </ScrollView>
      <Snackbar
        visible={snakVisible}
        onDismiss={() => SetSnackVisible(false)}
        duration={2000}
        action={{
          label: "OK",
          labelStyle: {
            color: errorMessage === null ? colors.secondary : colors.red,
            fontSize: 18,
          },
          onPress: () => {
            SetSnackVisible(false);
          },
        }}
        style={{
          backgroundColor: colors.lightPurple,
        }}
      >
        <View>
          <Text
            style={{
              ...styles.snackbar,
              color: errorMessage === null ? colors.secondary : colors.red,
            }}
          >
            {errorMessage === null ? "Login Successful" : errorMessage}
          </Text>
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
    fontSize: 18,
  },
});
