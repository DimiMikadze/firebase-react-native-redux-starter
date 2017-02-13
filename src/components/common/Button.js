/* eslint-disable import/prefer-default-export */
import React, { PropTypes } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

const defaultProps = {
  buttonStyle: {},
  textStyle: {},
};

function Button({ onPress, children, buttonStyle, textStyle }) {
  const { button, text } = styles;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[button, buttonStyle]}
    >
      <Text style={[text, textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = {
  button: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#039be5',
    borderRadius: 3,
    marginTop: 10,
  },
  text: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
};

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;

export { Button };
