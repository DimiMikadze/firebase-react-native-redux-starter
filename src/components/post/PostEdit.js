import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Container, Item, Button, Input, Spinner, Confirm } from '../common';
import styles from './postStyle';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  postError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  updatePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

class PostEdit extends Component {
  constructor(props) {
    super(props);

    this.state = { modal: false };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
  }

  onAccept() {
    this.props.deletePost({ uid: this.props.post.uid });
  }

  onDecline() {
    this.setState({ modal: false });
  }

  handleFormSubmit(props) {
    const { title, description, uid } = props;

    this.props.updatePost({ title, description, uid });
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
              <Button onPress={handleSubmit(this.handleFormSubmit)}>Update</Button>
            </Item>}

        <Item>
          <Button
            buttonStyle={{ backgroundColor: '#e62117' }}
            onPress={() => this.setState({ modal: !this.state.modal })}
          >
            Delete
          </Button>
        </Item>

        <Confirm
          visible={this.state.modal}
          onAccept={this.onAccept}
          onDecline={this.onDecline}
        >
          Are you sure you want to delete this?
        </Confirm>
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

PostEdit.propTypes = propTypes;
PostEdit = reduxForm({ form: 'postedit', validate })(PostEdit);

export default PostEdit;
