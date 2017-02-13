import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Field, reduxForm } from 'redux-form';
import { Container, Input, Button, Item, Spinner } from '../common';
import styles from './authStyle';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  signInUser: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

class Signin extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.clearState();
  }

  handleFormSubmit(props) {
    const { email, password } = props;

    this.props.signInUser({ email, password });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container>

        <Item>
          <Field
            name="email"
            component={Input}
            placeholder="Email"
          />
        </Item>

        <Item>
          <Field
            name="password"
            component={Input}
            secureTextEntry
            placeholder="Password"
          />
        </Item>

        {this.props.authError
          ?
            <Text style={styles.error}>
              {this.props.authError}
            </Text>
          :
            <View />}

        {this.props.loading
          ?
            <Item style={styles.loadingContainer}>
              <Spinner />
            </Item>
          :
            <Item>
              <Button onPress={handleSubmit(this.handleFormSubmit)}>Log in</Button>
            </Item>}

        <Item>
          <TouchableOpacity
            onPress={() => Actions.signup()}
            style={styles.questionContainer}
          >
            <Text style={styles.questionText}>
              Don't have an account? Click here to sign up
            </Text>
          </TouchableOpacity>
        </Item>
      </Container>
    );
  }
}

const validate = (props) => {
  const errors = {};
  const fields = ['email', 'password'];

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  return errors;
};

Signin.propTypes = propTypes;
Signin = reduxForm({ form: 'signin', validate })(Signin);

export default Signin;
