import { connect } from 'react-redux';
import Signin from '../../components/auth/Signin';
import { signInUser, clearState } from '../../modules/auth';

const mapStateToProps = ({ auth }) => {
  const { error, loading, user } = auth;

  return { authError: error, loading, user };
};

export default connect(mapStateToProps, { signInUser, clearState })(Signin);
