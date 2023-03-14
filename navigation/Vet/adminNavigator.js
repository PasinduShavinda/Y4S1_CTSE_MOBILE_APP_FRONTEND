import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminAddDoctor } from "../../screens/Vet/admin-vet-management/admin-add-vet";
import { AdminDash } from "../../screens/Vet/admin-vet-management/admin-dashboard";
import { AdminUpdateVet } from "../../screens/Vet/admin-vet-management/admin-update-vet";
import { AdminViewVets } from "../../screens/Vet/admin-vet-management/admin-view-vet";
import { VetHome } from "../../screens/Vet/VetHome";

const Stack = createNativeStackNavigator()

export default function vetAdminNavigator() {
  return (
    <Stack.Navigator initialRouteName="AdminDash">
      <Stack.Screen name="VetHome" component={VetHome} />
      <Stack.Screen name="AdminAddDoc" component={AdminAddDoctor} />
      <Stack.Screen name="AdminViewDoc" component={AdminViewVets} />
      <Stack.Screen name="AdminUpdateDoc" component={AdminUpdateVet} />
      <Stack.Screen name="AdminDash" component={AdminDash} />
    </Stack.Navigator>
  );
}