import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Screen from "../../components/PetTraining/common/Screen";
import AppForm from "../../components/PetTraining/common/AppForm";
import * as Yup from "yup";
import AppFormField from "../../components/PetTraining/common/AppFormField";
import colors from "../../utils/colors";
import SubmitButton from "../../components/PetTraining/common/SubmitBUtton";
import routes from "../../navigation/PetTraining/routes";
import { registerUser, saveUser } from "../../services/PetTraining/userService";
import { Snackbar } from "react-native-paper";

export default function RegistrationScreen({ route, navigation }) {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(5)
      .required()
      .label("Name"),
    email: Yup.string()
      .email()
      .required()
      .label("Email"),
    password: Yup.string()
      .min(5)
      .required()
      .label("Password"),
    confirmPassword: Yup.string()
      .min(5)
      .required()
      .label("Confirm Password"),
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [snakVisible, SetSnackVisible] = useState(false);
  const handleSubmit = async (value, { resetForm }) => {
    const data = {
      name: value.name,
      email: value.email,
      password: value.password,
    };
    if (value.password !== value.confirmPassword) {
      setErrorMessage("Password dosn't match");
      SetSnackVisible(true);
      return;
    }

    await registerUser(data)
      .then(async function(response) {
        await saveUser(data, response.user.uid).then((response) => {
          SetSnackVisible(true);
          setTimeout(() => {
            navigation.navigate(routes.LOGIN);
          }, 2500);
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage("User already exists");
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
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values, { resetForm });
            }}
            validationSchema={validationSchema}
          >
            <View style={styles.fields}>
              <Text style={styles.text}>FUll NAME</Text>
              <AppFormField
                maxLength={255}
                name="name"
                placeholder="Enter Full Name"
              />
              <Text style={styles.text}>EMAIL</Text>
              <AppFormField
                maxLength={255}
                name="email"
                placeholder="Enter Email"
              />
              <Text style={styles.text}>PASSWORD</Text>
              <AppFormField
                keyboardType="password"
                maxLength={255}
                name="password"
                placeholder="Enter Password"
                secureTextEntry
              />
              <Text style={styles.text}>CONFIRM PASSWORD</Text>
              <AppFormField
                keyboardType="password"
                maxLength={255}
                name="confirmPassword"
                placeholder="Enter Confirm Password"
                secureTextEntry
              />
            </View>
            <View style={styles.login}>
              <SubmitButton
                title={"SIGN UP"}
                style={styles.submitbutton}
                fontSize={18}
              />
              <Text
                style={styles.text}
                onPress={() => {
                  navigation.navigate(routes.LOGIN);
                }}
              >
                LOGIN
              </Text>
            </View>
          </AppForm>
        </View>
      </ScrollView>
      <Snackbar
        visible={snakVisible}
        onDismiss={() => {
          SetSnackVisible(false)
        }}
        duration={2000}
        action={{
          label: "OK",
          labelStyle: {
            color: errorMessage === null ? colors.secondary  : colors.red,
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
            {errorMessage === null ? "Registered Successfully" : errorMessage}
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
    marginBottom: 10,
  },
  form: { marginTop: 0 },
  fields: {
    alignSelf: "center",
    width: 400,
    padding: 20,
    marginBottom: 10,
  },
  text: {
    color: colors.primary,
    fontSize: 15,
    marginTop: 10,
  },
  submitbutton: {
    width: 130,
    height: 40,
    borderRadius: 10,
    marginTop: -10,
    color: colors.white,
    marginRight: 50,
    marginBottom: 10,
  },
  login: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingLeft: 90,
  },
  snackbar: {
    color: colors.limeGreen,
    fontSize: 18,
  },
  errsnackbar: {
    color: colors.red,
    fontSize: 18,
  },
});
