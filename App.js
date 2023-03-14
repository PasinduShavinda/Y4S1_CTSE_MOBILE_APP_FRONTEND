import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {VetHome} from './screens/Vet/VetHome'
import {AdminAddDoctor} from './screens/Vet/admin-vet-management/admin-add-vet'
import {AdminViewVets} from './screens/Vet/admin-vet-management/admin-view-vet'
import {AdminUpdateVet} from './screens/Vet/admin-vet-management/admin-update-vet'
import {GetAppointment} from './screens/Vet/customer-vet/cust-get-appointment';
import { ViewAppointment } from './screens/Vet/customer-vet/cust-view-appointment';
import { UpdateAppointment } from './screens/Vet/customer-vet/cust-update_appointment';
import { CustViewDoc } from './screens/Vet/customer-vet/cust-view-vet';
import { CustHome } from './screens/Vet/customer-vet/cust-vet-home';
import { CustDash } from './screens/Vet/customer-vet/cust-vet-dashboard';
import SnackBar from './components/Vet/SnackBar';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* ADMIN */}
        <Stack.Screen name="VetHome" component={VetHome} />
        <Stack.Screen name="AdminAddDoc" component={AdminAddDoctor} /> 
        <Stack.Screen name="AdminViewDoc" component={AdminViewVets} />
        <Stack.Screen name="AdminUpdateDoc" component ={AdminUpdateVet} />

        {/* CUSTOMER */}
        <Stack.Screen name="GetAppointment" component={GetAppointment} />
        <Stack.Screen name="ViewAppointment" component={ViewAppointment} />
        <Stack.Screen name="UpdateAppointment" component={UpdateAppointment} />
        <Stack.Screen name="CustViewDoc" component={CustViewDoc} />

        <Stack.Screen name="CustHome" component={CustHome} />
        <Stack.Screen name="CustDash" component={CustDash} />
        <Stack.Screen name = "SnackSave" component={SnackBar}></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

