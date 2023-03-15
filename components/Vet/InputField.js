import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import COLORS from '../../utils/Vet/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InputField = ({
    label,
    iconName,
    error,
    onFocus = () => {},
    ...props
  }) => {
    const [isFocused, setIsFocused] = React.useState(false);
    return (
      <View style={{marginBottom: 20}}>
        <Text style={style.label}>{label}</Text>
        <View
          style={[
            style.inputContainer,
            {
              borderColor: error
                ? COLORS.red
                : isFocused
                ? COLORS.darkBlue
                : COLORS.light,
              alignItems: 'center',
            },
          ]}>
          <Icon
            name={iconName}
            style={{color: COLORS.darkBlue, fontSize: 32, marginRight: 10}}
          />
          <TextInput
            autoCorrect={false}
            onFocus={() => {
              onFocus();
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            style={{color: COLORS.darkBlue, flex: 1}}
            {...props}
          />
        </View>
        {error && (
          <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
            {error}
          </Text>
        )}
      </View>
    );
  };
  
  const style = StyleSheet.create({
    label: {
      marginVertical: 5,
      fontSize: 24,
      color: 'COLORS.grey',
    },
    inputContainer: {
      height: 55,
      backgroundColor: "#dfddea",
      flexDirection: 'row',
      paddingHorizontal: 15,
      borderWidth: 0.5,
      marginTop:-23
    },
  });
  
  export default InputField;
  