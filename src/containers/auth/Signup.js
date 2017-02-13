import { connect } from 'react-redux';
import Signup from '../../components/auth/Signup';
import { signUpUser, clearState } from '../../modules/auth';

const mapStateToProps = ({ auth }) => {
  const { error, loading, user } = auth;

  return { authError: error, loading, user };
};

export default connect(mapStateToProps, { signUpUser, clearState })(Signup);
