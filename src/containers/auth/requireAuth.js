import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

const propTypes = {
  user: PropTypes.object,
};

const defaultProps = {
  user: null,
};

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.user) {
        Actions.auth();
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.user) {
        Actions.auth();
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  Authentication.defaultProps = defaultProps;
  Authentication.propTypes = propTypes;

  const mapStateToProps = ({ auth }) => ({ user: auth.user });

  return connect(mapStateToProps)(Authentication);
}
