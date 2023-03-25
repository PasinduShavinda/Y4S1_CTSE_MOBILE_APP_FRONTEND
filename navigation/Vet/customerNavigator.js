import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SnackBarSave  from "../../components/Vet/SnackBar";
import SnackBarAppnt  from "../../components/Vet/SnackBarAppnt";
import { GetAppointment } from "../../screens/Vet/customer-vet/cust-get-appointment";
import { UpdateAppointment } from "../../screens/Vet/customer-vet/cust-update_appointment";
import { CustHome } from "../../screens/Vet/customer-vet/cust-vet-home";
import { ViewAppointment } from "../../screens/Vet/customer-vet/cust-view-appointment";
import { CustViewDoc } from "../../screens/Vet/customer-vet/cust-view-vet";
import { CustHomeSplash } from "../../components/Vet/SplashCustHome";

const Stack = createNativeStackNavigator();

export default function VetCustNavigator() {
  return (
    <Stack.Navigator initialRouteName="CustHome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GetAppointment" component={GetAppointment} />
      <Stack.Screen name="ViewAppointment" component={ViewAppointment} />
      <Stack.Screen name="UpdateAppointment" component={UpdateAppointment} />
      <Stack.Screen name="CustViewDoc" component={CustViewDoc} />
      <Stack.Screen name="CustHome" component={CustHome} />
      <Stack.Screen name="SnackSave" component={SnackBarSave} />
      <Stack.Screen name="SnackSaveAppnt" component={SnackBarAppnt} />
      <Stack.Screen name="SplashCustHome" component={CustHomeSplash}/>
    </Stack.Navigator>
  );
}
