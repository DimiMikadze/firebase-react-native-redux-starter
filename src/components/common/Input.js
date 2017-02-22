/* eslint-disable import/prefer-default-export, no-shadow */
import React, { PropTypes } from 'react';
import { TextInput, View, Text } from 'react-native';

const propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  multiline: PropTypes.bool,
  containerStyle: PropTypes.object,
};

const defaultProps = {
  secureTextEntry: false,
  multiline: false,
  containerStyle: {},
};

const Input = (props) => {
  const { inputContainer, InputText, errorText } = styles;
  const {
    input: { value, onChange },
    meta: { touched, error },
    placeholder,
    secureTextEntry,
    multiline,
    containerStyle,
    ...otherProps
  } = props;

  return (
    <View style={[inputContainer, containerStyle]}>
      <TextInput
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={InputText}
        onChangeText={value => onChange(value)}
        value={value}
        {...otherProps}
      />
      {touched && error &&
        <View>
          <Text style={errorText}>{error}</Text>
        </View>}
    </View>
  );
};

const styles = {
  inputContainer: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  InputText: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
  errorText: {
    color: '#ff5964',
  },
};

Input.defaultProps = defaultProps;
Input.propTypes = propTypes;

export { Input };
