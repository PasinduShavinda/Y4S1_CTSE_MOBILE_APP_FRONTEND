import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SnackBarSave from "../../components/Vet/SnackBar";
import SnackBarAppnt from "../../components/Vet/SnackBarAppnt";
import { GetAppointment } from "../../screens/Vet/customer-vet/cust-get-appointment";
import { UpdateAppointment } from "../../screens/Vet/customer-vet/cust-update_appointment";
import { CustDash } from "../../screens/Vet/customer-vet/cust-vet-dashboard";
import { CustHome } from "../../screens/Vet/customer-vet/cust-vet-home";
import { ViewAppointment } from "../../screens/Vet/customer-vet/cust-view-appointment";
import { CustViewDoc } from "../../screens/Vet/customer-vet/cust-view-vet";

const Stack = createNativeStackNavigator();

export default function vetCustNavigator() {
  return (
    <Stack.Navigator initialRouteName="CustHome">
      <Stack.Screen name="GetAppointment" component={GetAppointment} />
      <Stack.Screen name="ViewAppointment" component={ViewAppointment} />
      <Stack.Screen name="UpdateAppointment" component={UpdateAppointment} />
      <Stack.Screen name="CustViewDoc" component={CustViewDoc} />
      <Stack.Screen name="CustHome" component={CustHome} />
      <Stack.Screen name="CustDash" component={CustDash} />
      <Stack.Screen name="SnackSave" component={SnackBarSave} />
      <Stack.Screen name="SnackSaveAppnt" component={SnackBarAppnt} />
    </Stack.Navigator>
  );
}
