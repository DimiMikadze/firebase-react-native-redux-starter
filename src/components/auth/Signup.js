import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Field, reduxForm } from 'redux-form';
import { Container, Input, Button, Item, Spinner } from '../common';
import styles from './authStyle';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  signUpUser: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.clearState();
  }

  handleFormSubmit(props) {
    const { email, password, firstname, lastname } = props;

    this.props.signUpUser({ email, password, firstname, lastname });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container>

        <Item>
          <Field
            name="firstname"
            component={Input}
            placeholder="First name"
          />
        </Item>

        <Item>
          <Field
            name="lastname"
            component={Input}
            placeholder="Last name"
          />
        </Item>

        <Item>
          <Field
            name="email"
            component={Input}
            placeholder="Email"
            autoCapitalize={'none'}
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

        <Item>
          <Field
            name="repassword"
            component={Input}
            secureTextEntry
            placeholder="Repeat Password"
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
            onPress={() => Actions.signin()}
            style={styles.questionContainer}
          >
            <Text style={styles.questionText}>
              Already signed up? Click here to sign in
            </Text>
          </TouchableOpacity>
        </Item>
      </Container>
    );
  }
}

const validate = (props) => {
  const errors = {};
  const fields = ['firstname', 'lastname', 'email', 'password'];

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  if (props.firstname && props.firstname.length < 3) {
    errors.firstname = 'Minimum of 3 characters';
  } else if (props.firstname && props.firstname.length > 20) {
    errors.firstname = 'Maximum of 20 characters';
  }

  if (props.lastname && props.lastname.length < 3) {
    errors.lastname = 'Minimum of 3 characters';
  } else if (props.lastname && props.lastname.length > 20) {
    errors.lastname = 'Maximum of 20 characters';
  }

  if (props.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)) {
    errors.email = 'please provide valid email';
  }

  if (props.password && props.password.length < 6) {
    errors.password = 'minimum 6 characters';
  }

  if (props.password !== props.repassword) {
    errors.repassword = "passwords doesn't match";
  }

  return errors;
};

Signup.propTypes = propTypes;
Signup = reduxForm({ form: 'signup', validate })(Signup);

export default Signup;
