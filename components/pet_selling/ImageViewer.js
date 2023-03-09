import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  Button,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
export default function ImageViewer({ selectedImage }) {
  const imageSource = { uri: selectedImage };

  return <Image source={imageSource} />;
}
