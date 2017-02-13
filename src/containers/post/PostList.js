import _ from 'lodash';
import { connect } from 'react-redux';
import PostList from '../../components/post/PostList';
import { getPostList } from '../../modules/post';

const mapStateToProps = ({ post }) => {
  const { loading, error } = post;
  const list = _.map(post.list, (val, uid) => ({ ...val, uid }));

  return { loading, postError: error, list };
};

export default connect(mapStateToProps, { getPostList })(PostList);
