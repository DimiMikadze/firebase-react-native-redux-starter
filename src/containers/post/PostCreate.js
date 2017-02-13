import { connect } from 'react-redux';
import PostCreate from '../../components/post/PostCreate';
import { createPost } from '../../modules/post';

const mapStateToProps = ({ post }) => {
  const { loading, error } = post;

  return { loading, postError: error };
};

export default connect(mapStateToProps, { createPost })(PostCreate);
