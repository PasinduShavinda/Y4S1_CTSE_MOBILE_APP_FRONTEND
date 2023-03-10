import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {VetHome} from './screens/Vet/VetHome'
import {AdminAddDoctor} from './screens/Vet/admin-vet-management/admin-add-vet'
import {AdminViewVets} from './screens/Vet/admin-vet-management/admin-view-vet'
import {AdminUpdateVet} from './screens/Vet/admin-vet-management/admin-update-vet'
import {GetAppointment} from './screens/Vet/customer-vet/cust-get-appointment';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="VetHome" component={VetHome} />
        <Stack.Screen name="AdminAddDoc" component={AdminAddDoctor} /> 
        <Stack.Screen name="AdminViewDoc" component={AdminViewVets} />
        <Stack.Screen name="AdminUpdateDoc" component ={AdminUpdateVet} />
        <Stack.Screen name="GetAppointment" component={GetAppointment} />
        {/* <Stack.Screen name="CustViewDoc" component={CustViewDoc} /> 
        <Stack.Screen name="ViewAppointment" component={ViewAppointment} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

