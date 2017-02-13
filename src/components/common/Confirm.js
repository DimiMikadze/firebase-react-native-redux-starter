/* eslint-disable import/prefer-default-export */
import React, { PropTypes } from 'react';
import { View, Text, Modal } from 'react-native';
import { Item } from './Item';
import { Button } from './Button';

const propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
};

const Confirm = ({ children, visible, onAccept, onDecline }) => {
  const { textContainer, textStyle, containerStyle } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <Item style={textContainer}>
          <Text style={textStyle}>
            {children}
          </Text>
        </Item>
        <Item>
          <Button
            buttonStyle={{ backgroundColor: '#e62117' }}
            onPress={onAccept}
          >
            Yes
          </Button>
        </Item>
        <Item>
          <Button onPress={onDecline}>No</Button>
        </Item>
      </View>
    </Modal>
  );
};

Confirm.propTypes = propTypes;

const styles = {
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    justifyContent: 'center',
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
  },
};

export { Confirm };
