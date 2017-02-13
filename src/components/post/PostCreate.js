import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Container, Item, Button, Input, Spinner } from '../common';
import styles from './postStyle';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  postError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  createPost: PropTypes.func.isRequired,
};

class PostCreate extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    const { title, description } = props;

    this.props.createPost({ title, description });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container>
        <Item>
          <Field
            name="title"
            placeholder="Title"
            component={Input}
          />
        </Item>

        <Item>
          <Field
            name="description"
            placeholder="Description"
            component={Input}
            multiline
            containerStyle={{ height: 70 }}
          />
        </Item>

        {this.props.postError
          ?
            <Text style={styles.error}>
              {this.props.postError}
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
              <Button onPress={handleSubmit(this.handleFormSubmit)}>Create</Button>
            </Item>}
      </Container>
    );
  }
}

const validate = (props) => {
  const errors = {};
  const fields = ['title', 'description'];

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  if (props.title && props.title.length < 4) {
    errors.title = 'Minimum of 4 characters';
  } else if (props.title && props.title.length > 20) {
    errors.title = 'Maximum of 20 characters';
  }

  if (props.description && props.description.length < 12) {
    errors.description = 'Minimum of 12 characters';
  } else if (props.description && props.description.length > 100) {
    errors.description = 'Maximum of 100 characters';
  }

  return errors;
};

PostCreate.propTypes = propTypes;
PostCreate = reduxForm({ form: 'postcreate', validate })(PostCreate);

export default PostCreate;
