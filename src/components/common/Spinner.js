/* eslint-disable import/prefer-default-export */
import React, { PropTypes } from 'react';
import { View, ActivityIndicator } from 'react-native';

const propTypes = {
  size: PropTypes.string,
};

const defaultProps = {
  size: 'large',
};

const Spinner = ({ size }) => (
  <View style={styles.spinnerStyle}>
    <ActivityIndicator size={size} />
  </View>
);

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export { Spinner };
