/* eslint-disable class-methods-use-this */
import React, { Component, PropTypes } from 'react';
import { ListView, View, TouchableWithoutFeedback, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Spinner, Item } from '../common';
import styles from './postStyle';

const propTypes = {
  getPostList: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

class PostList extends Component {
  componentWillMount() {
    this.props.getPostList();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ list }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(list);
  }

  renderRow(post) {
    const { title } = post;

    return (
      <TouchableWithoutFeedback
        onPress={() => { Actions.postEdit({ post }); }}
      >
        <View>
          <Item style={styles.listContainerStyle}>
            <Text style={styles.listTitleStyle}>{title}</Text>
          </Item>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.loading
          ?
            <Spinner />
          :
            <ListView
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={this.renderRow}
            />}
      </View>
    );
  }
}

PostList.propTypes = propTypes;

export default PostList;
