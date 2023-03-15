import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminAddDoctor } from "../../screens/Vet/admin-vet-management/admin-add-vet";
import { AdminDash } from "../../screens/Vet/admin-vet-management/admin-dashboard";
import { AdminUpdateVet } from "../../screens/Vet/admin-vet-management/admin-update-vet";
import { AdminViewVets } from "../../screens/Vet/admin-vet-management/admin-view-vet";
import { VetHome } from "../../screens/Vet/VetHome";
import SnackBarSave  from "../../components/Vet/SnackBar";
import SnackBarAppnt  from "../../components/Vet/SnackBarAppnt";
const Stack = createNativeStackNavigator()

export default function VetAdminNavigator() {
  return (
    <Stack.Navigator initialRouteName="AdminDash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VetHome" component={VetHome} />
      <Stack.Screen name="AdminAddDoc" component={AdminAddDoctor} />
      <Stack.Screen name="AdminViewDoc" component={AdminViewVets} />
      <Stack.Screen name="AdminUpdateDoc" component={AdminUpdateVet} />
      <Stack.Screen name="AdminDash" component={AdminDash} />
      <Stack.Screen name="SnackSave" component={SnackBarSave} />
      <Stack.Screen name="SnackSaveAppnt" component={SnackBarAppnt} />
    </Stack.Navigator>
  );
}