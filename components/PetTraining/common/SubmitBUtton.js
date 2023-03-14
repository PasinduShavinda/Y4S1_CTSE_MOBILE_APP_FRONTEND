import React from 'react';
import AppButton from './AppButton';
import { useFormikContext } from "formik";

function SubmitButton({ title, style, fontSize, icon }) {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton
      title={title}
      style={style}
      fontSize={fontSize}
      onPress={handleSubmit}
      icon={icon}
    />
  );
}

export default SubmitButton;