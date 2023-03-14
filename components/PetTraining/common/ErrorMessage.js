import React from 'react';
import { Text } from 'react-native';

function ErrorMessage({error,visible}) {
  if (!visible || !error) return null;

  return <Text style={{ fontSize: 18, color: "red" }}>{error}</Text>;
}

export default ErrorMessage;