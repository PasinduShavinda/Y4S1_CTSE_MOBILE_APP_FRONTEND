import React from 'react';
import AppTextInput from './AppTextInput';
import ErrorMessage from './ErrorMessage';

import {useFormikContext} from "formik"

function AppFormField({ name, width, height, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  return (
    <>
      <AppTextInput
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        width={width}
        height={height}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;